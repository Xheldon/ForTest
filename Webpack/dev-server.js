/*
* 本文件使用 webpack-dev-server 的 node API 模式, 不需要将 devServer 配置放到 webpack.config.js 中 而只需要将其作为第二个参数传入即可,
* 例如: new WDS(webpack(config), options);
* 此外, 如果想在 webpack-dev-server 的 node API 模式使用 HMR, 还需要在每个入口文件中加上 HMR 的入口起点
* webpack 4.x (其他版本不知道) 有个 addDevServerEntrypoints 方法可以实现, 也可以手动在入口文件处挨个添加
* */


const WDS = require('webpack-dev-server');
const webpack = require('webpack');

const config = require('./webpack.config');

const options = { // 用来代替 直接 npm run dev 启动的 webpack-dev-server 命令启动的服务所使用的 webpack.config.js 中的 devServer 配置
    contentBase: './build',
    hot: true,
    host: 'localhost'
};

WDS.addDevServerEntrypoints(config, options);

const compiler = webpack(config);

const server = new WDS(compiler, options);

server.listen(5000, 'localhost', () => {
    console.log('dev server node API mode starting!');
});
