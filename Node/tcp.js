var net = require('net');
net.createServer(function(conn){
	console.log('New connection!');
}).listen(3000,function(){
	console.log('server listen on 3000');
});
