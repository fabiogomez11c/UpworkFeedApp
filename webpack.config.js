const HTMLWebPack = require("html-webpack-plugin")
const CopyPlugin  = require('copy-webpack-plugin')

module.exports = {
    mode: 'development',

    output: {
        clean: true
    },

    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: 'html-loader',
                options: {
                    sources: false
                }
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    "style-loader",
                    'css-loader',
                    'sass-loader',
                ]
            },
            {
                test: /\.(png|jpg|svg)$/i,
                use: [
                    {
                        loader: 'file-loader'
                    }
                ]
            },
            {
                test: /\.js$/,
                enforce: 'pre',
                use: ['source-map-loader']
            },
        ]
    },

    plugins: [
        new HTMLWebPack({
            template: 'src/index.html'
        }),        
        new CopyPlugin({
            patterns: [
                {from: 'src/assets/', to: 'assets/'}
            ]
        }),
    ]

}