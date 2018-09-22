/* 本文件只在使用了 webpack-dev-middleware 的时候使用, 使用 webpack 的 node API 模式, 用来定制化配置 webpack-dev-server 而不是直接使用 webpack-dev-server 的配置
* 另外还要单独安装 express, 而不是使用 webpack-dev-server 内置的 express
*
* 另外 webpack-dev-middleware@3.x 需要 webpack@4.x https://github.com/webpack/webpack-dev-middleware/issues/283
*
* 最后, Hot Module Replacement 配合 webpack-dev-server 使用来实现热替换
* 而如果使用了 webpack-dev-middleware 而没有 webpack-dev-server 则使用 webpack-hot-middleware 来实现热替换
* */

const webpack = require('webpack');
const express = require('express');

const WDM = require('webpack-dev-middleware');

const app = express();
const config = require('./webpack.config')(); // webpack.config.js 导出的是一个函数, 所以执行一下

const compiler = webpack(config);

// 告诉 express 使用 the webpack-dev-middleware 同时使用 webpack.config.js 配置文件

app.use(WDM(compiler, {
    publicPath: config.output.publicPath // 使用 webpack.config.js 中的 output 的 publicPath 配置, 这个配置不能为 '', 至少为'/'(自己猜的)
}));

app.listen(3000, () => {
    console.log('牛逼');
});
