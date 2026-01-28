/*
 * IBM Confidential
 * 
 * OCO Source Materials
 * 
 * 5724-U18, 5737-M66
 * 
 * (C) COPYRIGHT IBM CORP. 2011,2024
 * 
 * The source code for this program is not published or otherwise divested of
 * its trade secrets, irrespective of what has been deposited with the U.S.
 * Copyright Office.
 */


define(["dojo/_base/declare",
	"ibm/tivoli/fwm/mxmap/_Base",
	"ibm/tivoli/fwm/i18n",
	"dijit/form/Select",
	"ibm/tivoli/fwm/mxmap/InfoSummaryPanelWidget",
	"ibm/tivoli/fwm/mxmap/InfoSummaryWidget"],
	function(declare, _Base, i18n, Select, InfoSummaryPanelWidget, InfoSummaryWidget ) {

	/**
	 * Implement the logic for loading, parsing and caching Maptips. A marker
	 * can be enabled to show maptips. This marker must be associated with a Maximo
	 * record so based on the mxdata the maptip can be loaded.
	 * 
	 * This manager will cache any already loaded maptip (based on objectname/id).
	 * The maptip is loaded based on the rest format 'maptip' from the rest
	 * interface.
	 * 
	 */
	return declare([_Base], {
		_templateCache: {},
		_summaryTemplateCache: {},
		_menuCache: {},
		maximo: null,
		constructor: function(params)
		{
			dojo.mixin(this, params);
			this._templateCache = {};
			this._summaryTemplateCache = {};
			this._menuCache = {};
		},
		_cloneMarkerOpenBubbleImplementation: function(marker)
		{
			// here is the trick
			// replace the marker's openBubble function by a function that
			// first tries to load the maptip from maximo, set the
			// infoBubble and only then call the original openBubble.
			//
			marker.openBubble.clone = function()
			{
				var that = this;
				var temp = function temporary()
				{
					return that.apply(this, arguments);
				};
				for (key in this)
				{
					temp[key] = this[key];
				}
				return temp;
			};
			var obclone = marker.openBubble.clone();
			return obclone;
		},
		/**
		 * It enables the infowindow replacement with the associated maptip
		 * 
		 * @param mapstraction
		 *            marker
		 * @param mxdata
		 *            json object with this structure: { mboName://NAME OF THE
		 *            MAXIMO OBJECT, uid: { name://NAME OF THE COLUMN WITH THE MBO
		 *            UID value: //VALUE THE MBO UID } * }
		 */
		enableMarker: function(marker, mxdata, mapTipOverrides)
		{
			marker.obclone = this._cloneMarkerOpenBubbleImplementation(marker);
			var me = this;
			marker.openBubble = function()
			{
				me._handleOpenBubble(marker, mxdata, mapTipOverrides, marker.obclone);
			};
		},
		updateMultiMarkerOpenBubbleHandler: function(marker, mboInfoArray)
		{
			var me = this;
			marker.clearReferencedMarkers();
			for(var i=0; i<mboInfoArray.length; i++)
			{
				if(mboInfoArray[i].marker)
				{
					// Set the marker as a "referenced marker" of the multimarker so that, when the maptip
					// summary is closed, any other maptips that belong to the referenced markers will
					// be closed as well
					marker.addReferencedMarker(mboInfoArray[i].marker);
				}
			}
			marker.openBubble = function()
			{
				me._handleMultiMarkerOpenBubble(marker, mboInfoArray, marker.obclone);
			};
		},
		enableMultiMarker: function(marker, mboInfoArray)
		{
			marker.obclone = this._cloneMarkerOpenBubbleImplementation(marker);
			this.updateMultiMarkerOpenBubbleHandler(marker, mboInfoArray);
		},
		// checks if a maptip template was already loaded
		_isTemplateLoaded: function(objectname, id)
		{
			return this._templateCache[objectname] && this._templateCache[objectname][id];
		},
		// checks if a maptip summary template was already loaded
		_isSummaryTemplateLoaded: function(objectname, id)
		{
			return this._summaryTemplateCache[objectname] && this._summaryTemplateCache[objectname][id];
		},
		// gets a maptip template
		// * it assumes the template is loaded.
		_getTemplate: function(objectname, id)
		{
			return this._templateCache[objectname][id];
		},
		_getSummaryTemplate: function(objectname, id)
		{
			return this._summaryTemplateCache[objectname][id];
		},
		// gets a maptip template summary (only the first html line)
		// * it assumes the template is loaded.
		_getSummaryTemplateWidget: function(objectname, id)
		{
			var templateSummary = this._getSummaryTemplate(objectname, id);

			var summaryWidget = new InfoSummaryWidget();
			summaryWidget.setContent(templateSummary);

			return summaryWidget;
		},

		// after loading the template from the server it
		// updates the cache and trigger the openMapTip
		_onTemplateLoaded: function(html, marker, mxdata, fct)
		{
			var objectname = mxdata.mboName;
			var id = mxdata.uid.value;
			this._updateTemplate(objectname, id, html);
			this._openMapTip(objectname, id, marker, fct);
		},
		// update the cache with template data
		_updateTemplate: function(objectname, id, html)
		{
			if (!this._templateCache.hasOwnProperty(objectname))
			{
				this._templateCache[objectname] = {};
			}
			this._templateCache[objectname][id] = html;
		},
		// update the cache with maptip summary template data
		_updateSummaryTemplate: function(objectname, id, html)
		{
			if (!this._summaryTemplateCache.hasOwnProperty(objectname))
			{
				this._summaryTemplateCache[objectname] = {};
			}
			this._summaryTemplateCache[objectname][id] = html;
		},
		// triggers the specific marker openbubble method
		// * it assumes the template is loaded.
		_openMapTip: function(objectname, id, marker, fct)
		{
			var html = this._getTemplate(objectname, id);
			var menuData = this._getMenuData(objectname);
			var infoDOM = this._createInfoDOM(html, menuData, objectname, id);
			marker.setInfoBubble(infoDOM);
			fct.apply(marker);
		},
		// triggers the specific multi marker openbubble method
		// * it assumes the template is loaded.
		_openMapTipSummary: function(mboInfoArray, marker, fct)
		{
			var maptipSummaryPanel = new InfoSummaryPanelWidget();
			var div = dojo.create("div");
			for(var i=0; i<mboInfoArray.length; i++)
			{
				var objectname = mboInfoArray[i].mxdata.mboName;
				var id = mboInfoArray[i].mxdata.uid.value;
				var templateSummaryWidget = this._getSummaryTemplateWidget(objectname, id);
				if(mboInfoArray[i].marker)
				{
					// Set the marker's openBubble function as the handling function when the maptip
					// summary is clicked
					templateSummaryWidget.setMarkerOpenBubbleFunction(mboInfoArray[i].marker.openBubble);
				}
				dojo.place(templateSummaryWidget.domNode, div, 'last');

				// Add a line separator for all mxdata summary entries, but for the last one
				if(i < (mboInfoArray.length - 1))
				{
					dojo.place("<hr>", div, 'last');
					// Defect 67359 - Horizontal line makes the width of the div
					// as large as it can be... only in IE, of course...
					// Limiting the width so that it is larger than 200px only if necessary
					// Remember, IE does not recognize "max-" and "min-" properties...
					if(dojo.isIE)
					{
						dojo.style(div, "width", "200px");
					}
				}
			}
			dojo.place(div, maptipSummaryPanel.infoSummaryPanel, 'last');
			// Defect 66760 - Adding an outer div with overflow set to auto
			// so that a vertical scroll bar can show up when the content height
			// is bigger than the infoWindow height
			var outerDiv = dojo.create("div", {
				style: {
					overflow: "auto",
					marginTop: "8px",
					maxHeight: "300px"
				}
			});

			dojo.place(maptipSummaryPanel.infoSummaryPanel, outerDiv, 'only');

			marker.setInfoBubble(outerDiv);
			fct.apply(marker);
		},
		_createInfoDOM: function(html, menuData, objectName, objectId)
		{
			var outerDiv = dojo.create("div", {
				style: {
					overflow: "auto",
					marginTop: "8px",
					maxHeight: "300px"
				}
			});

			var htmlDiv = dojo.create("div", {
				innerHTML: html
			}, outerDiv);

			if (menuData)
			{
				var menuDiv = dojo.create("div", null, outerDiv);
				this._newSelect(menuData, menuDiv, objectName, objectId);
			}
			return outerDiv;

		},
		// on request to open the marker bubble we try to update the maptip
		// content;
		// fct - is the original open bubble function from the specific marker implementation.
		_handleOpenBubble: function(marker, mxdata, mapTipOverrides, fct)
		{
			var objectname = mxdata.mboName;
			console.log("objectname",objectname);
			// it's important to always load the info on server so we are skipping
			// the cache on the template
			/*
			 * // if the template has already been is loaded, then the menu had been
			 * loaded // before. if (this._isTemplateLoaded(objectname, id)) {
			 * console.info("Cache hit for " + objectname + ":" + id);
			 * this._openMapTip(objectname, id, marker, fct); } // if the template
			 * is not loaded, confirm the menu has already // been loaded for
			 * another // record. // if the menu was not loaded, load it and then
			 * load the // template afterwards. else {
			 */
			if (this._isMenuLoaded(objectname))
			{
				this._loadTemplate(mxdata, mapTipOverrides, marker, fct);
			}
			else
			{
				this._loadMenu(mxdata, mapTipOverrides, marker, fct);
			}
			// }

		},
		// on request to open the marker bubble we try to update the maptip
		// content;
		// fct - is the original open bubble function from the specific marker implementation.
		_handleMultiMarkerOpenBubble: function(marker, mboInfoArray, fct)
		{
			this._loadMultipleSummaryTemplate(mboInfoArray, marker, fct);
		},
		_loadMenu: function(mxdata, mapTipOverrides, marker, fct)
		{
			var fctSuccess = dojo.hitch(this, function(data)
					{
				this._onMenuLoaded(data, marker, mxdata, mapTipOverrides, fct);
					});
			var fctError = dojo.hitch(this, function(error)
					{
				this._onMenuLoadError(error, marker, mxdata, fct);
					});
			this.maximo.loadMapTipItems(fctSuccess, fctError);
		},
		_loadTemplate: function(mxdata, mapTipOverrides, marker, fct)
		{

			var fctSuccess = dojo.hitch(this, function(data)
					{
				this._onTemplateLoaded(data, marker, mxdata, fct);
					});
			var fctError = dojo.hitch(this, function(error)
					{
				this._onTemplateLoadError(error, marker, mxdata, fct);
					});
			// must load it.
			this.maximo.loadMapTipTemplate(mxdata, mapTipOverrides, fctSuccess, fctError);

		},
		_loadMultipleSummaryTemplate: function(mboInfoArray, marker, fct)
		{

			var mboInfoCount = 0;
			var fctError = dojo.hitch(this, function(error)
					{
				this._onTemplateLoadError(error, marker, fct);
					});
			var fctSuccess = dojo.hitch(this, function(data)
					{
				var objectname = mboInfoArray[mboInfoCount].mxdata.mboName;
				var id = mboInfoArray[mboInfoCount].mxdata.uid.value;
				this._updateSummaryTemplate(objectname, id, data);
				mboInfoCount += 1;
				if(mboInfoCount < mboInfoArray.length)
				{
					this.maximo.loadMapTipSummaryTemplate(mboInfoArray[mboInfoCount].mxdata, mboInfoArray[mboInfoCount].maptipoverrides, fctSuccess, fctError);
				}
				else
				{
					this._openMapTipSummary(mboInfoArray, marker, fct);
				}
					});
			// must load it.
			this.maximo.loadMapTipSummaryTemplate(mboInfoArray[mboInfoCount].mxdata, mboInfoArray[mboInfoCount].maptipoverrides, fctSuccess, fctError);

		},

		// on any error we just set the maptip content with the error
		_onTemplateLoadError: function(error, marker, fct)
		{
			marker.setInfoBubble("Error loading maptip " + error);
			fct.apply(marker);
		},
		// on any error we just set the maptipmenu content with the error
		_onMenuLoadError: function(error, marker, mxdata, fct)
		{
			marker.setInfoBubble("Error loading maptipmenu " + error);
			fct.apply(marker);
		},
		_onMenuLoaded: function(menusJSON, marker, mxdata, mapTipOverrides, fct)
		{
			for ( var objName in menusJSON)
			{
				var menuItems = menusJSON[objName];
				console.log(objName, menuItems);
				this._updateMenu(objName, menuItems);
			}
			this._loadTemplate(mxdata, mapTipOverrides, marker, fct);
		},
		_updateMenu: function(objectname, menuJSON)
		{
			var moreDetails = ibm.tivoli.fwm.i18n.getMaxMsg("map", "moredetailsaboutrecord");
			var items = [ {
				value: 'noaction',
				label: moreDetails,
				selected: true
			} ];
			for ( var itemMenu in menuJSON)
			{

				var itemInfo = {
						value: menuJSON[itemMenu],
						label: menuJSON[itemMenu].name
				};
				itemInfo.itemData = menuJSON[itemMenu];
				items.push(itemInfo);
			}
			this._menuCache[objectname] = items;
		},
		_isMenuLoaded: function(objectname)
		{
			return this._menuCache[objectname] != null;
		},
		_newSelect: function(menuJSON, div, objectName, objectId)
		{
			console.log(menuJSON);
			var select;
			var fctOnChange = dojo.hitch(this, function(item)
					{
				if ('noaction' != '' + item)
				{
					console.log("dialog", item);
					this.maximo.showMaximoDialog(item.dialogid, objectName, objectId, item.relationship);
					select.reset();
				}
					});
			select = new Select({
				onChange: fctOnChange
			}, div);
			select.addOption(menuJSON);
			select.reset();
			select.startup();

			// Issue 12-12797
			if (navigator.userAgent.indexOf("Android") > -1)
			{
				var mobileHeight = "40px";
				select.domNode.style.height = mobileHeight;
				var openDropDown = select.openDropDown;
				select.openDropDown = function() {
					var items = select.dropDown.getChildren();
					items.forEach(function(item)
							{
						item.domNode.style.height = mobileHeight;
							});
					openDropDown.apply(select, arguments);
				};
			}
		},
		_getMenuData: function(objectName)
		{
			return this._menuCache[objectName];
		},
		destroyRecursive: function()
		{
			this._templateCache = {};
			this._summaryTemplateCache = {};
		}
	});
});

