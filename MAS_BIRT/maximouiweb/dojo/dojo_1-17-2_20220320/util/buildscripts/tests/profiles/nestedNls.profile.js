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

var dependencies = {
  prefixes: [
    [ "foo", "../util/buildscripts/tests/foo" ],
    [ "dojox", "../dojox" ],
    [ "dijit", "../dijit" ]
  ],
  layers: [
    {
      name: "../dijit/dijit.js",
      resourceName: "dijit.dijit",
      layerDependencies: [ "dojo.js" ],
      dependencies: [ "dijit.dijit" ]
    },
    {
      name: "../foo/page/view.js",
      resourceName: "foo.page.view",
      layerDependencies: [ "dojo.js", "../dijit/dijit.js" ],
      dependencies: [ "foo.page.view" ]
    }
  ]
};
