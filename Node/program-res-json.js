var http = require('http');
var url = require('url');

http.createServer(function(req, res){
	var urlParse = url.parse(req.url, true);
	console.log(urlParse);
	var time = new Date(urlParse.query.iso);
	if(urlParse.pathname === '/api/parsetime'){
		var json = {
			hour: time.getHours(),
			minute:  time.getMinutes(),
			second: time.getSeconds()
		}
		res.writeHead(200, {'Content-Tyoe': 'application/json'});
		res.end(JSON.stringify(json));
	}else if(urlParse.pathname === '/api/unixtime'){
		var json = {
			unixtime: time.getTime()
		}
		res.writeHead(200, {'Content-Type': 'application/json'});
		res.end(JSON.stringify(json));
	}
}).listen(process.argv[2]);
