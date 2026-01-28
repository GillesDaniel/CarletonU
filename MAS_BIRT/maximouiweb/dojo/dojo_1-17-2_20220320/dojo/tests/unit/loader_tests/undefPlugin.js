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
    'require',
    'intern!object', 
    'intern/chai!assert', 
    '../../../Deferred',
    '../../../has' 
], function(require, registerSuite, assert, Deferred, has) {

    function testIt(expected, fooValue, barValue) {
        has.add("foo", fooValue, true, true);
        has.add("bar", barValue, true, true);
        var dfd = new Deferred();
        require([ "../support/foobarPlugin!" ], function(data) {
            assert.strictEqual(data, expected);
            dfd.resolve();
        });
        return dfd;
    }

    registerSuite({
        name : 'dojo/loader_tests/undefPlugin',
        setup : function() {
            require({async:true});  // only fails in async mode
        },
        beforeEach : function() {
            require.undef('../support/foobarPlugin!');
            require.undef('../support/foobarPlugin');
        },
        teardown : function() {
            require.undef('../../support/foobarPlugin!');
            require.undef('../../support/foobarPlugin');
        },
        expectFoo : function() {
            return testIt("foo", true, false);
        },
        expectBar : function() {
            return testIt("bar", false, true);
        },
        expectUndefined : function() {
            return testIt("undefined", false, false);
        }
    });

});
