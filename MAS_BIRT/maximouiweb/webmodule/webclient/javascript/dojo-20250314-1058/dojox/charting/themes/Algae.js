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

define("dojox/charting/themes/Algae", ["../SimpleTheme", "./common"], function(SimpleTheme, themes){
	themes.Algae = new SimpleTheme({
		colors: [
			"#57808f",
			"#506885",
			"#4f7878",
			"#558f7f",
			"#508567"
		]
	});
	return themes.Algae;
});
