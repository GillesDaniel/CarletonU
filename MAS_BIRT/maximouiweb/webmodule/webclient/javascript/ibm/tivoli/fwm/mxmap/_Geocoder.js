/* IBM Confidential
 *
 * OCO Source Materials
 *
 * 5724-U18, 5737-M66
 *
 * (C) COPYRIGHT IBM CORP. 2011,2024
 *
 * The source code for this program is not published or otherwise
 * divested of its trade secrets, irrespective of what has been
 * deposited with the U.S. Copyright Office.
 */

define(["dojo/_base/declare"], 
		function(declare) {
	return declare(null, {
		geocoder: null,

		constructor: function(callback, error_callback, optParams)
		{
			this.callback = callback;
			this.error_callback = error_callback || function(){};
			this.optParams = optParams;
			this._init();
		},
		_init: function()
		{
			console.error("Method " + arguments.callee.nom + " be implemented by the derived class");
		},
		geocode: function()
		{
			console.error("Method " + arguments.callee.nom + " be implemented by the derived class");
		},
		geocode_callback: function()
		{
			console.error("Method " + arguments.callee.nom + " be implemented by the derived class");
		}
	});
});
