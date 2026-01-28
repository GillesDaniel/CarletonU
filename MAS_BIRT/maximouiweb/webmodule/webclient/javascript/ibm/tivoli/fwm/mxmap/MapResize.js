/* IBM Confidential
 *
 * OCO Source Materials
 *
 * 5724-U18
 *
 * (C) COPYRIGHT IBM CORP. 2024
 *
 * The source code for this program is not published or otherwise
 * divested of its trade secrets, irrespective of what has been
 * deposited with the U.S. Copyright Office.
 */

define( 
    [
        "dojo/_base/declare"
    ], 
    function ( 
        declare
    ) {
        return declare(null, {

            _isLayoutReady: false,
            MAP_TAB_PARENT_ID: "SystemNavAppContent-sc_div",
            DEFINED_APP_PARENTS_WIDTH: {
                TECHTABLET: {
                    width: "100%",
                },
            },

            constructor: function (options, map) {
                this.mapConf = options.mapConf;
                this.divId = options.divId;
                this.map = map;
            },

            destroy: function() {
                if (this.scrollbarsObserver) {
                    this.scrollbarsObserver.disconnect();
                }
                this.scrollbarsObserver = null;
            },

            resize: function() {
                if (this.mapConf.isInMapManager) {
                    return;
                }

                this.resizer = setInterval(dojo.hitch(this, function() {
                    if (!this.isLayoutReady()) {
                        return;
                    }

                    clearInterval(this.resizer);

                    this.resizeAfterReady();
                    this.createScroolbarsObserver();
				}), 50);
            },

            createScroolbarsObserver: function() {
                var scrollbars = this.getScrollbars();
                if (!scrollbars.length) {
                    return;
                }
    
                if (!this.scrollbarsObserver) {
                    this.scrollbarsObserver = new MutationObserver(dojo.hitch(this, this.onScrollbarChanged));
                }
    
                dojo.forEach(scrollbars, dojo.hitch(this, function(scrollbar) {
                    this.scrollbarsObserver.observe(scrollbar, { attributes: true });
                }));
            },
    
            onScrollbarChanged: function() {
                var scroller = dojo.query('.custom-scroller', this.MAP_TAB_PARENT_ID)[0];
                if (scroller) {
                    var firstChild = scroller.children[0];
                    if (firstChild) {
                        dojo.style(firstChild, {
                            'margin-inline-end': '0px',
                            'margin-bottom': '0px'
                        });
                    }
                }
                
                this.resizeAfterReady();
                this.hideScrollbars();
            },
    
            getScrollbars: function() {
                return dojo.query('.custom-scroller-track', this.MAP_TAB_PARENT_ID);
            },
    
            hideScrollbars: function() {
                var scrollbars = this.getScrollbars();
                if (scrollbars) {
                    dojo.forEach(scrollbars, dojo.hitch(this, function(scrollbar) {
                        dojo.style(scrollbar, 'display', 'none');
                    }));
                }
            },

            resizeAfterReady: function() {
                this.removeMapBorder();
                this.fillMapSpace(this.divId);
            },

            isLayoutReady: function() {
                if (this._isLayoutReady) {
                    return this._isLayoutReady;
                }
                
                var mapParentApplication = this.getMapParentApplication()
                if (this.getDefinedAppParent(mapParentApplication)) {
                    return this._isLayoutReady = true;
                }

                var isTabGroupDefined = this.mapConf && this.mapConf.tabGroupId;
                if (isTabGroupDefined) {
                    return this._isLayoutReady = dojo.byId(this.mapConf.tabGroupId).style.paddingTop === '3rem';
                }
    
                return this._isLayoutReady = true;
            },
    
            removeMapBorder: function() {
                var tableBodyElements = document.getElementsByClassName("tabBodyTableStretch");
                if (tableBodyElements.length > 0) {
                    var tableBodyTable = tableBodyElements[0];
                    dojo.setStyle(tableBodyTable, "border-spacing", "0px");
                }
            },
    
            fillMapSpace: function(mapId) {
                var mapIFrame = dojo.byId(mapId);
                if (!mapIFrame) {
                    return;
                }

                if (mapIFrame.contentDocument && mapIFrame.contentDocument.body) {
                    dojo.setStyle(mapIFrame.contentDocument.body, "overflow", "hidden");
                }

                var mapParentTab = this.getMapParentTab();
                if (!mapParentTab) {
                    var mapParentApplication = this.getMapParentApplication();
                    if (mapParentApplication){
                        this.setMapSpaceByParentApplication(mapParentApplication, mapIFrame)
                    }

                    return;
                }

                var widthPercentage = 1.0;
                if (this.inDispatchMap()) {
                    widthPercentage = 0.5;
                }
    
                var mapParentTabStyles = window.getComputedStyle(mapParentTab);
                var mapParentTabWidthPX = mapParentTabStyles.width;
                var mapParentTabWidthNumber = parseFloat(mapParentTabWidthPX.replace("px", ""));
                var mapParentTabWidth = (mapParentTabWidthNumber * widthPercentage) + "px";
                dojo.setStyle(mapIFrame, "width", mapParentTabWidth);

                var heightPercentage = 1.0;
                if (this.isLinearVisualControlOpen()) {
                    heightPercentage = 0.5;
                }
    
                var height = mapParentTab.offsetHeight - mapIFrame.offsetTop;
                dojo.setStyle(mapIFrame, "height", (height * heightPercentage) + "px");
            },

            getMapParentTab: function() {
                return dojo.byId(this.MAP_TAB_PARENT_ID);
            },

            inDispatchMap: function() {
                var dispatchTabs = dojo.query(".dispatch");

                return dispatchTabs.length > 0;
            },

            isLinearVisualControlOpen: function() {
                if (!this.map || !this.map.RefLinearView || !this.map.RefLinearView.setMapVisibleCtrl) {
                    return false;
                }

                return true;
            },

            getMapParentApplication: function(){
                return this.mapConf.parentApplication;
            },

            setMapSpaceByParentApplication: function(mapParentApplication, mapIframe){
                var appParent = this.getDefinedAppParent(mapParentApplication)
                if (appParent) {
                    dojo.setStyle(mapIframe, "width", appParent.width);
                }
            },

            getDefinedAppParent: function(mapParentApplication) {
                var appParent = this.DEFINED_APP_PARENTS_WIDTH[mapParentApplication]
                return appParent;
            }
            
        });
    } 
);
