/**
 * Created by Xheldon 16/2/25.
 */
//    专用线程示例
var worker = new Worker('dedicatedBranch.js');
var a = 10,
    b = 20;
worker.postMessage([a,b]);
worker.onmessage = function(e){
    console.log('index-2:',e.data);
};