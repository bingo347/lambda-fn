const path = require('path');

module.exports = {
    parserOptions: {
        project: [
            path.resolve(__dirname, './tsconfig.json')
        ],
        tsconfigRootDir: __dirname
    },
    plugins: [
        'jest',
    ],
    env: {
        es6: true,
        browser: true,
        node: true
    },
    extends: [
        '@bingo347',
    ],
    overrides: [{
        files: ['*.test.ts'],
        env: {
            jest: true
        },
        rules: {
            ...require('eslint-plugin-jest').configs.recommended.rules,
            '@typescript-eslint/no-empty-function': 0,
        }
    }],
    rules: {
        '@typescript-eslint/no-redeclare': 0,
    },
};
