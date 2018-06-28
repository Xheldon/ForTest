var http = require('http');
var paraArr = Array.prototype.slice.call(process.argv,2);
var content = ['', '', ''];

http.get(paraArr[0],function(resp){
	resp.setEncoding('utf8');
	resp.on('data',function(data){
		content[0] += data;
	}).on('end', function(){
		http.get(paraArr[1], function(resp){
			resp.setEncoding('utf8');
			resp.on('data', function(data){
				content[1] += data;
			}).on('end', function(){
				http.get(paraArr[2], function(resp){
					resp.setEncoding('utf8');
					resp.on('data', function(data){
						content[2] += data;
					}).on('end', function(){
						content.forEach(function(value){
							console.log(value);
						});
					});
				})
			});
		})
	})
})


