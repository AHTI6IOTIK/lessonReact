const path = require('path')

const distPath = path.resolve(__dirname, 'dist')

module.exports = {
    entry: path.resolve(__dirname, './src/index.js'),
    // watch: true,
    devServer: {
        port: 8080,
        contentBase: distPath,
        open: true,
        // proxy: {
        //   '/': 'http://localhost:3000'
        // }
    },
    output: {
        path: distPath,
        filename: 'main.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|jpg)/,
                use: ['file-loader']
            }
        ]
    }
}
