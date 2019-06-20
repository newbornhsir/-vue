const path = require('path');
module.exports = {
    entry: './vue-self/src/index.js',
    output: {
        filename: 'vue.js',
        path: path.resolve(__dirname, 'vue-self', 'dist')
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './vue-self/dist',
        hot: true
    }
}