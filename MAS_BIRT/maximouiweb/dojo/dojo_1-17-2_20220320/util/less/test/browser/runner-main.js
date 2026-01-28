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

less.functions = {
    add: function (a, b) {
        return new(less.tree.Dimension)(a.value + b.value);
    },
    increment: function (a) {
        return new(less.tree.Dimension)(a.value + 1);
    },
    _color: function (str) {
        if (str.value === "evil red") { return new(less.tree.Color)("600") }
    }
};

describe("less.js main tests", function() {
    testLessEqualsInDocument();
});
