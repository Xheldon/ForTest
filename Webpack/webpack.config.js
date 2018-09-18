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
console.log('???', path.join(__dirname, 'build'));

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
                },
                {
                    test: /\.(png|jpeg|jpg|gif)$/,
                    use: [{
                        loader: 'file-loader',
                        options: {
                            name: '[name].[hash:8].[ext]', // 配置文件在页面的路径和文件名, 可以带上路径如 /img/[name].[hash:8].[ext]
                            publicPath: 'http://img.xheldon.com', // 发布链接, 用于 cdn, 不会加上下面的 outputPath
                            outputPath: '/image', // 打包输出生成的目录结构文件夹, 通常打包
                            useRelativePath: true, // 默认是 false, 即将文件放在 outputPath 下, 如果设置为 true, 则会根据文件所在的相对路径输出(此例子中, false 会输出为 image/xxx, true 会输出为 image/relative_path/xxx)
                            emitFile: false // 是否生成文件, 默认是 true, false 的使用场景是引用了 cdn 的图片(设置了 publicPath)
                        }
                    }]
                }
            ]
        },
        resolve: { // https://webpack.docschina.org/configuration/resolve/#resolve-mainfields
            modules: ['node_modules'], // 指定 import 搜索的文件夹, 顺序从左到右
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
        devServer: { // 装了 webpack-dev-server 了才能用, 3以上还要安装 webpack-cli, 装完还报错 TypeError: Cannot match against 'undefined' or 'null'
            // 搜索了下才知道, webpack 版本是 3 的话, w-d-s 版本需要时2; w 版本是 4 的话, w-d-s 才能是3 , 因此降级w-d-s~~~
            contentBase: path.join(__dirname, '/build'),
            open: true, // 启动后自动打开浏览器
            compress: true,
            port: 9000,
            noInfo: false, // 是否输出打包信息, 仍然会输出编译警告和错误
            quiet: false, // 完全屏蔽掉所有的输出信息
            hot: true // 通过该配置文件 webpack.config.js 启动的热替换, 需要手动添加 webpack.HotModuleReplacementPlugin 到配置文件 才能完全启用热替换
            // 通过命令行参数 webpack --hot 或者 webpack-dev-server --hot 启动的则会自动添加该插件
        },
        resolveLoader: {}, // 同上面的 resolve 相同, 只是用于解析 webpack 加载的 loader 包
        plugins: htmls.concat(new CWP({
            isTrue: true
        })).concat(new webpack.HotModuleReplacementPlugin)/*.concat([
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