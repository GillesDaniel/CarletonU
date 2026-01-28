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

define([], function(){
	return {
		start:function(
			mid,
			referenceModule,
			bc
		){
			var result = [bc.amdResources["dojo/require"]];
			mid.split(",").map(function(mid){
				var module = bc.amdResources[mid];
				if(!module){
					bc.log("legacyMissingDependency", ["reference module", referenceModule.mid, "dependency", mid]);
				}else{
					result.push(module);
				}
			});
			return result;
		}
	};
});

