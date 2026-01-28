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

define(["../Theme", "./gradientGenerator", "./common"], function(Theme, gradientGenerator, themes){

	var colors = ["#f00", "#0f0", "#00f", "#ff0", "#0ff", "#f0f", "./common"],
		defaultFill = {type: "linear", space: "plot", x1: 0, y1: 0, x2: 0, y2: 100};

	themes.PrimaryColors = new Theme({
		seriesThemes: gradientGenerator.generateMiniTheme(colors, defaultFill, 90, 40, 25)
	});
	
	return themes.PrimaryColors;
});
