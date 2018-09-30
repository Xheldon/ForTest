// __webpack_public_path__ = window.publicPath; // 这个设置只影响异步加载的 chunkFileName, 不影响 chunkNames

// import bar from '../../bar';
console.log('about');
import holyShit from 'holy-shit-library';
import motherFucker from 'mother-fucker-library';
console.log('holy:', holyShit);
console.log('fucker:', motherFucker);
console.log(motherFucker.a());
console.log(motherFucker.b());
console.log(motherFucker.c());
console.log(holyShit.d());
console.log(holyShit.e());
console.log(holyShit.f());

function getCom () {
    let ele = document.createElement('button');
    ele.innerHTML = '点我异步加载~';
    ele.onclick = (e) => {
        import(/*webpackChunkName:"barbar"*/'../../bar').then(module => { // webpackChunkName 这个注释可以给异步加载的 js 命名
            console.log('bar???:', module);
            /*注意当调用 ES6 模块的 import() 方法（引入模块）时，必须指向模块的 .default 值，因为它才是 promise 被处理后返回的实际的 module 对象*/
            module.default();

        });
    };
    return ele;
}


document.body.appendChild(getCom());