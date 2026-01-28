/*
 * Licensed Materials - Property of IBM
 *
 * 5724-U18, 5737-M66
 *
 * (C) Copyright IBM Corp. 2021,2024 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */

//>>built
define("ibm/DojoTree/Source", ["dojo/dom-style", "dojo/_base/array", "dojo/_base/connect", "dojo/dnd/Manager","dijit/tree/dndSource"], function(domStyle, array, connect, DNDManager, Source) {

return dojo.declare("ibm.DojoTree.Source", Source, {

	checkItemAcceptance: function(target, source, position){
		// summary:
		//		Stub function to be overridden if one wants to check for the ability to drop at the node/item level
		// description:
		//		In the base case, this is called to check if target can become a child of source.
		//		When betweenThreshold is set, position="before" or "after" means that we
		//		are asking if the source node can be dropped before/after the target node.
		// target: DOMNode
		//		The dijitTreeRoot DOM node inside of the TreeNode that we are dropping on to
		//		Use dijit.getEnclosingWidget(target) to get the TreeNode.
		// source: dijit/tree/dndSource
		//		The (set of) nodes we are dropping
		// position: String
		//		"over", "before", or "after"
		// tags:
		//		extension
		
		var tree = this.tree;
		var store = this.tree.get("model").store;

		var sourceItem = source.getSelectedTreeNodes()[0].item;
		var targetItem = dijit.getEnclosingWidget(target).item;
		
		var sourceObjectName = store.getValue(sourceItem, "objectname");
		var targetObjectName = store.getValue(targetItem, "objectname");
		
		return tree.canDrop(sourceObjectName, targetObjectName);
	},
	onDndDrop: function(source, nodes, copy){
			// summary:
			//		Topic event processor for /dnd/drop, called to finish the DnD operation.
			// description:
			//		Updates data store items according to where node was dragged from and dropped
			//		to.   The tree will then respond to those data store updates and redraw itself.
			// source: Object
			//		The dijit/tree/dndSource / dojo/dnd/Source which is providing the items
			// nodes: DomNode[]
			//		The list of transferred items, dndTreeNode nodes if dragging from a Tree
			// copy: Boolean
			//		Copy items, if true, move items otherwise
			// tags:
			//		protected
			if(this.containerState == "Over"){
				var tree = this.tree,
					model = tree.model,
					target = this.targetAnchor;

				this.isDragging = false;

				// Compute the new parent item
				var newParentItem;
				var insertIndex;
				var before;		// drop source before (aka previous sibling) of target
				newParentItem = (target && target.item) || tree.item;
				if(this.dropPosition == "Before" || this.dropPosition == "After"){
					// TODO: if there is no parent item then disallow the drop.
					// Actually this should be checked during onMouseMove too, to make the drag icon red.
					newParentItem = (target.getParent() && target.getParent().item) || tree.item;
					// Compute the insert index for reordering
					insertIndex = target.getIndexInParent();
					if(this.dropPosition == "After"){
						insertIndex = target.getIndexInParent() + 1;
						before = target.getNextSibling() && target.getNextSibling().item;
					}else{
						before = target.item;
					}
				}else{
					newParentItem = (target && target.item) || tree.item;
				}

				// If necessary, use this variable to hold array of hashes to pass to model.newItem()
				// (one entry in the array for each dragged node).
				var newItemsParams;

				array.forEach(nodes, function(node, idx){
					// dojo/dnd/Item representing the thing being dropped.
					// Don't confuse the use of item here (meaning a DnD item) with the
					// uses below where item means dojo.data item.
					var sourceItem = source.getItem(node.id);

					// Information that's available if the source is another Tree
					// (possibly but not necessarily this tree, possibly but not
					// necessarily the same model as this Tree)
					if(array.indexOf(sourceItem.type, "treeNode") != -1){
						var childTreeNode = sourceItem.data,
							childItem = childTreeNode.item,
							oldParentItem = childTreeNode.getParent().item;
					}

					if(source == this){
						// This is a node from my own tree, and we are moving it, not copying.
						// Remove item from old parent's children attribute.
						// TODO: dijit/tree/dndSelector should implement deleteSelectedNodes()
						// and this code should go there.

						if(typeof insertIndex == "number"){
							if(newParentItem == oldParentItem && childTreeNode.getIndexInParent() < insertIndex){
								insertIndex -= 1;
							}
						}
						model.pasteItem(childItem, oldParentItem, newParentItem, copy, insertIndex, before);
					}else if(model.isItem(childItem)){
						// Item from same model
						// (maybe we should only do this branch if the source is a tree?)
						model.pasteItem(childItem, oldParentItem, newParentItem, copy, insertIndex, before);
					}else{
						// Get the hash to pass to model.newItem().  A single call to
						// itemCreator() returns an array of hashes, one for each drag source node.
						if(!newItemsParams){
							newItemsParams = this.itemCreator(nodes, target.rowNode, source);
						}

						// Create new item in the tree, based on the drag source.
						model.newItem(newItemsParams[idx], newParentItem, insertIndex, before);
					}
				}, this);

				// Expand the target node (if it's currently collapsed) so the user can see
				// where their node was dropped.   In particular since that node is still selected.
				//this.tree._expandNode(target);
			}
			this.onDndCancel();
		},
	onMouseMove: function(e){
		// summary:
		//		Called for any onmousemove/ontouchmove events over the Tree
		// e: Event
		//		onmousemouse/ontouchmove event
		// tags:
		//		private
		if(this.isDragging && this.targetState == "Disabled"){ return; }
		this._doDeselect = false; 
		var m = DNDManager.manager();
		if(this.isDragging){
			this._onDragMouse(e);
		}else{
			if(this.mouseDown && this.isSource &&
				 (Math.abs(e.pageX-this._lastX)>=this.dragThreshold || Math.abs(e.pageY-this._lastY)>=this.dragThreshold)){
				var nodes = this.getSelectedTreeNodes();
				if(nodes.length){
					if(nodes.length > 1){
						//filter out all selected items which has one of their ancestor selected as well
						var seen = this.selection, i = 0, r = [], n, p;
						nextitem: while((n = nodes[i++])){
							for(p = n.getParent(); p && p !== this.tree; p = p.getParent()){
								if(seen[p.id]){ //parent is already selected, skip this node
									continue nextitem;
								}
							}
							//this node does not have any ancestors selected, add it
							r.push(n);
						}
						nodes = r;
					}
					nodes = array.map(nodes, function(n){return n.domNode});
					m.startDrag(this, nodes, this.copyState(connect.isCopyKey(e)));
					
					var parentNode = nodes[0];
					var zInd = domStyle.getComputedStyle(parentNode)["zIndex"];
					while ( parentNode && parentNode.style && (zInd == undefined || zInd == "auto")) {
						parentNode = parentNode.parentNode;
						zInd = domStyle.getComputedStyle(parentNode)["zIndex"];//(parentNode,"z-index");
					}
					
					zInd = parseInt(zInd) + 1;
					domStyle.set(m.avatar.node,"zIndex",zInd);
				}
			}
		}
	}
});
});



