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
define("ibm.DojoTree.DojoTree",
		["dojo/_base/declare",
		 "dojo/_base/lang",
		 "dojo/_base/array",
		 "ibm/ResourceHelper",
		 "dojo/Deferred",
		 "dijit/registry",
		 "dojo/on",
		 "dojo/dom-geometry",
		 "dojo/dom-style",
		 "dojo/dom-class",
		 "dojo/data/ItemFileWriteStore",
		 "ibm/DojoTree/DojoTreeStoreModel",
		 "ibm/DojoTree/Source",
		 "dijit/Tree",
		 "dijit/Menu",
		 "dijit/MenuItem",
		 "dijit/form/CheckBox",
		 "dijit/registry"
		 ], 
	function(declare, lang, array, ResourceHelper, Deferred, registry, on, domGeom, domStyle, domClass, ItemFileWriteStore, TreeStoreModel, Source, Tree, Menu, MenuItem, CheckBox, registry) {

	
	
	var DojoTree = declare("ibm.DojoTree.DojoTree", [Tree], {
		autoExpand:false, 
		persist:false, 
		nodesToOpen: [],
		showRoot: true,
		checkBoxes: false, 
		async: true, 
		treeControlId: null,
		map:{},
		
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
		   
		getLabelClass: function(item, opened) {
		   var st = this.model.store;
		   if ( !item.root && st.getValue(item,"textcss") && st.getValue(item, "textcss") != "" ) {
			   return st.getValue(item,"textcss");
		   } else {
			 return null;
		   }
	   },
	   
	   _onChangeOpenedState: function(item, value) {
		   var treeNodeId = this.model.store.getValue(item,"treenodeid");
		   var reqtype = this.async ? REQUESTTYPE_ASYNC : REQUESTTYPE_SYNC; 
		   if ( this.model.store.getValue(item, "opened") != value && this.model.mayHaveChildren(item) ) {
				sendXHREvent("openNode", treeNodeId, value, reqtype, null, null, null);
		   }
		   
	   },
	   
	   onOpen: function(item, options) {
		   this._onChangeOpenedState(item, true);
	   },
	   
	   onClose: function(item, options) {
		   this._onChangeOpenedState(item, false);
	   },
	   
	   onClick: function(item, node, evt) {
		   if ( item.loadMore ) {
			   var parent = node.getParent();
			   var pItem = parent.item;
			   this.model.getChildrenFromMaximo(
				   pItem,
				   function(items){
					   parent.setChildItems(items);
				   },
				   function(error){
					   console.log(error);
				   });
		   } else {
				this.set("selectedItem", item);
				var treeNodeId = this.model.store.getValue(item,"treenodeid");
				var reqtype = this.async ? REQUESTTYPE_ASYNC : REQUESTTYPE_SYNC; 
				sendXHREvent("selectNode", this.treeControlId, treeNodeId, reqtype, null, null, null);
		   }
	   },
	   
	   setNodesToOpen: function(arr) {
			if ( arr == null ) arr = [];
			arr.splice(0,0,this.model.rootId);
			if ( arr && arr.length && arr.length > 0 ) {
				try {
					this.set("path", arr);
				} catch(e) {
					console.log("Error : " + e.toString());
				}
			}
			
			if ( arr.length > 1 ) {
				var treeNodeId = arr[arr.length - 1];
				var reqtype = this.async ? REQUESTTYPE_ASYNC : REQUESTTYPE_SYNC;
				
				sendXHREvent("selectNode", this.treeControlId, treeNodeId, reqtype, null, null, null);
			}
	   },
	   
	   _createTreeNode: function(args) {
			var self = this;
			
			var expand = function(){
				var res = this._expand();
				res.then(lang.hitch(this,function(){
					var treeNodeId = self.model.store.getValue(this.item,"treenodeid");
					var opened = this.isExpanded;
					var reqtype = self.async ? REQUESTTYPE_ASYNC : REQUESTTYPE_SYNC; 
					if ( opened != self.model.store.getValue(this.item, "opened") && self.model.mayHaveChildren(this.item) ) {
						sendXHREvent("openNode", treeNodeId, opened, reqtype, null, null, null);
					}
				}));
				return res;
			};
			var collapse = function(){
				var res = this._collapse();
				res.then(lang.hitch(this,function(){
					var treeNodeId = self.model.store.getValue(this.item,"treenodeid");
					var opened = this.isExpanded;
					var reqtype = self.async ? REQUESTTYPE_ASYNC : REQUESTTYPE_SYNC; 
					sendXHREvent("openNode", treeNodeId, opened, reqtype, null, null, null);
				}));
				return res;
			};
			
			var res = new dijit.Tree._TreeNode(args);
			res._expand = res.expand;
			res.expand = expand;
			res._collapse = res.collapse;
			res.collapse = collapse;
			
			if ( this.selectedNodeId && this.selectedNodeId == this.model.store.getIdentity(res.item)) {
				res.setSelected(true);
				res.focus();
			}
			
			if ( this.checkBoxes == undefined || !this.checkBoxes ) return res;
			var checked;
			if ( this.model.store.isItem(res.item) ) {
				checked = this.model.store.getValue(res.item,"checked");
			} else {
				checked = false;
				
			}
		
			
			var cb = new CheckBox({id: res.id + "_cb", checked: checked});
			dojo.attr(cb.domNode.firstChild, "ctype","");
			cb.placeAt(res.labelNode, "first");
			dojo.connect(cb, "onChange", function(ev) {
				var _f = function(treeNode) {
					var children = treeNode.getChildren();
					var value = dijit.getEnclosingWidget(treeNode.labelNode.firstChild).get("checked");
					for(c in children) {
						var widget = treeNode.getChildren()[c];
						var cb = dijit.getEnclosingWidget(widget.labelNode.firstChild);
						cb.set("checked", value);
						_f(widget);
					}
				};
				var treeNode = dijit.getEnclosingWidget(this.domNode.parentNode);
				var treeNodeId = self.model.store.getValue(treeNode.item,"treenodeid");
				var checked = !(this.get("checked") == false);
				//ev.stopPropagation();
				_f(treeNode);
				var reqtype = self.async ? REQUESTTYPE_ASYNC : REQUESTTYPE_SYNC; 
				sendXHREvent("setChecked", treeNodeId, checked, reqtype, null, null, null);
			});
			
			return res;
		},
		
		canDrop: function(sourceObjectName, targetObjectName) {
			return this.map[sourceObjectName] && this.map[sourceObjectName].indexOf(targetObjectName) != -1;
		},
		
		
		_state:function(node, expand) {
			return this.model.store.getValue(node.item, "opened");
		},
		
		
		refresh: function(rootNode, data, selectedNodeId){
			this.dndController.selectNone();
			
			var store = new ItemFileWriteStore({
				data: data,
				identifier: data.identifier,
				clearOnClose:true
			});

			var model = new TreeStoreModel({
				store: store,
				loadMoreLabel: this.model.loadMoreLabel,
				treeControlId: this.model.treeControlId,
				__pasteMenuItem: this.model.__pasteMenuItem
			});
			
			// remove the rootNode
			if (this.rootNode) {
				this.rootNode.destroyRecursive();
			}
			
			this.set("store",store);
			this.set("model",model);
			this.set("selectedNodeId", selectedNodeId);
			
			this._itemNodesMap = {};

			// reload the tree
			this._load();
			
			
			
			setTimeout(function(){
				var item = this.store.fetchItemByIdentity({identity:selectedNodeId, onItem: function(item){
					var n = this.getNodesByItem(item);
					this.focusNode(n[0]);
				}.bind(this)});
			}.bind(this), 2000);
			
			
		}
	});
	
	
	DojoTree.createWidget = function(args) {
		if ( args.id ) {
			var tree = registry.byId(args.id);
			if ( tree ) {
				tree.destroy();
			}
			
			DojoTree.loadResources().then(function() {
				var width = domStyle.get(args.id, "width");
				var height = domStyle.get(args.id, "height");
				
				var store = new ItemFileWriteStore({
					data: args.data,
					identifier: args.data.identifier,
					clearOnClose:true
				});
				args.store = store;
				var model = new TreeStoreModel({
					store: store,
					loadMoreLabel: args.loadMoreLabel,
					treeControlId: args.treeControlId
				});
				args.model = model;
				delete args.loadMoreLabel;
				
				if ( args.hasDragNDrop ) {
					args.dndController = "ibm.DojoTree.Source";
				}
				
				tree = new DojoTree(args, args.id);
				tree.startup();
				
				domStyle.set(tree.domNode, { width: width + "px", height: height + "px"});
				
				setTimeout(function(){
					var item = this.store.fetchItemByIdentity({identity:args.selectedNodeId, onItem: function(item){
						var n = this.getNodesByItem(item);
						this.focusNode(n[0]);
					}.bind(this)});
				}.bind(tree), 2000);
				
				
				if ( args.hasDragNDrop ) {
					/* drag n drop alternative : context menuu*/
					var menu = new Menu({
						targetNodeIds:[args.id],
						selector: ".dijitTreeNode"
					});
				
					var pasteMenuItem = new MenuItem({
						label: "Paste",
						disabled: true,
						onClick: function(e){
							var tr = registry.getEnclosingWidget(e.currentTarget);
							var node = registry.getEnclosingWidget(tr.currentTarget);
							var item = node.item;
							tree._onClick(node,e);
							tree.model.pasteItem(tree.model.__selectedItem, null,item);
						}
					});
					
					var copyMenuItem = new MenuItem({
						label: "Copy",
						onClick: function(e) {
							var tr = registry.getEnclosingWidget(e.currentTarget);
							var node = registry.getEnclosingWidget(tr.currentTarget);
							var item = node.item;
							tree._onClick(node,e);
							
							tree.model.__selectedItem = item;
							pasteMenuItem.set("disabled",false);
							
						}
					});
					
					
					menu.addChild(copyMenuItem);
					menu.addChild(pasteMenuItem);
					menu.startup();
					
					tree.model.__pasteMenuItem = pasteMenuItem;
				}
				delete args.hasDragNDrop;
			});
			
		}
	};
	
	DojoTree.loadResources = function() {
		var def = new Deferred();
		var theme=document.querySelector("body").classList[0];
		ResourceHelper.loadCss(JAVASCRIPT_BASE + "/dojox/grid/resources/Grid.css").then(function(e){
		ResourceHelper.loadCss(JAVASCRIPT_BASE + "/dojox/grid/resources/" + theme + "Grid.css").then(function(e2){
			def.resolve();
		});
		});
			
		return def;
		
	};
	return DojoTree;

});
