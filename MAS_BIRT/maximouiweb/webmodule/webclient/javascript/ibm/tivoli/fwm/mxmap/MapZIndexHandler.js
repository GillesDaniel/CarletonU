/* IBM Confidential
 *
 * OCO Source Materials
 *
 * 5724-U18
 *
 * (C) COPYRIGHT IBM CORP. 2015,2024
 *
 * The source code for this program is not published or otherwise
 * divested of its trade secrets, irrespective of what has been
 * deposited with the U.S. Copyright Office.
 */

/*
 * Javascript responsible for handler the z-indexes of dialogs when map's screens
 */
define( [
    "dojo/_base/declare",
	"ibm/tivoli/fwm/mxmap/_Base",
    "dijit/Dialog",
    "dijit/popup",
], function ( declare, _Base, Dialog, Popup ) {

    return declare( [_Base], {  
        _map: null, 
        _dojo: null,
        _mapLoadedListener: null,
        _infoWindowFocusedListener: null,
        _dialogOverrideListener: null,
        _dialogChangeZIndexListener: null,
        _dialogShowListener: null,
        _toolHighlightedListener: null,
        _popupShowListener: null,
        _activeToolName: null,
        _highestMapZIndex: 0, // highest z-index on map, disconsidering dialogs and scrollbars
        _fullScreenModeChangeListener: null,
        Z_INDEX_UPDATED_CLASS: 'z-index-updated',
        constructor: function (params) {
            this._map = params.map;

            this._dojo = this.selectDojoVersion();

            this._mapLoadedListener = this._dojo.subscribe(
                "mxmap.mapLoaded",
                this._dojo.hitch(this, this.onMapLoaded)
            );

            this._dialogOverrideListener = this._dojo.subscribe(
                "mapZIndexHandler.onDialogOverride",
                this._dojo.hitch(this, this.updateDialogZIndex)
            );

            this._dialogChangeZIndexListener = this._dojo.subscribe(
                "mapZIndexHandler.onDialogZIndexChange", 
                this._dojo.hitch(this, this.updateDialogZIndex)
            );

            this._toolHighlightedListener = this._dojo.subscribe(
                "_ToolSpatialTemplate.enableHighlightButton",
                this._dojo.hitch(this, this.moveHighlightedToolDialogToTop)
            );

            this._infoWindowFocusedListener = this._dojo.subscribe(
                "infoWindowFocused", 
                this._dojo.hitch(this, this.moveInfoWindowToTop)
            );
                
            this._dialogShowListener = this._dojo.connect(
                Dialog._DialogLevelManager,
                "show", 
                this._dojo.hitch(this, this.updateDialogZIndex)
            );

            this._popupShowListener = this._dojo.connect(
                Popup, 
                'open', 
                this._dojo.hitch(this, this.movePopupToTop)
            );
        },

        postCreate: function () {
            this._fullScreenModeChangeListener = this._dojo.subscribe(
                "mapFullScreenModeChanged_" + this._map.getId(),
                this._dojo.hitch(this, this.onMapFullScreenModeChanged)
            );
        },

        //This function updates the z-index of any open drop-downs that are related to the given dialog.
		updateRelatedDropDownZIndex : function(dialogNode, highestIndex) {
			
			var openDropdowns = this._dojo.query('.dijitComboBoxMenuPopup' + '.' + this.Z_INDEX_UPDATED_CLASS);
					
			openDropdowns.forEach(function(dropdownDialog) {
                //Take the dialog that owns the drop-down
				var parentWidgetId = dropdownDialog.getAttribute('dijitpopupparent');
				var parentDomNode = this._dojo.byId('widget_' + parentWidgetId);
				var parentDialog = parentDomNode.closest('.dijitDialog');
				
                //If the current dialog is the same as the previous, update the Z-index of the drop-down too.
				if(parentDialog === dialogNode) {
					this.updateAndMarkHTMLElement(dropdownDialog, highestIndex);
				}  	
				
			}, this); 
		},

        updateDialogZIndex: function (dialog) {
			if(dialog){
				this.updateDomNodeZIndex(dialog.domNode);
			}
		},

        updateDomNodeZIndex: function (domNode) {
            if (domNode) {
                var highestZIndex = this.configureMapElements();

                if (highestZIndex && domNode) {
                    var underlayDomNode = this._dojo.query('.dijitDialogUnderlayWrapper')[0];

                    // Place underlay under dialog and over all map elements
                    this.updateAndMarkHTMLElement(underlayDomNode, highestZIndex + 1);

                    // Place dialog over all map elements
                   	this.updateAndMarkHTMLElement(domNode, highestZIndex + 2);
					
					this.updateRelatedDropDownZIndex(domNode, highestZIndex + 3);
                }
            }
        },

        onMapLoaded: function(map) {
            if (map) {
                this._dojo.query("body").attr("data-mxmaploaded", "true");
                this.configureMapElements();
            }
        },

        onMapFullScreenModeChanged: function () {
            this.configureMapElements();
        },

        /**
         * Update z-index from map elements.
         * @param {boolean} useCachedHighestMapZIndex
         */
        configureMapElements: function (useCachedHighestMapZIndex) {
            var mapElements = this.getMapElements();
            var openMap = mapElements.openMap;
            var appContent = mapElements.appContent;
            var mapManagerDialog = mapElements.mapManagerDialog;
            var mapToolsDialogs = mapElements.mapToolsDialogs;
            var highestZIndex = this._highestMapZIndex;

            if (!useCachedHighestMapZIndex) {
                this._highestMapZIndex = 0;

                if (appContent) {
                    var nodesInAppContent = this._dojo.query('*', appContent);
                    this._highestMapZIndex = this.getHighestIndex(nodesInAppContent);
                }

                if (openMap) {
                    var nodesInOpenMap = this._dojo.query('*', openMap);
                    this._highestMapZIndex = Math.max(this._highestMapZIndex, this.getHighestIndex(nodesInOpenMap));
                }

                if (mapManagerDialog) {
                    var nodesInMapManager = this._dojo.query('*', mapManagerDialog);
                    this._highestMapZIndex = Math.max(this._highestMapZIndex, this.getHighestIndex(nodesInMapManager));
                }

                highestZIndex = this._highestMapZIndex;
            }

            highestZIndex = this.placeDialogsOverMapElements(mapToolsDialogs, highestZIndex);       

            return highestZIndex;
        },

        getHighestIndex: function (nodes) {
            var highestIndex = 0;

            nodes.forEach(function (node) {
                var zIndex = this._dojo.query(node).style('z-index')[0];
                var display = this._dojo.query(node).style('display')[0];
                if (parseInt(zIndex) > highestIndex && display !== "none") {
                    highestIndex = parseInt(zIndex);
                }
            }, this);
            
            return highestIndex;
        },

        moveInfoWindowToTop: function (popup) {
            if (!popup || this._activeToolName === 'InfoWindow') {
                return;
            }

            this._activeToolName = 'InfoWindow';
            
            var highestIndex = this.configureMapElements();

            this.updateAndMarkHTMLElement(popup, highestIndex + 1);
        },

        moveHighlightedToolDialogToTop: function (toolName) {
            if (this._activeToolName === toolName) {
                return;
            }
            this._activeToolName = toolName;

            // Place highlighted dialog over other map elements
            var highlightedMapToolDialog = this.getMapToolDialog(toolName);
            if (highlightedMapToolDialog) {
                this.updateDomNodeZIndex(highlightedMapToolDialog);
            }
        },

        movePopupToTop: function (popup) {
            if (popup) {
                var popupWrapper = popup.popup._popupWrapper;
                var highestIndex = this.configureMapElements();

                this.updateAndMarkHTMLElement(popupWrapper, highestIndex + 1);                
            }
        },

        markHTMLElement: function (htmlElement) {
            this._dojo.addClass(htmlElement, this.Z_INDEX_UPDATED_CLASS, true);
        },

        unmarkHTMLElement: function(htmlElement) {
            this._dojo.removeClass(htmlElement, this.Z_INDEX_UPDATED_CLASS);
        },

        getMapElements: function () {
            var mapManagerDialog = this._dojo.byId("plussselectmaplocation-dialog_inner");
            var openMap = this._dojo.byId("pluss_open_map-dialog_inner");
            var appContent = this._dojo.byId("SystemNavAppContent-sc_div");
            
            var mapToolsDialogs = this.getZIndexUpdatedElements();
            var infoWindow = this._dojo.query('.esriPopup.esriPopupVisible')[0];
            if (infoWindow) {
                mapToolsDialogs.push(infoWindow);
            }

            return {
                appContent: appContent,
                mapManagerDialog: mapManagerDialog,
                mapToolsDialogs: mapToolsDialogs,
                openMap: openMap,
            };
        },

        getZIndexUpdatedElements: function() {
            return this._dojo.query('.' + this.Z_INDEX_UPDATED_CLASS);
        },

        getMapToolDialog: function(toolName) {
            return this._dojo.byId("dialog" + toolName + "Dialog");
        },

        /**
         * Update HTML element z-index. 
         * 
         * @param {HTMLElement} htmlElement
         * @param {number} zIndex
         * 
         * @returns {number} HTML element z-index value after update
         */
        updateAndMarkHTMLElement: function (htmlElement, zIndex) {
            this._dojo.style(htmlElement, "z-index", zIndex);
            this.markHTMLElement(htmlElement);

            return zIndex;
        },

        /**
         * Return HTML element z-index. If element is empty or does not have z-index, return 0.
         * @param {HTMLElement} htmlElement 
         */
        getHTMLElementZIndex: function (htmlElement) {
            if (!htmlElement) {
                return 0;
            }

            var zIndex = parseInt(this._dojo.style(htmlElement, "z-index"));

            if (isNaN(zIndex)) {
                return 0;
            }

            return zIndex;
        },

        placeDialogsOverMapElements: function (dialogs, highestZIndex) {
            if (!dialogs.length) {
                return highestZIndex;
            }

            var baseZIndex = highestZIndex + 1;

            dialogs.sort(this._dojo.hitch(this, this.sortByZIndex));

            var previousZIndexes = this._dojo.map(dialogs, this._dojo.hitch(this, this.getHTMLElementZIndex));

            dialogs.forEach(this._dojo.hitch(this, function (dialog, index) {
                var previousDialogZIndex = previousZIndexes[index - 1];
                var previousDialogHasSameZIndex = previousDialogZIndex === this.getHTMLElementZIndex(dialog);

                if (previousDialogHasSameZIndex) {
                    this.updateAndMarkHTMLElement(dialog, previousDialogZIndex);
                } else {
                    this.updateAndMarkHTMLElement(dialog, baseZIndex + index);
                }
            }));

            return this.getHTMLElementZIndex(dialogs[dialogs.length - 1]);
        },

        sortByZIndex: function (dialogA, dialogB) {
            var zIndexA = this.getHTMLElementZIndex(dialogA);
            var zIndexB = this.getHTMLElementZIndex(dialogB);

            return zIndexA - zIndexB;
        },

        resetZIndexUpdatedElements: function() {
            var zIndexUpdatedElements = this.getZIndexUpdatedElements();

            zIndexUpdatedElements.forEach(this._dojo.hitch(this, function(dialog) {
                this.unmarkHTMLElement(dialog);
            }));
        },

        destroy: function () {
            this._map = null;

            this._dojo.unsubscribe(this._mapLoadedListener);
            this._dojo.unsubscribe(this._dialogOverrideListener);
            this._dojo.unsubscribe(this._dialogChangeZIndexListener);
            this._dojo.unsubscribe(this._toolHighlightedListener);
            this._dojo.unsubscribe(this._infoWindowFocusedListener);
            this._dojo.unsubscribe(this._fullScreenModeChangeListener);

            this._dojo.disconnect(this._dialogShowListener);
            this._dojo.disconnect(this._popupShowListener);

            this._dojo.query("body").removeAttr("data-mxmaploaded");

            this.resetZIndexUpdatedElements();

            this._activeToolName = null;
            this._highestMapZIndex = 0;
        },

    });
} );
