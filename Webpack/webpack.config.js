let path = require('path');
let HWP = require('html-webpack-plugin');
let glob = require('glob');

let entries = glob.sync('./src/entries/**/index.js').reduce((prev, curr) => {
    prev['assets/' + curr.slice(14, -3)] = curr;
    return prev;
}, {});

console.log(entries);


module.exports = () => {
    return {
        entry: entries,
        output: {
            path: path.resolve(__dirname, 'build/'), // 该 path 同样会影响 webpackHtmlPlugin 生成的 html 的路径
            publicPath: "http://localhost.xheldon.com/assets/js/",
            filename: '[name].[hash].js'
        },
        module: {
            rules: [
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
                }
            ]
        },
        plugins: [
            new HWP({
                title: 'HWP test',
                filename: 'index.html',
                template: './src/tpl/index.html',
                chunks: [ // 决定该 html 引用哪个 js, 默认是 all, 即 entry 打包的所有 js
                    'assets/index/index'
                ],
                inject: false,
                data: {
                    build: true
                }
            })
        ]
    }
}