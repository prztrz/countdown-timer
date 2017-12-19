module.exports = {
    entry: "./src/js/main.js",
    output: {
        filename: "./build/js/app.js" 
    },
    watch: true, 
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            },
        ]
    },
    devServer: {
        filename: './build/js/app.js',
    }
}
