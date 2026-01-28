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

define(["../SimpleTheme", "./common"], function(SimpleTheme, themes){
	themes.MiamiNice = new SimpleTheme({
		colors: [
			"#7f9599",
			"#45b8cc",
			"#8ecfb0",
			"#f8acac",
			"#cc4482"
		]
	});
	return themes.MiamiNice;
});
