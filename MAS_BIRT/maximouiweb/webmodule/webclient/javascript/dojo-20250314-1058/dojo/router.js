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

define("dojo/router", [
	"./router/RouterBase"
], function(RouterBase){

	// module:
	//		dojo/router

/*=====
return {
	// summary:
	//		A singleton-style instance of dojo/router/RouterBase. See that
	//		module for specifics.
	// example:
	//	|	router.register("/widgets/:id", function(evt){
	//	|		// If "/widgets/3" was matched,
	//	|		// evt.params.id === "3"
	//	|		xhr.get({
	//	|			url: "/some/path/" + evt.params.id,
	//	|			load: function(data){
	//	|				// ...
	//	|			}
	//	|		});
	//	|	});
};
=====*/

	return new RouterBase({});
});
