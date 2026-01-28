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

define(function() {
	return {
		start:function(
			id,
			referenceModule,
			bc
		) {
			var result = [bc.amdResources["dojo/selector/_loader"]];
			if(bc.selectorEngine){
				result = result.concat(bc.amdResources["dojo/selector/" + bc.selectorEngine]);
			}
			return result;
		}
	};
});
