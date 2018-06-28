/**
 * @fileoverview img src no http but https
 * @author Xheldon
 */
"use strict";
// 处理 html 中的以 http 开头的 img 标签并给出警告
//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------
var requireIndex = require('requireIndex');
var htmlparser = require("htmlparser2");
//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------


// import all rules in rules
module.exports.rules = requireIndex(__dirname + "/rules");

var parser = new htmlparser.Parser({
    onopentag: function(name, attribs){
        if(name === "img" && (/\.(png|jpe?g|gif|svg)(\?.*)?$/.test(attribs.src) && /^(http:){1}/.test(attribs.src))){
            console.log("找到一个 img 标签且以 http 开头的啦");
        }
    }/* ,
    ontext: function(text){
        console.log("-->", text);
    },
    onclosetag: function(tagname){
        if(tagname === "script"){
            console.log("That's it?!");
        } else {
            console.log('tagname:', tagname);
        }
    } */
}, {decodeEntities: true});

// import processors
module.exports.processors = {

    // add your processors here
    '.html': {
        preprocess: function (text, filename) {
            console.log('filename1:', filename);
            parser.write(text);
            parser.end();
            return ['console.log("shit");'] // 可惜 eslint 只能 lint js, 因此即使处理了 html, 也需要返回 js 语句, 因此需要在获取 html sorucecode 中就给出警告, 但是因为在格式化 html sourcecode 过程中无法获取 context.report, 因此, 没办法, 呵呵.
        },
        postprocess: function (messages, filename) {
            console.log('messages:', messages);
            console.log('filename2:', filename);
            return ['fuck'];
        }
    }
};

