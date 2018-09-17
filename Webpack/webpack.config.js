let path = require('path');
let webpack = require('webpack');
let HWP = require('html-webpack-plugin');
let CWP = require('./plugin/ConsoleLogOnBuildWebpackPlugin');
let glob = require('glob');

let entries = glob.sync('./src/entries/**/index.js').reduce((prev, curr) => {
    prev['assets/' + curr.slice(14, -3)] = curr;
    return prev;
}, {});

console.log(entries);

let htmls = Object.keys(entries).map((html) => {
    return new HWP({
        title: html.slice(-5, -1),
        filename: `${html.slice(7, -6)}.html`,
        template: './src/tpl/index.html',
        chunks: [html, 'shit', 'manifest'],
        inject: 'body',
        minify: false,
        data: {
            build: true
        }
    });
});

module.exports = () => { // 多种配置类型: https://webpack.docschina.org/configuration/configuration-types/#exporting-multiple-configurations
    return {
        target: 'web', // 默认是 web, 可忽略: https://webpack.docschina.org/concepts/targets
        entry: entries,
        output: {
            publicPath: '',
            path: path.resolve(__dirname, 'build/'), // 该 path 同样会影响 webpackHtmlPlugin 生成的 html 的路径
            // publicPath: "http://localhost.xheldon.com/assets/js/", // 静态资源路径, 本地服务开发的时候不需要, 相对路径为空即可
            filename: '[name].[hash:8].js'
        },
        module: {
            rules: [ // loader API: https://webpack.docschina.org/api/loaders
                {
                    test: /\.css$/,
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true
                            }
                        }
                    ]
                },
                {
                    test: /\.xheldon$/,
                    use: [
                        {
                            loader: './loader/xheldon-loader',
                            options: {
                                capitalInEveryFirstWord: true
                            }
                        }
                    ]
                },
                {
                    test: /\.xiaodan$/, // async example
                    use: [
                        {
                            loader: './loader/xiaodan-loader',
                            options: {
                                isLittleBaby: true
                            }
                        }
                    ]
                }
            ]
        },
        resolve: { // https://webpack.docschina.org/configuration/resolve/#resolve-mainfields
            modules: [], // 指定 import 搜索的文件夹, 顺序从左到右
            alias: {
                '@src': path.resolve(__dirname, 'src') // import 模块的别名
            },
            extensions: ['.js', '.jsx'], // 如果 import 的文件名没有后缀, 则搜索配置中后缀的同名文件
            mainFields: ['browser', 'module', 'main'], /*视 target 不同默认值也不同, 从左到右依次尝试
                               用来在 import 模块的时候, 如果 import 的是个 npm 目录, 而且目录刚好有个 package.json,
                               则读取对应的字段, target 为 webworker 或者 web 的时候, 默认是 browser, module 和 main
                               target 是 node 的时候, 则默认是 module 和 main*/
            mainFiles: ['index'], // 如果 import 的是个文件夹, 则默认查找的 js 文件
            unsafeCache: true, // 缓存模块, 用来在 import 的时候缓存模块, 可用正则匹配 /src\/bar.js/, 匹配为 true 则缓存
            plugins: [] // 在解析路径的时候用到的额外的路径解析插件
        },
        resolveLoader: {}, // 同上面的 resolve 相同, 只是用于解析 loader 包
        plugins: htmls.concat(new CWP({
            isTrue: true
        }))/*.concat([
            new webpack.optimize.CommonsChunkPlugin({
                name: 'shit',
                filename: 'fuck.[hash:6].js',
                minChunks: 2
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'manifest',
                filename: 'damn.[hash:6].js',
                minChunks: Infinity
            })
        ])*/
    }
};