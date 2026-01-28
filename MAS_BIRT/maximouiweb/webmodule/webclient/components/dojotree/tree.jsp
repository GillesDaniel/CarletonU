<%--
* Licensed Materials - Property of IBM
* 
* 5724-U18, 5737-M66
* 
* (C) COPYRIGHT IBM CORP. 2020,2024 All Rights Reserved.
* 
* US Government Users Restricted Rights - Use, duplication or
* disclosure restricted by GSA ADP Schedule Contract with
* IBM Corp.
--%><%@page import="psdi.webclient.controls.*"%>
<%@page import="psdi.webclient.system.dojo.Dojo"%>
<%@page import="com.ibm.json.java.JSONArray"%>
<%@include file="../../common/simpleheader.jsp"%>
<%

DojoTree treeControl = (DojoTree)control;
DojoTreeNode rootNode = (DojoTreeNode)treeControl.getRootNode();
DojoTreeNode selectedNode = (DojoTreeNode)treeControl.getSelectedNode();

if ( selectedNode == null ) selectedNode = rootNode;

String controlId = treeControl.getId();
String loadMoreLabel = treeControl.getProperty("loadmorelabel");

if ( loadMoreLabel == null || loadMoreLabel.isEmpty() ) {
	loadMoreLabel = "(%1)";
}

String storeId = "js" + controlId + "Store";
String modelId = "js" + controlId + "Model";
String treeId = "js" + controlId + "Tree";
String dataId = "js" + controlId + "Data";

String rootNodeId = rootNode.getId();
boolean isGrid = treeControl.isGrid();


