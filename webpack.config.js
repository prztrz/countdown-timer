module.exports = {
    entry: "./src/main.js",
    output: {
        filename: "./build/app.js" 
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
        filename: './build/app.js',
    }
}
