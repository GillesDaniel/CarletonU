/*
 * Licensed Materials - Property of IBM
 *
 * 5724-U18, 5737-M66
 *
 * (C) Copyright IBM Corp. 2023,2024 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */

(function (tree) {

tree.URL = function (val, rootpath) {
    this.value = val;
    this.rootpath = rootpath;
};
tree.URL.prototype = {
    toCSS: function () {
        return "url(" + this.value.toCSS() + ")";
    },
    eval: function (ctx) {
        var val = this.value.eval(ctx), rootpath;

        // Add the base path if the URL is relative
        if (typeof val.value === "string" && !/^(?:[a-z-]+:|\/)/.test(val.value)) {
            rootpath = this.rootpath;
            if (!val.quote) {
                rootpath = rootpath.replace(/[\(\)'"\s]/g, function(match) { return "\\"+match; });
            }
            val.value = rootpath + val.value;
        }

        return new(tree.URL)(val, this.rootpath);
    }
};

})(require('../tree'));
