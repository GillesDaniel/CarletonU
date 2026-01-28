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

/**
 * Holds information for a Marker Image.
 * 
 * Constructor params:
 * 
 * ibm.tivoli.fwm.mxmap.MarkerImageInfo({
 * 											imageUrl: string (required), 
 * 											imageSize: [Integer, Integer] (optional), 
 * 											imageAnchor: [Integer] (optional)
 * 										})
 */

define(["dojo/_base/declare"],
	 function(declare) {
	
	return declare(null, {
		_imageSize: null,
		_imageAnchor: null,
		_imageURL: null,
		constructor : function(options) {
			dojo.mixin(this, options);		
			this._imageSize = options.imageSize || [32,32];
			this._imageAnchor = options.imageAnchor || [0,32];
			this._imageURL = options.imageUrl || "";
		},
		getImageSize: function()
		{
			return this._imageSize;
		},
		getImageAnchor: function()
		{
			return this._imageAnchor;
		},
		getImageURL: function()
		{
			return this._imageURL;
		},
		getSymbolURL: function()
		{
			return this._imageURL;
		},
		setImageURL: function(newURL)
		{
			this._imageURL = newURL;
		},
		generateMarkerData:function(label,draggable,hover){
			return {
			label : label,
			draggable : true==draggable,
			icon : this.getImageURL(),
			iconSize : this.getImageSize(),
			iconAnchor : this.getImageAnchor(),
			hover : true==hover,
			// Defect 67228 - See explanation in GmapsMarker (toProprietary method)
			dontDrawAsOverlay: true
			};			
		}
	});
});

