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
            const readme = await fs.readFile(path.join(inputDir, 'README.md'), 'utf-8');
            const pkgWritePromise = fs.writeFile(
                path.join(outDir, 'package.json'),
                JSON.stringify({
                    name: `@lambda-fn/${name}`,
                    type: 'module',
                    version,
                    keywords,
                    description: readme.split('\n', 3)[2].trim(),
                    main: 'index.mjs',
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
        }
    };
}