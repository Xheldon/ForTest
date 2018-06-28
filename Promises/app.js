/**
 * Created by Xheldon 16/5/18.
 */

/**
 * Promise.resolve(data)是new Promise(function(resolve){
 *  resolve(data);
 * })
 * 的缩写/快捷方式
 */



/**
 *
 * 如果只是简单的按顺序执行,直接Promise.resolve()即可,如果想执行一个耗时操作,则需要
 * var promise = new Promise(function(resolve){
 *  some waste handle
 * resolve(data);
 * })
 */
// not test resolve
function taskA() {
    console.log("Task A");
    //throw a error
    throw new Error("throw Error @ Task A")
}
function taskB() {
    console.log("Task B");// 不会被调用
}
function onRejected(error) {
    console.log(error);// => "throw Error @ Task A"
}
function finalTask() {
    console.log("Final Task");
}

var promise = Promise.resolve();
promise
    .then(taskA)
    .then(taskB)
    .catch(onRejected)
    .then(finalTask);


/**
 * 如果想将taskA的值传递给之后的taskB,简单返回即可
 */
function taskC(value){
    return value * 2
}

function taskD(value){
    return value + 1;
}

var promise2 = Promise.resolve(2);
promise2
    .then(taskC)
    .then(taskD)
    .then(function(value){
        console.log(value);
    });

/**
* 不使用Promise而是通过回调方式进行多个异步调用
* */


function getURLCallback(URL, callback) {
    var req = new XMLHttpRequest();
    req.open('GET', URL, true);
    req.onload = function () {
        if (req.status === 200) {
            callback(null, req.responseText);
        } else {
            callback(new Error(req.statusText), req.response);
        }
    };
    req.onerror = function () {
        callback(new Error(req.statusText));
    };
    req.send();
}
// <1> 对JSON数据进行安全的解析
function jsonParse(callback, error, value) {
    if (error) {
        callback(error, value);
    } else {
        try {
            var result = JSON.parse(value);
            callback(null, result);
        } catch (e) {
            callback(e, value);
        }
    }
}
// <2> 发送XHR请求
var request = {
    comment: function getComment(callback) {
        return getURLCallback('http://azu.gijthub.io/promises-book/json/comment.json', jsonParse.bind(null, callback));
    },
    people: function getPeople(callback) {
        return getURLCallback('http://azu.github.io/promises-book/json/people.json', jsonParse.bind(null, callback));
    }
};
// <3> 启动多个XHR请求，当所有请求返回时调用callback
function allRequest(requests, callback, results) {
    if (requests.length === 0) {
        return callback(null, results);
    }
    var req = requests.shift();
    req(function (error, value) {
        if (error) {
            callback(error, value);
        } else {
            results.push(value);
            allRequest(requests, callback, results);
        }
    });
}
function main(callback) {
    allRequest([request.comment, request.people], callback, []);
}
// 运行的例子
main(function(error, results){
    if(error){
        return console.error(error);
    }
    console.log(results);
});

/**
 * 上述代码使用Promise的示例
 */

function getURL(URL) {
    return new Promise(function (resolve, reject) {
        var req = new XMLHttpRequest();
        req.open('GET', URL, true);
        req.onload = function () {
            if (req.status === 200) {
                resolve(req.responseText);
            } else {
                reject(new Error(req.statusText));
            }
        };
        req.onerror = function () {
            reject(new Error(req.statusText));
        };
        req.send();
    });
}
var request = {
    comment: function getComment() {
        return getURL('http://azu.github.io/promises-book/json/comment.json').then(JSON.parse);
    },
    people: function getPeople() {
        return getURL('http://azu.github.io/promises-book/json/people.json').then(JSON.parse);
    }
};
function main() {
    function recordValue(results, value) {
        results.push(value);
        return results;
    }
    // [] 用来保存初始化的值
    var pushValue = recordValue.bind(null, []);
    return request.comment().then(pushValue).then(request.people).then(pushValue);
}
// 运行的例子
main().then(function (value) {
    console.log(value);
}).catch(function(error){
    console.error(error);
});