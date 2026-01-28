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

define("dojox/app/module/env", ["dojo/_base/declare"], function(declare){
	return declare(null, {
		mode: "",
		init: function(){

			//TODO BROADLY categorize the mode of the app...mobile,desktop
			//     This should be done with UA sniffing, but remember
			//	very broadly, this is for purposes of deciding
			//	which ui to render, NOT feature detection	
			/*
			this.mode="mobile";
			var def = this.inherited(arguments);

			//just an example
			return def.then(function(){
				console.log("env init after inherited inits");
			});	
			*/
		}
	});
});
