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
	themes.WatersEdge = new SimpleTheme({
		colors: [
			"#437cc0",
			"#6256a5",
			"#4552a3",
			"#43c4f2",
			"#4b66b0"
		]
	});
	return  themes.WatersEdge;
});
