var fs = require('fs');
fs.readdir(process.cwd(),function(err,files){
	console.log('');
	console.log('本目录文件长度:',files.length);
	if(!files.length){
		console.log('没有任何文件可供查看!');
		return;
	}
	console.log('选择一个你想查看的文件目录和文件:\n');
	var stats = [];
	function file(i){
		var filename = files[i];
		fs.stat(__dirname + '/' + filename,function(err, stat){
			stats[i] = stat;
			if(stat.isDirectory()){
				console.log('   文件夹:' + i + '    ' + filename);
			}else{
				console.log('    文件:' + i + '    ' + filename);
			}
			i++;
			if(i === files.length){
				console.log('');
				process.stdout.write(' 输入你的选择:');
				process.stdin.resume();
				process.stdin.setEncoding('utf8');
				process.stdin.on('data',function(data){
					var filename = files[Number(data)];
					if(!filename){
						process.stdout.write('请认真输入你的选择:');
					}else{
						process.stdin.pause();
						if(stats[Number(data)].isDirectory()){
							console.log(stats[Number(data)]);
							fs.readdir(__dirname + '/' + filename,function(err,files){
								console.log('');
								console.log('(', files.length, ')files');
								files.forEach(function(file){
									console.log('   -   ' + file);
								});
								console.log('');
							})
						}else{
							fs.readFile(__dirname + '/' + filename,'utf8',function(err,data){
							console.log('');
							console.log(data.replace(/(.*)/g,'       $1'));
						});
						}
					
					}
				})
			}else{
				file(i);
			}
		});
	}
	file(0);
});