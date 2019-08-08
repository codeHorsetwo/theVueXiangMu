// 导入处理路径的模块
const path = require('path');

const htmlWebpackPlugin = require('html-webpack-plugin');

//向外暴露一个配置对象
module.exports = {
    //配置打包模式为开发模式
    mode: 'development',
    entry:path.join(__dirname,'./src/index.js'),
    output:{
        path:path.join(__dirname,'./dist'),
            filename:'main.js'
    },
    plugins:[
        new htmlWebpackPlugin({
            template:path.join(__dirname,'./src/index.html'),
            filename:'index.html'
        })
    ],
    module:{
        rules:[
            {test:/\.css$/,use:['style-loader','css-loader']},
            {test:/\.less$/,use:['style-loader','css-loader','less-loader']},
            {test:/\.scss$/,use:['style-loader','css-loader','sass-loader']},
            {test:/\.(jpg|png|gif|ipeg|svg)$/,use:['url-loader?limit=450000&name=[hash:3][name].[ext]']},
            {test:/\.(ttf|woff2|woff|eot)$/,use:['url-loader']},
            {test: /\.js$/, use: 'babel-loader', exclude: /node_modules/},
            {test:/\.vue$/,use:'vue-loader'}
            ]
    },
    resolve:{
        alias:{
            'vue$':'vue/dist/vue.js'
        }
    }
}















