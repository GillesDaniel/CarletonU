require({cache:{
'url:ibm/DojoTree/templates/DojoTreeGrid.html':"<div><div class=\"DojoTreeGrid\" >\n        <div class=\"header\">\n                <div class=\"row\" data-dojo-attach-point=\"headerNode\"></div>\n        </div>\n        <div class=\"body\" data-dojo-attach-point=\"containerNode\"></div>\n</div></div>"}});
/*
 * Licensed Materials - Property of IBM
 * 
 * 5724-U18, 5737-M66
 * 
 * (C) COPYRIGHT IBM CORP. 2020,2024 All Rights Reserved.
 * 
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 *
 */
define("ibm.DojoTree.DojoTreeGrid",
		["dojo/_base/declare",
		 "dojo/cookie",
		 "dojo/data/ItemFileWriteStore",
		 "dojo/_base/lang",
		 "dojo/_base/array",
		 "ibm/ResourceHelper",
		 "dojo/Deferred",
		 "dijit/registry",
		 "dijit/_WidgetBase",
		 "dojo/on",
		 "dojo/dom-style",
		 "dojo/dom-attr",
		 "dijit/_TemplatedMixin",
		 "dijit/_Container",
		 "dijit/_Contained",
		 "dijit/_CssStateMixin",
		 "dijit/_KeyNavMixin",
		 "dojo/text!ibm/DojoTree/templates/DojoTreeGrid.html",
		 "ibm/DojoTree/DojoTreeStoreModel",
		 "dijit/Menu",
		 "dijit/MenuItem",
		 "dijit/form/CheckBox"

		 ], 
			 function(declare, cookie, ItemFileWriteStore, lang, array, ResourceHelper, 
			 Deferred, registry, WidgetBase, on, domStyle, domAttr, _TemplatedMixin, _Container, _Contained, _CssStateMixin, _KeyNavMixin, 
			 templateString, TreeStoreModel,
			 Menu, MenuItem, CheckBox) {

	var TreePath = declare("ibm.DojoTree.DojoTreePath", null, {
		indent: -1,
		
		item: null,
		
		parentItem: null,
		
		opened: null,
		
		fetching: false,
		
		constructor: function(indent, item, parentItem, opened) {
			this.indent = indent;
			this.item = item;
			this.parentItem = parentItem;
			this.opened = opened;
			this.children = [];
		},
		
		addSubPath: function(path) {
			this.children.push(path);
		},
		
		getChildren: function() {
			return this.children;
		},
		
		clearChildren: function() {
			this.children = [];
		}
	});
	
	var DojoTreeGrid = declare("ibm.DojoTree.DojoTreeGrid", [WidgetBase /*, _KeyNavMixin*/, _Container, _TemplatedMixin], {
		
		templateString:templateString,// '<div><div class="header"><div class="row" data-dojo-attach-point="headerNode"></div></div><div class="body" data-dojo-attach-point="containerNode"></div></div>',
		
		baseClass: "",
		
		model: null,
		
		structure: [],

		indentationWidth: 24,
		
		rowHeight: 24,
		
		childSelector: "row",
		
		persistState: true,
		
		_loadColumns: function() {
			this.headerNode.innerHTML = "";
			array.forEach(this.structure, lang.hitch(this, function(column) {
				var c = document.createElement("div");
				c.classList.add("cell");
				c.innerHTML = column.name;
				this.headerNode.appendChild(c);
			}));
		},
	
		_onRowSelect: function(rowNode) {
			var item = rowNode.item;
			if ( item && item.loadMore ) {
				var parentItem = this._treePaths[this.model.getIdentity(item)].parentItem;
				var parentRow = this.getRowNodeByItem(parentItem);
				this.model.getChildrenFromMaximo(parentItem, 
					lang.hitch(this, function(){
						this.toggleRow(parentRow);
						this.toggleRow(parentRow);
					}), 
					function(){
						alert("an error happend");
					});
			}
			var treeNodeId = this.model.store.getValue(item,"treenodeid");
			var reqtype = this.async ? REQUESTTYPE_ASYNC : REQUESTTYPE_SYNC; 
			sendXHREvent("selectNode", this.treeControlId, treeNodeId, reqtype, null, null, null);
		},
		
		getColumnFormatter: function(column) {
			if ( column && column.formatter ) {
				if ( typeof(column.formatter) == "string" ) {
					if ( typeof(this[column.formatter]) == "function" )
						return this[column.formatter].bind(this);
				}
				else return column.formatter;
			}
			
			return function(column, val) { return this.textFormatter(column, val)}.bind(this);
		},
		
		textFormatter: function(column, item) {
			var elt = document.createTextNode(item == undefined ? "" : item);
			return elt;
		},
		
		imageFormatter: function(column, item) {
			if ( item == undefined || item == "" ) return this.textFormatter(column, item);
			var img = document.createElement("img");
			img.classList.add("image");
			img.src = item;
			return img;
		},
		
		eventFormatter: function(column, item) {
			if ( item == undefined || item == "" ) return this.textFormatter(column, item);
			var img = document.createElement("img");
			img.classList.add("event");
			img.src = item;
			on(img, "click", function(evt) {
				evt.stopPropagation();
			
				var row = evt.target;
				while ( row && !row.classList.contains("row")) row = row.parentNode;
				if ( row ) {
					var saved = this.async;
					var reqtype = this.async ? REQUESTTYPE_ASYNC : REQUESTTYPE_SYNC; 
					this.async = true;
					this.focusRow(row);
					this.async = saved;
					sendXHREvent("clickEvent", this.treeControlId, column.field, reqtype, null, null, null);
				}
			}.bind(this)); 
			return img;
		},
		
		focusRow: function(rowNode){
			if ( rowNode ) {
				var previousSelected = rowNode.parentNode.querySelector(".row.selected");
				if ( rowNode == previousSelected ) return;
				if ( previousSelected ) previousSelected.classList.remove("selected");
				rowNode.classList.add("selected");
				this._onRowSelect(rowNode);
			}
		},
		
		getRowCss: function(row){
			return this.model.store.getValue(row.item, "textcss");
		},
		
		showAdditionalDetails: function(row){
			
		},
		
		_onAdditionalAction: function(evt){
			evt.stopPropagation();
			
			var row = evt.target;
			while ( row && !row.classList.contains("row")) row = row.parentNode;
			if ( row ) {
				this.showAdditionalDetails(row);
			}
		},
		
		_createRow: function(forItem, afterRow, onComplete) {
			var row = document.createElement("div", {"tabIndex": -1});
			domStyle.set(row, {height: this.rowHeight + "px"});
			row.item = forItem;
			var path = this._treePaths[this.model.getIdentity(forItem)];
			row.setAttribute("itemId",this.model.getIdentity(forItem));
			row.classList.add("row");
			var rowCss = this.getRowCss(row);
			if ( rowCss && rowCss.length > 0 ) row.classList.add(rowCss);
			
			row.addEventListener("click", lang.hitch(this, function(evt){
				var rowNode = evt.target;
				while ( rowNode != undefined && !rowNode.classList.contains("row")) rowNode = rowNode.parentNode;
				this.focusRow(rowNode);
				evt.stopPropagation();
			}));
			
			row.addEventListener("contextmenu", lang.hitch(this, function(evt){
				setClickPosition(row, evt);
				var saved = this.async;
				var reqtype = this.async ? REQUESTTYPE_ASYNC : REQUESTTYPE_SYNC; 
				this.async = true;
				this.focusRow(row);
				this.async = saved;
				var rowIdentity = this.model.getIdentity(row.item);
				sendXHREvent("contextmenu", rowIdentity, null, reqtype, null, null, null);
				evt.stopPropagation();
				evt.preventDefault();
				evt.cancelBubble = true;
				return false;
			}));
			/*
			on(row, "contextmenu", lang.hitch(this, function(evt){
				alert("hello2");
				var saved = this.async;
				var reqtype = this.async ? REQUESTTYPE_ASYNC : REQUESTTYPE_SYNC; 
				this.async = true;
				this.focusRow(row);
				this.async = saved;
				sendXHREvent("contextmenu", this.treeControlId, column.field, reqtype, null, null, null);
				evt.stopPropagation();
				evt.preventDefault();
				evt.cancelBubble = true;
				return false;
			}));
			*/
			
			
			array.forEach(this.structure, lang.hitch(this, function(column, index){
				
				var cell = document.createElement("div", {});
				cell.classList.add("cell");
				//cell.innerHTML = 
				var formatted = this.getColumnFormatter(column)( column, this.model.store.getValue(row.item,column.field));
				cell.appendChild(formatted);
				
				if ( this.model.mayHaveChildren(forItem) ) {
					row.setAttribute("opened", "false");
				} else {
					cell.classList.add("leaf");
				}
				
				if ( index == 0 ) {
					var cellContentWrapper = document.createElement("div");
					cellContentWrapper.classList.add("cellContentWrapper");
					
					var indentCpt;
					for(indentCpt = 0; indentCpt < path.indent; indentCpt++){
						var indenter = document.createElement("div");
						indenter.classList.add("indenter");
						//domStyle.set(indenter, {width: this.indentationWidth + "px", height: this.rowHeight + "px"});
						//domStyle.set(indenter, {"width": (this.rowHeight) + "px", height: this.rowHeight + "px"});
						cellContentWrapper.appendChild(indenter);
						if ( indentCpt == path.indent - 1) {
							indenter.classList.add("last");
						}
					}
					
					var expandNode = document.createElement("div");
					expandNode.classList.add("expandNode");
					//domStyle.set(expandNode,{ width: this.indentationWidth + "px", height: this.rowHeight + "px"});
					if ( this.model.mayHaveChildren(forItem) ) {
							on(expandNode, "click", this._toggleRow.bind(this));
					}
					var text = cell.innerHTML;
					cell.innerHTML = "";
					//cellContentWrapper.appendChild(indenter);
					cellContentWrapper.appendChild(expandNode);
					
					var cb = this._getCheckBox(forItem);
					if ( cb ) {
						cb.placeAt(cellContentWrapper);
						cb.startup();
					}
					
					var icon = document.createElement("div");
					icon.classList.add("icon");
					domStyle.set(icon, this.getIconStyle(forItem));
					cellContentWrapper.appendChild(icon);
					
					var textSpan = document.createElement("div");
					textSpan.classList.add("expandText");
					textSpan.innerHTML = text;
					cellContentWrapper.appendChild(textSpan);
					
					/*if ( this.canHaveAdditionalAction(row) ) {
						var additionalAction = document.createElement("div");
						additionalAction.classList.add("additionalAction");
						cellContentWrapper.appendChild(additionalAction);
						on(additionalAction, "click", lang.hitch(this, this._onAdditionalAction));
					}*/
					
					cell.appendChild(cellContentWrapper);
					
					//cell.insertBefore(expandNode, cell.childNodes[0]);
				}
				
				row.appendChild(cell);
			}));
			
			var r = afterRow;
			if ( r ) {
				var rowFound = false;
				var identity = this.model.getIdentity(r.item);
				var afterRowIndent = this._treePaths[identity].indent;
				while ( !rowFound ) {
					if ( r && r.nextSibling && r.nextSibling.item ) {
						var identity = this.model.getIdentity(r.nextSibling.item);
						var p = this._treePaths[identity];
						rowFound = p.indent <= afterRowIndent;
						r = r.nextSibling;
					} else {
						r = null;
						rowFound = true;
						break;
					}
				}
			}
			
			
			
			if ( r ) {
				this.containerNode.insertBefore(row, r);
			} else  {
				this.containerNode.appendChild(row);
			}
			if ( path.opened ) {
				this._expandRow(row, onComplete);
			}
			
			if ( row.previousSibling && row.previousSibling.classList.contains("row")) {
				var identity = this.model.getIdentity(row.previousSibling.item);
				var previousSiblingRowIndent = this._treePaths[identity].indent;
				if ( previousSiblingRowIndent <= path.indent ) {
					row.previousSibling.classList.add("hasSibling");
				}
				
			}				
			return row;
		},
		
		isRowALeaf: function(rowNode) {
			var attr = rowNode.getAttribute("opened");
			return attr == undefined;
		},
		
		
		isRowOpened: function(rowNode) {
			return !this.isRowALeaf(rowNode) && rowNode.getAttribute("opened") == "true";
		},
		
		
		canHaveAdditionalAction: function(row){
				return row.item.loadMore == undefined;
		},
		
		toggleRow: function(row) {
			if ( row && row.item ) {
				var item = row.item;
				if ( this.isRowOpened(row) ) this._collapseRow(row);
				else this._expandRow(row);
			}
		},
		
		_toggleRow: function(evt){
			evt.stopPropagation();
			evt.preventDefault();
			
			var row = evt.target;
			while ( row && !row.classList.contains("row")) row = row.parentNode;
			this.toggleRow(row);
			
		},
		
		_collapseRow: function(rowNode, preserveOpenFlag) {
			if ( !this.isRowOpened(rowNode) || this.isRowALeaf(rowNode)) return;
			
			var item = rowNode.item;
			var myPath = this._treePaths[this.model.getIdentity(item)];
			
			array.forEach(myPath.getChildren(), lang.hitch(this, function(subPath){
				var id = this.model.getIdentity(subPath.item);
				var rowToDelete = this.containerNode.querySelector(".row[itemId=\"" + id + "\"]");
				if ( this.isRowOpened(rowToDelete) ) {
					this._collapseRow(rowToDelete, true);
				}
				rowToDelete.remove();
				//delete this._treePaths[id];
			}));
			myPath.clearChildren();
			
			if ( preserveOpenFlag == undefined || preserveOpenFlag == false ) {
				myPath.opened = false;
			}
			rowNode.setAttribute("opened", false);
			var reqtype = this.async ? REQUESTTYPE_ASYNC : REQUESTTYPE_SYNC; 
			var treeNodeId = this.model.store.getIdentity(rowNode.item);
			sendXHREvent("openNode", treeNodeId, false, reqtype, null, null, null);
			//this._saveRowState();
		},
		
		getIconStyle: function(item, opened) {
			var st = this.model.store;
			if ( !item.root ) {
				if ( this.model.mayHaveChildren(item) ) {
					if ( opened ) {
						if ( st.getValue(item,"openfolderimage") && st.getValue(item,"openfolderimage") != null ) return {background:"url(" + IMAGE_PATH + st.getValue(item,"openfolderimage") + ") no-repeat","background-size": "contain"};
						return {};
					} else {
						if ( st.getValue(item,"folderimage") && st.getValue(item,"folderimage") != null ) return {background:"url(" + IMAGE_PATH + st.getValue(item,"folderimage") + ") no-repeat","background-size": "contain"};
						return {};
					}	
				} else {
					if ( st.getValue(item,"image") && st.getValue(item,"image") != null ) return {background:"url(" + IMAGE_PATH + st.getValue(item,"image") + ") no-repeat","background-size": "contain"};
					return {};
				}
			}
			return null;
		},
		
		expandRowRecursively: function(rowNode) {
			if ( rowNode == undefined ) rowNodes
			this._expandRow(rowNode, function(){
				array.forEach(this.getRowNodes(rowNode), lang.hitch(this, this.expandRowRecursively));
			});
			
		},
		
		getRootNode: function() {
			var item;
			this.model.getRoot(function(it){
					item = it;
			});
			return this.getRowNodeByItem(item);
		},
		
		getRowNodeByItem: function(item) {
			return this.containerNode.querySelector(".row[itemId=\"" + this.model.getIdentity(item) + "\"]");
		},
		
		getRowNodes: function(parentRowNode){
			var item;
			if ( parentRowNode && parentRowNode.item ) item = parentRowNode.item;
			
			var p;
			if ( item && (p = this._treePaths[this.model.getIdentity(item)]) ) {
				var itemIds = "";
				array.forEach(p.getChildren(), lang.hitch(this, function(c){
					itemIds += ".row[itemId=\"" + this.model.getIdentity(c.item) + "\"], ";
				}));
				if ( itemIds.length == 0 ) return [];
				
				itemIds = itemIds.substr(0, itemIds.length - 2);
				return this.containerNode.querySelectorAll(itemIds);
			}
		},
		
		_expandRow: function(rowNode, onComplete){
			if ( this.isRowOpened(rowNode) || this._treePaths[this.model.getIdentity(rowNode.item)].fetching || this.isRowALeaf(rowNode)) {
				if ( typeof(onComplete) == "function") {
					onComplete();
				} else if ( typeof(onComplete) == "string" && typeof(this[onComplete]) == "function") {
					this[onComplete]();
				}
				return;
			}
			
			var parentItem = rowNode.item;
			var path = this._treePaths[this.model.getIdentity(parentItem)];
			var indent = path.indent;
			
			rowNode.classList.add("fetching");
			this.model.getChildren(parentItem, lang.hitch(this, function(items){
				array.forEach(items, lang.hitch(this, function(item){
					var path = this._treePaths[this.model.getIdentity(item)];
					var opened = path == undefined ? this.model.store.getValue(item, "opened") : path.opened;
					this._treePaths[this.model.getIdentity(item)] = new TreePath(indent + 1, item, parentItem, opened);
					this._treePaths[this.model.getIdentity(parentItem)].addSubPath(this._treePaths[this.model.getIdentity(item)]);
					this._createRow(item, rowNode, onComplete);
				}));
				rowNode.classList.remove("fetching");
				rowNode.setAttribute("opened", true);
				path.opened = true;
				
				var reqtype = this.async ? REQUESTTYPE_ASYNC : REQUESTTYPE_SYNC; 
				var treeNodeId = this.model.store.getIdentity(rowNode.item);
				sendXHREvent("openNode", treeNodeId, true, reqtype, null, null, null);
				
				//this._saveRowState();	
				if ( typeof(onComplete) == "function") {
					onComplete();
				} else if ( typeof(onComplete) == "string" && typeof(this[onComplete]) == "function") {
					this[onComplete]();
				}
			}));
			
		},
		
		_getCheckBox: function(item){
			if ( this.checkBoxes == undefined || !this.checkBoxes) return null;
			
			var cb = new CheckBox({checked: this.model.store.getValue(item, "checked")});
			
			domAttr.set(cb.domNode.firstChild, "ctype","");
			var self = this;
			on(cb, "click", function(ev) {
				var _f = function(rowNode) {
					var children = self.getRowNodes(rowNode);
					var value = this.get("checked");
					children.forEach(function(subRow){
						var checkbox = registry.getEnclosingWidget(subRow.querySelector(".dijitCheckBox"));
						checkbox.set("checked", value);
						_f(subRow);
					});
				}.bind(this);
				
				
				var treeNode = this.domNode.parentNode;
				while ( !treeNode.classList.contains("row") && treeNode != null ) treeNode = treeNode.parentNode;
				
				_f(treeNode);
				
				var treeNodeId = self.model.getIdentity(treeNode.item);
				var checked = !(this.get("checked") == false);
				//ev.stopPropagation();
				_f(treeNode);
				var reqtype = self.async ? REQUESTTYPE_ASYNC : REQUESTTYPE_SYNC; 
				sendXHREvent("setChecked", treeNodeId, checked, reqtype, null, null, null);
			});
			
			return cb;
		},
		
		_loadRows:function() {
			this.containerNode.innerHTML = "";
			if ( this.model ) {
				
				
				this.model.getRoot(lang.hitch(this, function(rootItem){
					this._treePaths = [];
					var opened = this.model.store.getValue(rootItem, "opened");
					this._treePaths[this.model.getIdentity(rootItem)] = new TreePath(0, rootItem, null, opened);
					/*
					if ( this.persistState ) {
						var states = cookie(this.id + "SaveStateCookie") ? cookie(this.id + "SaveStateCookie").split(",") : [];
						
						array.forEach(states, lang.hitch(this, function(state){
							var identity = state.substr(0, state.lastIndexOf(":"));
							var opened = state.substring(state.lastIndexOf(":")+1).toLowerCase() == "true";
							if ( this._treePaths[identity] ) this._treePaths[identity].opened = opened;
							else this._treePaths[identity] = new TreePath(-1, null, null, opened);
						}));
					}*/
					this._createRow(rootItem, null);
					
				}), 
				lang.hitch(this, function(error) {
					this.containerNode.innerHTML = "An error happened : " + error;
				}));
			}
		},
		
		postCreate: function() {
			this.inherited(arguments);
			this._loadColumns();
			this._loadRows();
		},
		
		
		getFocusedNode: function() {
			return this.containerNode.querySelector(".row.selected");
		},
		
		/*
		_getFirst: function(){
			var row = this.getRootNode();
			if ( row ) {
				this.focusRow(row);
			}				
		},
		
		_getLast: function(){
			console.log("heeee");
		},
		
		_onLeftArrow: function(){
			var currentRow = this.getFocusedNode();
			if ( !this.isRowALeaf(currentRow)) {
				if ( this.isRowOpened(currentRow) ) {
					this._collapseRow(currentRow);
				} else {
					var p = this._treePaths[this.model.getIdentity(currentRow.item)];
					var parentRow = this.getRowNodeByItem(p.parentItem);
					this.focusRow(parentRow);
				}
			} else {
				var path = this._treePaths[this.model.getIdentity(currentRow.item)];
				var row = this.getRowNodeByItem(path.parentItem);
				if ( row ) {
					this.focusRow(row);
				}
			}
		}, 
		_onRightArrow: function(){
			var currentRow = this.getFocusedNode();
			if ( !this.isRowALeaf(currentRow)) {
				this._expandRow(currentRow, lang.hitch(this, function(){
					var row = this.getRowNodes(currentRow)[0];
					if ( row ) {
						this.focusRow(row);
					}
				}));
			}
		},
		_onDownArrow: function(){
			console.log("get down");
			var currentRow = this.getFocusedNode();
			if ( currentRow.nextSibling ) {
				this.focusRow(currentRow.nextSibling);
			}
		}, 
		_onUpArrow: function(){
			var currentRow = this.getFocusedNode();
			if ( currentRow.previousSibling ) {
				this.focusRow(currentRow.previousSibling);
			}
		},
		
		_getNext: function(node, direction){
			console.log("get next " + direction);
		}
		*/
		
		refresh: function(rootNode){
			//this.dndController.selectNone();
			
			var store =  new ItemFileWriteStore({
				data: {identifier:this.model.store.getFeatures()["dojo.data.api.Identity"], items:[rootNode]},
				clearOnClose:true
			});

			var model = new TreeStoreModel({
				store: store,
				loadMoreLabel: this.model.loadMoreLabel,
				treeControlId: this.model.treeControlId,
				__pasteMenuItem: this.model.__pasteMenuItem
			});
			
			this.set("store", store);
			this.set("model", model);
			// reload the tree
			this._loadRows();
			
		}
	});
	
	
	DojoTreeGrid.createWidget = function(args) {
		if ( args.id ) {
			var grid = registry.byId(args.id);
			if ( grid ) {
				grid.destroy();
			}
			
			DojoTreeGrid.loadResources().then(function() {
				var node = document.getElementById(args.id);
				
				var width = node.style.width;
				var height = node.style.height;//domStyle.get(args.id, "height");
				
				var store = new ItemFileWriteStore({
					data: args.data,
					identifier: args.data.identifier
				});
				args.store = store;
				var model = new TreeStoreModel({
					store: store,
					loadMoreAttribute: args.structure[0].field,
					treeControlId: args.treeControlId
				});
				args.model = model;
				grid = new DojoTreeGrid(args, args.id);
				grid.startup();
				
				if ( width != "" ) {
					domStyle.set(grid.domNode, { width: width, "overflow-x": "scroll"});
				}
				
				if ( height != "" ) {
					domStyle.set(grid.domNode, { height: height, "overflow-y": "scroll"});
				}
				
				//domStyle.set(grid.domNode, "overflow", "scroll");
				
				if ( args.hasDragNDrop ) {
					/* drag n drop alternative : context menuu*/
					var menu = new Menu({
						targetNodeIds:[args.id],
						selector: ".row"
					});
				
					var pasteMenuItem = new MenuItem({
						label: "Paste",
						disabled: true,
						onClick: function(e){
							var tr = registry.getEnclosingWidget(e.currentTarget);
							var node = tr.currentTarget;
							var item = node.item;
							grid._onRowSelect(node);
							grid.model.pasteItem(grid.model.__selectedItem, null,item);
						}
					});
					
					var copyMenuItem = new MenuItem({
						label: "Copy",
						onClick: function(e) {
							var tr = registry.getEnclosingWidget(e.currentTarget);
							var node = tr.currentTarget;
							var item = node.item;
							grid._onRowSelect(node);
							
							grid.model.__selectedItem = item;
							pasteMenuItem.set("disabled",false);
							
						}
					});
					
					
					menu.addChild(copyMenuItem);
					menu.addChild(pasteMenuItem);
					menu.startup();
					
					grid.model.__pasteMenuItem = pasteMenuItem;
				}
				delete args.hasDragNDrop;
				
			});
			
		}
	};
	
	
	DojoTreeGrid.loadResources = function() {
		var def = new Deferred();
		var theme=document.querySelector("body").classList[0];
		ResourceHelper.loadCss(JAVASCRIPT_BASE + "/ibm/DojoTree/DojoTreeGrid.css").then(function(e){
			def.resolve();
		});
			
		return def;
		
	};
	return DojoTreeGrid;

});
