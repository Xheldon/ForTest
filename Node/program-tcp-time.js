var net = require('net');

function addZero(param){
	return param > 9 ? param + '' : '0' + param;
}

function getTime(time){
	return {
		year: time.getFullYear(),
		month: addZero(time.getMonth() + 1),
		day: addZero(time.getDate()),
		hour:addZero(time.getHours()),
		min: addZero(time.getMinutes()),
		sec: addZero(time.getSeconds())
	}
}
var server = net.createServer(function(socket){
    var date = new Date(),
	time = getTime(date);
	socket.end(time.year + '-' + time.month + '-' + time.day + ' ' + time.hour + ':' + time.min + '\n');
});
server.listen(+process.argv[2]);
