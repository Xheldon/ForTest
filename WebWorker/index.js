/**
 * Created by Xheldon 16/2/25.
 */
//    专用线程示例
var worker = new Worker('dedicatedBranch.js');
var a = 100,
    b = 200,
    c = 300,
    d = 400;
worker.postMessage([a,b]);
worker.postMessage([c,d]);
worker.onmessage = function(e){
    console.log('index:', e);
};