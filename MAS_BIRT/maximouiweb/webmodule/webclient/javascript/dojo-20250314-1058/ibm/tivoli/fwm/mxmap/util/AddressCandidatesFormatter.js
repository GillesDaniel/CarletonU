/* IBM Confidential
 *
 * OCO Source Materials
 *
 * 5724-U18, 5737-M66
 *
 * (C) COPYRIGHT IBM CORP. 2012,2024
 *
 * The source code for this program is not published or otherwise
 * divested of its trade secrets, irrespective of what has been
 * deposited with the U.S. Copyright Office.
 */


define("ibm/tivoli/fwm/mxmap/util/AddressCandidatesFormatter", ["dojo/_base/declare",
	"dojo/main", "dijit/main",
	"ibm/tivoli/fwm/mxmap/_Base",
	"ibm/tivoli/fwm/mxmap/panels/MobileInfoPanelLine"],
	function(declare, dojo, dijit, _Base, MobileInfoPanelLine ) {

	/**
	 * @param candidates An array with objects that has formattedAddress attribute
	 * @param mapId the of the geocoder's map.
	 * @param dialog width
	 * @param dialog height
	 * @return a DOM object with the information
	 * */
	return {
		createHTMLDOMWithList: function(candidates, mapId, width, height){
			var holder = dojo.create("div");

			// because of ie does not accept 100%, we do not use the table style
			// we use the dialog width -20 px
			var _width = width - 25;
			var table = dojo.create("table", {role: "grid", valign: "top", width:"100%", "class":"addressCandidateTable"}, holder, "last");

			// 12-10393: ie needs a tbody
			var tbody = dojo.create("tbody", {}, table, "last");	

			// creates a closure to capture the address
			var newPublishFunctionForAddress = function(selectedAddress){
				return function() { 
					dojo.publish("addressCandidateSelectedOnMapId_" + mapId, [selectedAddress]); 
				};
			};
			// as per designed, show only the first 10 candidates
			if(candidates.length > 10){
				candidates = candidates.slice(0, 10);
			}

			for(var index in candidates){
				var candidate = candidates[index];
				//var rowClass = index % 2 != 0 ? "tablerow trodd" : "tablerow  treven";  //breaks the horizontal scroll in small widths
				var rowClass = index % 2 != 0 ? "" : "addresscandidateRowStyle";
				var selectAddress = newPublishFunctionForAddress(candidate);
				var _content = candidate.formattedAddress;
				var newLine = new MobileInfoPanelLine();
				newLine.setRowClass(rowClass);
				newLine.setCallbackFunction(selectAddress);
				newLine.setContent(_content);
				newLine.placeAt(tbody, "last");
			}	
			return holder;
		}
	};
});