if ( component.needsRender() ) {
	
	String treeheight = component.getProperty("height");
	String treewidth = component.getProperty("width");
System.out.println(treeheight);
	JSONObject jsonStyle = new JSONObject();
	jsonStyle.put("resize","both");
	
	if(!WebClientRuntime.isNull(treeheight)) {
		if(treeheight.indexOf("%")==-1) treeheight=treeheight+"px";
		jsonStyle.put("height", treeheight);
		treeheight="height:"+treeheight+";";
	}
	
	if(!WebClientRuntime.isNull(treewidth)) {
		if(treewidth.indexOf("%")==-1) treewidth=treewidth+"px";
		jsonStyle.put("width", treewidth);
		treewidth="width:"+treewidth+";";
	}
	
	String maximoJSDirectory = Dojo.getMaximoJavascriptDirectory(request);
	String style = treewidth + treeheight + "";
	%>
	<div id="<%=treeId%>" control="true" class="tcont <%=cssclass%>" style="<%=treewidth%><%=treeheight%>;"/>
	<%
	if ( !designmode ) {
	%>
	<script type="text/javascript">		
		var <%=dataId%> = {
				identifier:'treenodeid', 
				items: [
					<%
					java.util.List<DojoTreeNode> alreadyRenderedNodes = new java.util.ArrayList<DojoTreeNode>();
					alreadyRenderedNodes.add(rootNode);
					StringBuilder sb = new StringBuilder();
					
					while(!alreadyRenderedNodes.isEmpty()) {
						DojoTreeNode current = alreadyRenderedNodes.remove(0);
						JSONObject obj = current.toJSON();
						
						for(BaseInstance b : current.getChildren()) {
							if ( b instanceof DojoTreeNode ) {
								alreadyRenderedNodes.add((DojoTreeNode)b);
							}
						}
						
						obj.put("childrenfetched", current.getChildCount());
						sb.append(obj.toString()).append("\n,");
						
					}
					
					sb.substring(0, sb.length() - 2);
					%><%=sb.toString()%>
					]
			};
		
		<%
		if ( !isGrid ) {
		%>
			dojo.require("ibm.DojoTree.DojoTree");
			
			ibm.DojoTree.DojoTree.createWidget({
				data: <%=dataId%>,
				id: "<%=treeId%>",
				async: <%=async%>,
				treeControlId: "<%=controlId%>",
				selectedNodeId: "<%=selectedNode.getId()%>",
				hasDragNDrop:<%=treeControl.hasDragNDrop()%>,
				map: <%=treeControl.dropableObjects().toString()%>,
				checkBoxes: <%=treeControl.hasCheckBoxes()%>,
				loadMoreLabel : "<%=loadMoreLabel%>"
			});
		<%
		} else {
			String layoutId = "js" + controlId + "Layout"; 
			
			JSONArray layout = new JSONArray();
			StringBuilder l = new StringBuilder();
			
			List<BaseInstance> columns = treeControl.getColumns();
			for(BaseInstance column: columns) {
				JSONObject c = new JSONObject();
				c.put("name", column.getProperty("label"));
				c.put("field", column.getProperty("id"));
				c.put("width", column.getProperty("width"));
				String dataType = (column.getProperty("datatype") == null || column.getProperty("datatype").equals("") ? "normal" : column.getProperty("datatype"));
	
				if ( dataType.equalsIgnoreCase("image") ) {
					c.put("formatter", "imageFormatter");
				} else if ( dataType.equalsIgnoreCase("event") ) {
					c.put("formatter", "eventFormatter");
				}
				layout.add(c);
			}
			
		%>
			dojo.require("ibm.DojoTree.DojoTreeGrid");
			
			ibm.DojoTree.DojoTreeGrid.createWidget({
				structure: <%=layout.toString()%>,
				data: <%=dataId%>,
				id: "<%=treeId%>",
				async: <%=async%>,
				selectedNodeId: "<%=selectedNode.getId()%>",
				treeControlId: "<%=controlId%>",
				hasDragNDrop:<%=treeControl.hasDragNDrop()%>,
				map: <%=treeControl.dropableObjects().toString()%>,
				checkBoxes: <%=treeControl.hasCheckBoxes()%>,
				loadMoreLabel : "<%=loadMoreLabel%>"
			});
		<%
		}
		%>

	</script><%
	}
} else if ( !designmode ) {
	%>
	<component id="<%=treeId%>_holder">
		<![CDATA[<script type="text/javascript">
	<%
	if ( treeControl.mustUpdateSelectedNode() ) {
		DojoTreeNode toUpdate = treeControl.getSelectedNode();
	%>
		
			var tree = dijit.byId("<%=treeId%>");
			// search for id <%=toUpdate.getId()%>
			var treeModel = tree.model;
			var treeModelStore = treeModel.store;
			var thisNodeUpdated = <%=toUpdate.toJSON()%>;
			// Callback for processing a returned list of items.
            function updateTreeNode(items, request){
            	var node = items[0];
            	//treeModelStore.deleteItem(node);
            	//treeModelStore.setValue(item, "hasChildren", thisNodeUpdated.hasChildren);
            	
                //alert("Here" + node.label);
            }

            // Callback for if the lookup fails.
            function didNotUpdateTreenode(error, request){
                alert("lookup failed.");
                alert(error);
            }
            
			treeModelStore.fetch({query: {"treenodeid": "<%=toUpdate.getId()%>"},onComplete: updateTreeNode, onError: didNotUpdateTreenode, queryOptions: {deep:true}});
			//geoStore.fetch({query: { type: "continent"}, onBegin: clearOldCList, onComplete: gotContinents, onError: fetchFailed, queryOptions: {deep:true}});
	<%
	} else {
	%>
	
		var rootNode = <%=rootNode.toJSON().toString()%>;
		var tree = dijit.byId("<%=treeId%>"); 
		var <%=dataId%> = {
			identifier:'treenodeid', 
			items: [
				<%
				java.util.List<DojoTreeNode> alreadyRenderedNodes = new java.util.ArrayList<DojoTreeNode>();
				alreadyRenderedNodes.add(rootNode);
				StringBuilder sb = new StringBuilder();
				
				while(!alreadyRenderedNodes.isEmpty()) {
					DojoTreeNode current = alreadyRenderedNodes.remove(0);
					JSONObject obj = current.toJSON();
					
					for(BaseInstance b : current.getChildren()) {
						if ( b instanceof DojoTreeNode ) {
							alreadyRenderedNodes.add((DojoTreeNode)b);
						}
					}
					
					obj.put("childrenfetched", current.getChildCount());
					sb.append(obj.toString()).append("\n,");
					
				}
				
				sb.substring(0, sb.length() - 2);
				%><%=sb.toString()%>
				]
		};
		var selectedNodeId = "<%=selectedNode.getId()%>";
		tree.refresh(rootNode, <%=dataId%>, selectedNodeId);

	<%
	}
	%>
		</script>]]>
	</component><%
}
%>
<%@ include file="../../common/componentfooter.jsp" %>
