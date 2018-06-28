var http = require('http');
var content = '';
http.get(process.argv[2],function(resp){
	resp.setEncoding('utf8');
	resp.on('data',function(data){
		content += data;
	});
	resp.on('end', function(){
		var result = content.toString();
		console.log(result.split('').length + '\n'+ result);
	});
}); 

