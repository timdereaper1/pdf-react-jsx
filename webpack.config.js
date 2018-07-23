const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve('./build'),
        filename: 'index.js'
    },
    devServer: {
        inline: true,
        port: 8080
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                // use: {
                //     loader: 'babel-loader',
                //     options: {
                //         presets: ['env']
                //     }
                // }
                loader: 'babel-loader',
                query: {
                    presets: ['env'],
                }
            }
        ]
    }
}