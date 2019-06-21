const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: './vue-self/index.js',
    output: {
        filename: 'vue.js',
        path: path.resolve(__dirname, 'vue-self', 'dist')
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './vue-self/dist',
        hot: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html'
        })
    ]
}