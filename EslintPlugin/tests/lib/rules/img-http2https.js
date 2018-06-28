/**
 * @fileoverview img src no http but only https
 * @author Xheldon
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require('../../../lib/rules/img-http2https'),

    RuleTester = require('eslint').RuleTester;

// RuleTester.setDefaultConfig({
//     parserOptions: {
//         ecmaVersion: 6,
//         ecmaFeatures: {
//             jsx: true
//         }
//     }
// });

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run('img-http2https', rule, {

    valid: [
        {
            code: '<img src="https://some.url.jpg" />'
        }
    ],

    invalid: [
        {
            code: '<img src="http://some.url.jpg" />',
            errors: [{
                message: '图片文件必须以 https 开头',
                type: 'Literal'
            }]
        }
    ]
});
