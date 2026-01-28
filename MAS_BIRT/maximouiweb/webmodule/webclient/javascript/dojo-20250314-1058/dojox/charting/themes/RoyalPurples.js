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

define("dojox/charting/themes/RoyalPurples", ["../SimpleTheme", "./common"], function(SimpleTheme, themes){
	themes.RoyalPurples = new SimpleTheme({
		colors: [
			"#473980",
			"#685aa7",
			"#7970b3",
			"#231c3f",
			"#7267ae"
		]
	});
	return themes.RoyalPurples;
});
