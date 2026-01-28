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
	themes.Midwest=new SimpleTheme({
		colors: [
			"#927b51",
			"#a89166",
			"#80c31c",
			"#bcdd5a",
			"#aebc21"
		]
	});
	return themes.Midwest;
});
