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

define("dojox/charting/themes/BlueDusk", ["../SimpleTheme", "./common"], function(SimpleTheme, themes){
	themes.BlueDusk = new SimpleTheme({
		colors: [
			"#292e76",
			"#3e56a6",
			"#10143f",
			"#33449c",
			"#798dcd"
		]
	});
	
	return themes.BlueDusk;
});
