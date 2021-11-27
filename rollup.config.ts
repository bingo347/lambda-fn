import * as fs from 'fs';
import * as path from 'path';
import type {RollupOptions, Plugin} from 'rollup';
import ts from 'rollup-plugin-ts';
import * as typedoc from 'typedoc';

type Pkg = {
    dependencies?: Record<string, string>;
};
type PkgInfo = {
    name:         string;
    pathname:     string;
    dependencies: string[];
};
type PkgInfoRecord = Record<string, PkgInfo>;
type PkgInfoCollection = {
    names: string[];
    info:  PkgInfoRecord;
};

const scanPackages = async () => {
    const pkgDir = path.join(__dirname, 'packages');
    const dirNames = await fs.promises.readdir(pkgDir);
    const names = dirNames.map(name =>
        `@lambda-fn/${name}`);
    const pkgInfo = await Promise.all(names.map(async name => {
        const pathname = path.join(pkgDir, path.basename(name));
        const pkgData = await fs.promises.readFile(path.join(pathname, 'package.json'), 'utf8');
        const pkg = JSON.parse(pkgData) as Pkg;
        const dependencies = Object.keys(pkg.dependencies ?? {});
        return {
            name,
            pathname,
            dependencies,
        };
    }));
    return {
        names,
        info: pkgInfo.reduce<PkgInfoRecord>((acc, info) => {
            acc[info.name] = info;
            return acc;
        }, {}),
    };
};

// eslint-disable-next-line complexity
const orderPackages = (infoCollection: PkgInfoCollection) => {
    const {dependencies, dependents} = collectDependencies(infoCollection);
    const notUsedNames = new Set(infoCollection.names);
    const orderedInfo: PkgInfo[] = [];
    while (notUsedNames.size > 0) {
        const namesUsedInThisIteration: string[] = [];
        for (const name of notUsedNames) {
            if (dependencies[name]!.size > 0) { continue }
            namesUsedInThisIteration.push(name);
            orderedInfo.push(infoCollection.info[name]!);
            for (const dep of dependents[name] ?? []) {
                dependencies[dep]?.delete(name);
            }
        }
        namesUsedInThisIteration.forEach(name =>
            notUsedNames.delete(name));
    }
    return orderedInfo;
};

const collectDependencies = (infoCollection: PkgInfoCollection) => {
    const dependencies: Record<string, Set<string>> = {};
    const dependents: Record<string, Set<string>> = {};
    for (const name of infoCollection.names) {
        const currentInfo = infoCollection.info[name];
        if (!currentInfo) { continue }
        const internalDependencies = currentInfo.dependencies.filter(dep =>
            dep.startsWith('@lambda-fn/'));
        dependencies[name] = new Set(internalDependencies);
        for (const dep of internalDependencies) {
            (dependents[dep] ??= new Set()).add(name);
        }
    }
    return {dependencies, dependents};
};

const docsPlugin = (pathname: string): Plugin =>
    ({
        name: 'docs',
        async generateBundle() {
            const app = new typedoc.Application();
            const out = path.join(__dirname, 'docs', path.basename(pathname));
            app.options.addReader(new typedoc.TSConfigReader());
            app.options.addReader(new typedoc.TypeDocReader());
            app.bootstrap({
                out,
                entryPoints:          [path.join(pathname, 'src/index.ts')],
                plugin:               ['typedoc-plugin-markdown'],
                readme:               'none',
                githubPages:          false,
                gitRevision:          'main',
                excludeInternal:      true,
                excludeNotDocumented: true,
                excludePrivate:       true,
                disableSources:       true,
            });
            const project = app.convert();
            if (!project) { return }
            await app.generateDocs(project, out);
        },
    });

export default (async (): Promise<RollupOptions[]> =>
    orderPackages(await scanPackages()).map(({pathname, dependencies}) =>
        ({
            input:    path.join(pathname, 'src/index.ts'),
            external: dependencies,
            output:   [{
                format:  'es',
                file:    path.join(pathname, 'index.mjs'),
                plugins: [docsPlugin(pathname)],
            }, {
                format:  'cjs',
                exports: 'named',
                file:    path.join(pathname, 'index.js'),
            }],
            plugins:     [ts()],
        })))();
