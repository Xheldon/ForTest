/**
 * @fileoverview img src no http but https
 * @author Xheldon
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var htmlparser = require('htmlparser2');
//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------


// import all rules in lib/rules
module.exports.rules = requireIndex(__dirname + '/rules');

var parser = new htmlparser.Parser({
    onopentag: function (name, attribs) {
        if (name === 'script' && attribs.type === 'text/javascript') {
            console.log('JS! Hooray!');
        }
    },
    ontext: function (text) {
        console.log('-->', text);
    },
    onclosetag: function (tagname) {
        if (tagname === 'script') {
            console.log('That\'s it?!');
        } else {
            console.log('tagname:', tagname);
        }
    }
}, {decodeEntities: false});

// import processors
module.exports.processors = {

    // add your processors here
    '.html': {
        preprocess: function (text, filename) {
            console.log('filename1:', filename);
            parser.write(text);
            parser.end();
            return [text];
        },
        postprocess: function (messages, filename) {
            console.log('messages:', messages);
            console.log('filename2:', filename);
            return ['fuck'];
        }
    }
};

