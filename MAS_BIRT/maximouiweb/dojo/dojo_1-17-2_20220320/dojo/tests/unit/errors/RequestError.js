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
    '../../../_base/declare'
], function (registerSuite, assert, sinon, require, create, RequestError, declare) {
    registerSuite({
        name: 'dojo/errors/RequestError',

        "returns correct result": function () {
            //arrange
            var response= {foo: "bar"};

            //act
            var result = new RequestError("foo", response);


            //assert
            assert.equal(result.name, "RequestError");
            assert.equal(result.response, response);
        }
    });
});
