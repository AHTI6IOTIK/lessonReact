const path = require('path')

const ENTRY_FILE_PATH = path.resolve(__dirname, 'src', 'index.js')
const OUTPUT_PATH = path.resolve(__dirname, 'dist')

module.exports = {
    entry: ENTRY_FILE_PATH,
    devServer: {
        port: 3030,
        contentBase: OUTPUT_PATH,
        open: true
    },
    output: {
        path: OUTPUT_PATH,
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'react', 'stage-2']
                    }
                }
            }
        ]
    }
}
