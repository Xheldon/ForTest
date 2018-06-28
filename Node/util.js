var fs = require('fs');
var path = require('path');


module.exports = function(list, ext, cb){
	fs.readdir(list,'utf8',function(err, data){
		if(err) return cb(err);
		data.forEach(function(value, key){
			if(path.extname(value) === '.' + ext){
				cb(null, value);
			}
		});	
	})



	
}
