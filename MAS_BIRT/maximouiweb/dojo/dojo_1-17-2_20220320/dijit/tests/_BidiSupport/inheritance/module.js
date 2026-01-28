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

	doh.register("_BidiSupport.inheritance.Inher-Simple", require.toUrl("./Inher-Simple.html"), 999999);

	doh.register("_BidiSupport.inheritance.Inher-MarkupContainers", require.toUrl("./Inher-MarkupContainers.html"), 999999);

	doh.register("_BidiSupport.inheritance.Inher-ComplexMarkupContainers", require.toUrl("./Inher-ComplexMarkupContainers.html"), 999999);

});
