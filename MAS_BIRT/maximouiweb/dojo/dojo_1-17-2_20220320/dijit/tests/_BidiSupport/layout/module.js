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

define(["doh/main", "require"], function(doh, require){
	doh.register("_BidiSupport.layout.TabContainer", require.toUrl("./TabContainer.html"), 999999);
	doh.register("_BidiSupport.layout.StackContainer", require.toUrl("./StackContainer.html"), 999999);
	doh.register("_BidiSupport.layout.AccordionContainer", require.toUrl("./AccordionContainer.html"), 999999);
});
