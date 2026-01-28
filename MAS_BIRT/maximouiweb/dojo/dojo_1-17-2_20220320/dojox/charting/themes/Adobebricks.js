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
	themes.Adobebricks = new SimpleTheme({
		colors: [
			"#7f2518",
			"#3e170c",
			"#cc3927",
			"#651f0e",
			"#8c271c"
		]
	});
	return themes.Adobebricks;
});
