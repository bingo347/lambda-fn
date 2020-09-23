// @ts-check
import {promises as fs} from 'fs';
import path from 'path';
import tsPlugin from '@wessberg/rollup-plugin-ts';
import pkg from './package.json';

const pkgNames = Object.keys(pkg.packages);
const pkgVersions = pkgNames.reduce((acc, name) => ({
    ...acc,
    [name]: pkg.packages[name].version
}), {});

export default pkgNames.map(makeConfig);

function makeConfig(name) {
    const {dependencies = []} = pkg.packages[name];
    return {
        input: `src/${name}/index.ts`,
        output: {
            format: 'es',
            file: `dist/${name}/index.mjs`
        },
        external: dependencies.map(dep => `@lambda-fn/${dep}`),
        plugins: [
            makePackage(name),
            tsPlugin()
        ]
    };
}

function makePackage(name) {
    const {
        version,
        additionalKeywords = [],
        dependencies = []
    } = pkg.packages[name];
    const keywords = ['fp', name, ...additionalKeywords];
    const inputDir = path.join(__dirname, 'src', name);
    const outDir = path.join(__dirname, 'dist', name);
    return {
        name: 'makePackage',
        async writeBundle() {
            await fs.mkdir(outDir, {recursive: true});
            const readme = await fs.readFile(path.join(inputDir, 'README.md'), 'utf-8');
            const pkgWritePromise = fs.writeFile(
                path.join(outDir, 'package.json'),
                JSON.stringify({
                    name: `@lambda-fn/${name}`,
                    version,
                    keywords,
                    description: readme.split('\n', 3)[2].trim(),
                    main: 'index.cjs',
                    module: 'index.mjs',
                    types: 'index.d.ts',
                    repository: pkg.repository,
                    author: pkg.author,
                    license: pkg.license,
                    bugs: pkg.bugs,
                    homepage: `https://github.com/bingo347/lambda-fn/blob/master/src/${name}/README.md`,
                    dependencies: dependencies.reduce((acc, dep) => ({
                        ...acc,
                        [`@lambda-fn/${dep}`]: `^${pkgVersions[dep]}`
                    }), {})
                }, null, 2)
            );
            const readmeWritePromise = fs.writeFile(path.join(outDir, 'README.md'), readme);
            await Promise.all([
                pkgWritePromise,
                readmeWritePromise
            ]);
        },
        async renderChunk(code) {
            await fs.mkdir(outDir, {recursive: true});
            const cjsCode = code.split('\n').map(line => {
                const trimLine = line.trim();
                const isImport = trimLine.startsWith('import');
                const isExport = trimLine.startsWith('export');
                if(isImport) {
                    //TODO: wildcard & default import
                    return trimLine.replace(/import (.*) from (.*);/, 'const $1 = require($2);');
                }
                if(isExport) {
                    return trimLine.replace('export', 'module.exports = ')
                }
                return line;
            }).join('\n');
            await fs.writeFile(
                path.join(outDir, 'index.cjs'),
                `${cjsCode}\nObject.defineProperty(module.exports,"__esModule",{value:true});`
            );
        }
    };
}