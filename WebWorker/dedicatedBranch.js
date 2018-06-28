/**
 * Created by Xheldon 16/2/23.
 */
var s = 'xheldon';
onmessage = function(e){
    var s = 'Result:' + (e.data[0]+ e.data[1]);
    postMessage(s);
};
