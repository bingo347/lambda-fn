import tsPlugin from '@wessberg/rollup-plugin-ts';

export default [{
    input: 'src/',
    output: {
        file: '',
        format: 'es'
    },
    plugins: [
        tsPlugin()
    ]
}];