/*
* 该文件作用其实就是把某些 js 模块打包到 vendor 中生成一个 library
* 名字是一个全局变量 vendor_lib, (具体可以自己配置) 之后可以在需要的地方
* (如入口文件)直接使用该全局变量如 import vendor_lib from 'vendor_lib';
* 然后使用 DllPlugin 生成该 library 中模块的资源 id, 再在正常 webpack.config.js 中使用 DllReference 引用, 最后他妈的还要将其自动引入 html 中(需要另一个插件)
* */

const webpack = require('webpack');
const library_name = '[name]_lib';
const path = require('path');

module.exports =  {
    entry: {
        vendor: ['holy-shit-library', 'mother-fucker-library']
    },
    resolve: {
        modules: ['node_modules', './src/library'], // 指定 import 搜索的文件夹, 顺序从左到右
    },
    output: {
        filename: '[name].dll.js', // 库打包文件输出路径
        path: path.join(__dirname, 'dll'),
        library: library_name // 如果创建一个 library 一般还需要设置 libraryTarget, 此处我们只是为了使用 dll 不用创建 library, 因此忽略
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, 'dll/[name]-manifest.json'), // 映射文件输出路径
            name: library_name // 必须跟 output 的 library 保持一致
        })
    ]
};
