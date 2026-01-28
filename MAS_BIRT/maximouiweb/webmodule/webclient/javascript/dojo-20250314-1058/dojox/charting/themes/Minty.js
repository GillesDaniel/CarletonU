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

define("dojox/charting/themes/Minty", ["../SimpleTheme", "./common"], function(SimpleTheme, themes){
	themes.Minty = new SimpleTheme({
		colors: [
			"#80ccbb",
			"#539e8b",
			"#335f54",
			"#8dd1c2",
			"#68c5ad"
		]
	});
	return themes.Minty;
});
