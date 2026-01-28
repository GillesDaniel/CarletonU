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
    '../../../errors/RequestError',
    '../../../errors/RequestTimeoutError',
    '../../../_base/declare'
], function (registerSuite, assert, sinon, require, create, RequestError, RequestTimeoutError, declare) {
    registerSuite({
        name: 'dojo/errors/RequestTimeoutError',

        "returns correct result": function () {
            //arrange
            var response = { foo: "bar" };

            //act
            var result = new RequestTimeoutError("foo", response);

            //assert
            assert.equal(result.name, "RequestTimeoutError");
            assert.instanceOf(result, RequestError);
            assert.equal(result.response, response);
            assert.equal(result.dojoType, "timeout");
        }
    });
});
