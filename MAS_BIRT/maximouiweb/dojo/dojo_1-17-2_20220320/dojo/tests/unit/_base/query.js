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
    '../../../query',
    '../../../_base/query'
], function (registerSuite, assert, query, baseQuery) {
    registerSuite({
        name: 'dojo/_base/query',

        "delegates to dojo/query": function () {
            assert.equal(query, baseQuery);
        }
    });
});
