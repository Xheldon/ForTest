// __webpack_public_path__ = window.publicPath; // 这个设置只影响异步加载的 chunkFileName, img/fonts, 不影响 chunkNames

// 这个文件用来测试异步加载

import img from './img/relative_path/cat.jpeg';

// 异步加载后, 除了 export 外的部分随调用者调用次数影响, 其他部分只加载执行一遍(可能是 webpack 的机制, 即使触发了加载多次, 如果检测到已经加载, 即不会再请求该文件?)
function component() {
    var element = document.createElement('div');
    var myIcon = new Image();
    myIcon.src = img;
    element.appendChild(myIcon);
    return element;
}

document.body.appendChild(component());

export default () => {
    console.log('bar');
};