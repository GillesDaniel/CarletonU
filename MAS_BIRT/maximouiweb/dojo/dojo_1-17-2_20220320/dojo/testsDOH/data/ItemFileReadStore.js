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

// FIXME: this test assumes the existence of the global object "tests"
tests= typeof tests=="undefined" ? {} : tests;

define(["./readOnlyItemFileTestTemplates", "dojo/data/ItemFileReadStore"], function(){
	tests.data.readOnlyItemFileTestTemplates.registerTestsForDatastore("dojo.data.ItemFileReadStore");
});

