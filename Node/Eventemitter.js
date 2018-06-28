var util = require('util');
var em = require('events').EventEmitter;

var MyClass = function(){};

util.inherits(MyClass, em);

MyClass.prototype.sentEvent = function(){
	this.emit('myEvent', '参数1', '参数2');
}

var myInstance = new MyClass();

myInstance.on('myEvent', function(argv1, argv2){
	console.log('事件参数',arguments);
	console.log('事件参数',argv1, argv2);
})

myInstance.sentEvent();