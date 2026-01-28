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
	themes.SageToLime = new SimpleTheme({
		colors: [
			"#abdbcb",
			"#435a51",
			"#70998b",
			"#5f8074",
			"#80ccbb",
			"#539e8b",
			"#78a596",
			"#335f54",
			"#8dd1c2",
			"#68c5ad"
		]
	});
	return themes.SageToLime;
});
