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

define(["../buildControl"], function(bc) {
	return function(resource){
		if(resource.hasTest){
			return 0;
		}
		var
			hasFeatures = bc.hasFeatures = bc.hasFeatures || {},
			text = resource.text,
			hasRe = /[^\w\.]has\s*\(\s*["']([^"']+)["']\s*\)/g,
			result;
		while((result = hasRe.exec(text)) != null){
			var
				featureName = result[1],
				sourceSet = hasFeatures[featureName] = hasFeatures[featureName] || {};
			sourceSet[resource.mid] = 1;
		}
		return 0;
	};
});
