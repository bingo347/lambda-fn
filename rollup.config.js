import {promises as fs} from 'fs';
import path from 'path';
import tsPlugin from '@wessberg/rollup-plugin-ts';
import pkg from './package.json';

const pkgVersions = {};

export default [
    makeConfig('type-guards', '1.0.1'),
    makeConfig('cell', '1.0.2', '', [
        'type-guards'
    ]),
    makeConfig('option', '1.0.2', 'maybe,monad', [
        'type-guards'
    ])
];

function makeConfig(name, version, keywords = '', dependencies = []) {
    return {
        input: `src/${name}/index.ts`,
        output: {
            format: 'es',
            file: `dist/${name}/index.mjs`
        },
        external: dependencies.map(dep => `@lambda-fn/${dep}`),
        plugins: [
            makePackage(name, version, [
                'fp', name,
                ...keywords.split(',')
            ].map(v => v.trim()).filter(v => !!v), dependencies),
            tsPlugin()
        ]
    };
}

function makePackage(name, version, keywords, dependencies) {
    const inputDir = path.join(__dirname, 'src', name);
    const outDir = path.join(__dirname, 'dist', name);
    pkgVersions[name] = version;
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
                    homepage: pkg.homepage,
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