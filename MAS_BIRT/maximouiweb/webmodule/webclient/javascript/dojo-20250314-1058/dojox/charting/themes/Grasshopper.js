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

define("dojox/charting/themes/Grasshopper", ["dojo/_base/lang","../SimpleTheme", "./common"], function(lang, SimpleTheme, themes){
	themes.Grasshopper = new SimpleTheme({
		colors: [
			"#208040",
			"#40b657",
			"#78c25e",
			"#14401f",
			"#64bd5f"
		]
	});
	return themes.Grasshopper;
});
