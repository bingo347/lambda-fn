import {promises as fs} from 'fs';
import * as path from 'path';
import type {CompilerOptions} from 'typescript';
import ts from 'rollup-plugin-ts';

type TSConfig = {
    compilerOptions: CompilerOptions;
    include?:        string[];
    exclude?:        string[];
};
type Pkg = {
    dependencies?: Record<string, string>;
};

const ORDER_KEY = Symbol();

export default (async () => {
    const tsconfig = JSON.parse(await fs.readFile(path.join(__dirname, 'tsconfig.json'), 'utf8')) as TSConfig;
    const pkgDir = path.join(__dirname, 'packages');
    const priorityOrder: Record<string, number> = {};
    const pkgConfigs = await Promise.all((await fs.readdir(pkgDir)).map(async name => {
        const input = path.join(pkgDir, name, 'src/index.ts');
        const pkg = JSON.parse(await fs.readFile(path.join(pkgDir, name, 'package.json'), 'utf8')) as Pkg;
        const external = Object.keys(pkg.dependencies ?? {});
        external.forEach(m => {
            priorityOrder[m] = (priorityOrder[m] ?? 0) + 1;
        });
        return [{
            input,
            external,
            output: {
                format: 'es',
                file:   path.join(pkgDir, name, 'index.mjs'),
            },
            plugins:     [ts()],
            [ORDER_KEY]: `@lambda-fn/${name}`,
        }, {
            input,
            external,
            output: {
                format:  'cjs',
                file:    path.join(pkgDir, name, 'index.js'),
                exports: 'named',
            },
            plugins: [ts({
                tsconfig: {
                    ...tsconfig.compilerOptions,
                    declaration: false,
                },
                include:       tsconfig.include,
                exclude:       tsconfig.exclude,
                transpileOnly: true,
            })],
        }] as const;
    }));
    return pkgConfigs
        .sort(([{[ORDER_KEY]: a}], [{[ORDER_KEY]: b}]) =>
            (priorityOrder[b] ?? 0) - (priorityOrder[a] ?? 0))
        .flat();
})();
