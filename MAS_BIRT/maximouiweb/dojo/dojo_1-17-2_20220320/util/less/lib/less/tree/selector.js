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

tree.Selector = function (elements) {
    this.elements = elements;
};
tree.Selector.prototype.match = function (other) {
    var elements = this.elements,
        len = elements.length,
        oelements, olen, max, i;

    oelements = other.elements.slice(
        (other.elements.length && other.elements[0].value === "&") ? 1 : 0);
    olen = oelements.length;
    max = Math.min(len, olen)

    if (olen === 0 || len < olen) {
        return false;
    } else {
        for (i = 0; i < max; i++) {
            if (elements[i].value !== oelements[i].value) {
                return false;
            }
        }
    }
    return true;
};
tree.Selector.prototype.eval = function (env) {
    return new(tree.Selector)(this.elements.map(function (e) {
        return e.eval(env);
    }));
};
tree.Selector.prototype.toCSS = function (env) {
    if (this._css) { return this._css }
    
    if (this.elements[0].combinator.value === "") {
        this._css = ' ';
    } else {
        this._css = '';
    }
    
    this._css += this.elements.map(function (e) {
        if (typeof(e) === 'string') {
            return ' ' + e.trim();
        } else {
            return e.toCSS(env);
        }
    }).join('');
    
    return this._css;
};

})(require('../tree'));
