/**
 * Created by Xheldon 16/2/25.
 */
//onconnect = function(e){
    //var port = e.ports[0];
    onmessage = function(e){
        //var s = {a:'xheldon',b:'xiaodan'};
        postMessage(e.data);
    }
//};