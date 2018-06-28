/**
 * Created by xheldon on 16/4/11.
 */
var net = require('net');
var server = net.createServer(function(socket){
    socket.on('data',function(data){
        socket.write('hello,world!');
    });
    socket.on('end',function(){
        console.log('断开连接!');
    });
    socket.write('欢迎光临!');
});
server.listen(8125,function(){
    console.log('Server bound!');
});