const HTMLWebPack = require("html-webpack-plugin")

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
        ]
    },

    plugins: [
        new HTMLWebPack({
            template: 'src/index.html'
        }),
    ]

}