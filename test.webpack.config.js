module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    module: {
        rules: [{
            test: /\.js$/,
            use: 'babel-loader',
            exclude: /node_modules/
        }]
    }
};