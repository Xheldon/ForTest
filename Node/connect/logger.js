/**
 * Created by Xheldon on 16/9/6.
 */
var connect = require('connect'),
    logger = require('morgan');

var server = connect();

// 时间记录
function timer(opt){
    var time = opt.time || 100;
    return function(req, res, next){
        var t = setTimeout(function(){
            console.log(
                '\033[90m%s %s\033[91mis taking too long!\033[39m',
                req.method,
                req.url
            );
        },time);

        // 重写res.end方法，每次结束相应的时候都要记录
        var end = res.end;

        res.end = function(chunk, encoding){
            res.end = end;
            res.end(chunk, encoding);
            clearTimeout(t);
        };
        next();
    };
}


server.use(logger('dev'));
server.use(logger('type is :res[content-type],length is :res[content-length],and it took :response-time ms,' +
    'and other message is: accept :res[Accept],http version :http-version, remote-addr :remote-addr, date :date, url :url, referrer :referrer, user-agent :user-agent, status :status'));

server.use(timer({time: 500}));

// 快速响应
server.use(function(req, res, next){
    if('/a' == req.url){
        res.writeHead(200);
        res.end('Fast!');
    }else{
        next();
    }
});

// 慢速响应
server.use(function(req, res, next){
    if('/b' == req.url){
        setTimeout(function(){
            res.writeHead(200);
            res.end('Slow!');
        },1000);
    }else{
        next();
    }
});

server.listen(3002);