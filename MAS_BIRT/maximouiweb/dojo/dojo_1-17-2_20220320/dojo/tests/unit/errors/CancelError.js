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

define([
    'intern!object',
    'intern/chai!assert',
    'sinon',
    'require',
    '../../../errors/create',
    '../../../errors/CancelError',
    '../../../_base/declare'
], function (registerSuite, assert, sinon, require, create, CancelError, declare) {
    registerSuite({
        name: 'dojo/errors/CancelError',

        "returns correct result": function () {
            //arrange

            //act


            //assert
            assert.equal(CancelError.prototype.name, "CancelError");
            assert.equal(CancelError.prototype.dojoType, "cancel");
        }
    });
});
