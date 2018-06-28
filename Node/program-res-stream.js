var http = require('http');
var fs = require('fs');
var arr = Array.prototype.slice.call(process.argv,2);
http.createServer(function(req, res){
	fs.createReadStream(arr[1]).pipe(res);
}).listen(+arr[0]);


