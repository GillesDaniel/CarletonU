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

define("dojox/charting/themes/Bahamation", ["../SimpleTheme", "./common"], function(SimpleTheme, themes){
	themes.Bahamation = new SimpleTheme({
		colors: [
			"#3f9998",
			"#3fc0c3",
			"#70c058",
			"#ef446f",
			"#c663a6"
		]
	});
	return themes.Bahamation;
});
