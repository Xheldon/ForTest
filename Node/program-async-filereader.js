var fs = require('fs');
var path = require('path');
var filepath = process.argv[2];
var content = fs.readdir(path.normalize(filepath),function(err,list){
	for(var i=0;i<list.length;i++){
		var name = list[i].split('.');
		if(name[name.length-1] === process.argv[3] && name.length>1){
			console.log(list[i]);	
		}
	}
});
