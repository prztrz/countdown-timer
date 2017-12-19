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
            {
                test: /\.css$/, 
                loader: ['style-loader', 'css-loader']
            },
            {
                test: /\.scss$/, 
                loader: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    },
    devServer: {
        filename: './build/js/app.js',
    }
}
