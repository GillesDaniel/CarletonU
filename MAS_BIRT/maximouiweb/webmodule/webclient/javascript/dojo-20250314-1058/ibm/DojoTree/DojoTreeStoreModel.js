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
define("ibm/DojoTree/DojoTreeStoreModel", ["dojo/_base/declare",
		 "dojo/_base/lang",
		 "dojo/_base/array",
		 "dijit/tree/TreeStoreModel"
		 ], 
			 function(declare, lang, array, TreeStoreModel) {

	
	var DojoTreeStoreModel = declare("ibm.DojoTree.DojoTreeStoreModel", [TreeStoreModel], {
		
		query: {parent:null},
		
		labelAttr: "label",
		
		loadMoreAttribute: "label",
		
		loadMoreLabel: "Load more (%1)",
		
		mayHaveChildren: function(item) {
			return this.store.getValue(item, "nbChildren") > 0;
		},
		
		getChildren: function(item, onComplete, onError){
			var hasChildren = this.mayHaveChildren(item); 
			if ( hasChildren ) {
				if ( this.store.getValue(item, "childrenfetched") > 0 ) {
					var parentId = this.getIdentity(item);
					this.store.fetch( {
						query: { parent: parentId },
						onComplete: onComplete,
						onError: onError
					});
				} else {
					this.getChildrenFromMaximo(item, onComplete, onError);
				}
			} else {
				onComplete([]);
			}
		},
		
		getChildrenFromMaximo: function(parent, onComplete, onError) {
			var treeNodeId = this.getIdentity(parent);
			var store = this.store;
			var self = this;
			var successHandler = function( responseObj, ioArgs ) {
				if ( !responseObj ) {
					onError();
					return;
				}
				
				
				var arr = [];
				for(i = 0; i < responseObj.length; i++) {
					var toAdd = responseObj[i];
					
					
					if ( parent.root ) {
						try {
							arr[i] = store.newItem(toAdd);
						} catch(e) {
							store.fetchItemByIdentity({identity:toAdd.treenodeid, onItem: function(item){
								arr[i] = item;
							}});
						}
					} else {
						try {
							arr[i] = store.newItem(toAdd,{parent:parent});
						} catch(e) {
							store.fetchItemByIdentity({identity:toAdd.treenodeid, onItem: function(item){
								arr[i] = item;
							}});
						}
					}
				}
				
				var nbChildren = store.getValue(parent, "nbChildren");
				var childrenFetched = arr.length;
				
				//childrenFetched = childrenFetched + arr.length;
				store.setValue(parent, "childrenfetched", childrenFetched);
				if ( nbChildren > childrenFetched ) {
					var text = self.loadMoreLabel.replace("%1",(nbChildren - childrenFetched));
					var attr = self.loadMoreAttribute;
					
					var fetchMoreNode = {
						checked: false,
						folderimage: null,
						loadMore: true,
						image: null,
						nbChildren: 0,
						attr: text,
						objectname: null,
						openfolderimage: null,
						textcss: null,
						parent: treeNodeId,
						treenodeid: treeNodeId + "_loadMore"
					};
					fetchMoreNode[attr] = text;
					
					try {
						arr[i] = store.newItem(fetchMoreNode,{parent:parent});
					} catch (error ) {
						store.fetchItemByIdentity({identity:fetchMoreNode.treenodeid, onItem: function(item){
							if ( item ) {
								store.deleteItem(item);
							}
							store.save();
							arr[i] = store.newItem(fetchMoreNode,{parent:parent});
						}});
					}
				} else {
					store.fetchItemByIdentity({identity:treeNodeId+"_loadMore", onItem: function(item){
						if ( item ) {
							store.deleteItem(item);
						}
					}});
				}
				onComplete(arr);
				store.save();
			}

			sendXHREvent('getChildrenNodes',  treeNodeId, '', REQUESTTYPE_HIGHASYNC, 'json', 'application/json', successHandler, onError);
	  
		},
		
		pasteItem: function(item, parentItem, target) {
			__s = function(responseObj, ioArgs) {
				if ( this.__pasteMenuItem ) {
					this.__pasteMenuItem.set("disabled",true);
				}
				delete this.__selectedItem;
				processXHR(responseObj, ioArgs);
			};
			
			_successHandler = function(res) {
				sendXHREvent('pasteMbo', this.treeControlId, this.store.getIdentity(target), REQUESTTYPE_SYNC, null, null, lang.hitch(this, __s));
			};
			
			sendXHREvent('copyMbo', this.treeControlId, this.store.getIdentity(item), REQUESTTYPE_SYNC, null, null, lang.hitch(this,_successHandler));
		}
		
	});
	
	return DojoTreeStoreModel;

});
