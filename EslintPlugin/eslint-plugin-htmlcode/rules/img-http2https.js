/**
 * @fileoverview img src no http but only https
 * @author Xheldon
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "图片不能以 http 开头",
            category: "no-img-http-but-https",
            recommended: false
        },
        fixable: null,  // or "code" or "whitespace"
        schema: [
            // fill in your schema
        ]
    },

    create: function(context) {

        // variables should be defined here

        //----------------------------------------------------------------------
        // Helpers
        //----------------------------------------------------------------------

        // any helper functions should go here or else delete this section

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------
        function imgExt (url) {
            if (typeof url == 'string') {
                var newUrl = url.trim();
                return (/\.(png|jpe?g|gif|svg)(\?.*)?$/.test(newUrl) && /^(http:){1}/.test(newUrl));
            }
        }
        return {
            Literal: function (node) {
                if (imgExt(node.value)) {
                    context.report(node, '图片文件必须以 https 开头');
                }
            }
            // give me methods

        };
    }
};
