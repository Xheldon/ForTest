let path = require('path');
let webpack = require('webpack');
let HWP = require('html-webpack-plugin');
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

module.exports = () => {
    return {
        entry: entries,
        output: {
            publicPath: '',
            path: path.resolve(__dirname, 'build/'), // 该 path 同样会影响 webpackHtmlPlugin 生成的 html 的路径
            // publicPath: "http://localhost.xheldon.com/assets/js/", // 静态资源路径, 本地服务开发的时候不需要, 相对路径为空即可
            filename: '[name].[hash:8].js'
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
        plugins: htmls/*.concat([
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