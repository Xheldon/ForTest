require('http').createServer(function(req,res){
	res.writeHead(200,{'Content-Type':'image/png'});
	var img = require('fs').createReadStream('avatar.png');
	img.on('data',function(data){
		res.write(data);
		console.log('shit');
	});
	img.on('end',function(){
		res.end('img传输完毕!');
	});
}).listen(3000);