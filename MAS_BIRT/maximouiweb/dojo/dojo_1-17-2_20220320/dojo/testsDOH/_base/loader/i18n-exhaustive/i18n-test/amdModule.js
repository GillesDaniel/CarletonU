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

define(["dojo/_base/kernel", "dojo/i18n!./nls/amdBundle"], function(dojo, amdBundle){
	var result = [];

	if(amdBundle.rootValueOnly!="rootValueOnly"){
		result.push('amdBundle.rootValueOnly!="rootValueOnly"');
	}
	switch(dojo.locale){
		case "ab":
		case "ab-cd":
			if(amdBundle.amdBundle!="amdBundle-ab"){
				result.push('amdBundle.amdBundle!="amdBundle-ab"');
			}
			if(amdBundle.abValueOnly!="abValueOnly"){
				result.push('amdBundle.abValueOnly!="abValueOnly"');
			}
			break;
		case "ab-cd-ef":
			if(amdBundle.amdBundle!="amdBundle-ab-cd-ef"){
				result.push('amdBundle.amdBundle!="amdBundle-ab-cd-ef"');
			}
			if(amdBundle.abValueOnly!="abValueOnly"){
				result.push('amdBundle.abValueOnly!="abValueOnly"');
			}
			if(amdBundle.abCdEfValueOnly!="abCdEfValueOnly"){
				result.push('amdBundle.abCdEfValueOnly!="abCdEfValueOnly"');
			}
			break;
		default:
			if(amdBundle.amdBundle!="amdBundle"){
				result.push('amdBundle.amdBundle!="amdBundle"');
			}
	}


	var i18n= require("dojo/i18n");
	for(var p in i18n._cache) console.log(p);

	return {
		result:result.length==0 ? true : result.join(";")
	};
});
