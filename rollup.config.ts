import * as fs from 'fs';
import * as path from 'path';
import type {RollupOptions} from 'rollup';
import ts from 'rollup-plugin-ts';

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

export default (async (): Promise<RollupOptions[]> =>
    orderPackages(await scanPackages()).map(({pathname, dependencies}) =>
        ({
            input:    path.join(pathname, 'src/index.ts'),
            external: dependencies,
            output:   [{
                format: 'es',
                file:   path.join(pathname, 'index.mjs'),
            }, {
                format:  'cjs',
                exports: 'named',
                file:    path.join(pathname, 'index.js'),
            }],
            plugins:     [ts()],
        })))();
