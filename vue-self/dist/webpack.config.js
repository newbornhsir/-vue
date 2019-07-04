var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: './vue-self/index.ts',
    output: {
        filename: 'vue.js',
        path: path.resolve(__dirname, 'vue-self', 'dist')
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './vue-self/dist',
        hot: true
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_mudules/
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html'
        })
    ]
};
