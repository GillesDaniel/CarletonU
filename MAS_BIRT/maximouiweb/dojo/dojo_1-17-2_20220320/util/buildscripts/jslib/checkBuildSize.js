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

//assumes cwd of util/buildscripts

//TODO: could take profile and compression option as args

load("jslib/logger.js");
load("jslib/fileUtil.js");
load("jslib/buildUtil.js");

var result = buildUtil.makeDojoJs(buildUtil.loadDependencyList(buildUtil.evalProfile("profiles/base.profile.js")), "0.0.0");

var layer0 = buildUtil.optimizeJs(null, result[0].contents, null, "shrinksafe");
print(layer0.length);

