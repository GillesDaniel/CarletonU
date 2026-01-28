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

define("dojox/charting/themes/Ireland", ["../SimpleTheme", "./common"], function(SimpleTheme, themes){
	themes.Ireland = new SimpleTheme({
		colors: [
			"#abdbcb",
			"#435a51",
			"#70998b",
			"#78d596",
			"#5f8074"
		]
	});
	return themes.Ireland;
});
