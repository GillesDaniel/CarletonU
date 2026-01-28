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

tree.Paren = function (node) {
    this.value = node;
};
tree.Paren.prototype = {
    toCSS: function (env) {
        return '(' + this.value.toCSS(env) + ')';
    },
    eval: function (env) {
        return new(tree.Paren)(this.value.eval(env));
    }
};

})(require('../tree'));
