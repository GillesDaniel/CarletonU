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
    'require'
], function (registerSuite, assert, require) {

    var baseId = "xml",
        uniqueId = 0;

    function getId() {
        return baseId + uniqueId++;
    }

    registerSuite({
        name: "dojo/query with xml documents",
        before: function () {
            return this.get("remote")
                    .get(require.toUrl("./xml.html"))
                    .setExecuteAsyncTimeout(10000)
                    .executeAsync(function (send) {
                        require([
                            'dojo/query',
                            'dojo/domReady!'
                        ], function (_query) {
                            query = _query;

                            send();
                        })
                    })
                    .then(function () { });
        },
        "matched nodes": function () {
            var nodeId = getId();
            return this.get("remote")
                .execute(function (nodeId) {
                    var result = {};

                    var node = document.createElement("p");
                    node.id = nodeId;
                    document.body.appendChild(node);

                    result["p#"] = query("p#" + nodeId);

                    return result;
                }, [nodeId])
                .then(function (result) {
                    assert.equal(result["p#"].length, 1, "matched nodes");
                })
        }
    });

});
