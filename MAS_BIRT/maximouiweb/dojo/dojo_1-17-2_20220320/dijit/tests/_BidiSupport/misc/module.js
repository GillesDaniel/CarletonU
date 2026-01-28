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

	doh.register("_BidiSupport.misc.Tooltip.html", require.toUrl("./Tooltip.html"), 999999);
	doh.register("_BidiSupport.misc.Dialog.html", require.toUrl("./Dialog.html"), 999999);
	doh.register("_BidiSupport.misc.TooltipDialog.html", require.toUrl("./TooltipDialog.html"), 999999);
	doh.register("_BidiSupport.misc.MenuItem.html", require.toUrl("./MenuItem.html"), 999999);
	doh.register("_BidiSupport.layout.TitlePane", require.toUrl("./TitlePane.html"), 999999);

});
