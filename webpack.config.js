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
        ]
    },

    plugins: [
        new HTMLWebPack({
            template: 'src/index.html'
        }),
    ]

}