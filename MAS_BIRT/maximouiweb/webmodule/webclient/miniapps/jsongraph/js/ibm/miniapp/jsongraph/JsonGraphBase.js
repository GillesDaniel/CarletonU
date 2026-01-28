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

define([
	"dojo/_base/lang",
	"dojo/_base/declare",
	"dojo/dom-geometry",
	"dojo/dom",
	"dojo/dom-style",
	"dojo/dom-attr",
	"dojo/_base/window",
    "dojo/Deferred",
    "dojo/dom-construct",
    "dojo/_base/array",
    "dojo/aspect",
    "dojo/window",
    "com/ibm/tivoli/maximo/miniapps/_MaximoIO",
    "com/ibm/tivoli/maximo/miniapps/_MiniApp",
    "com/ibm/tivoli/maximo/miniapps/_MaximoLog",
	"com/ibm/tivoli/maximo/miniapps/Handlers"

], function(lang, declare, geom, dom, domStyle, domAttr, bwin, Deferred, domConstruct, 
		arrayUtils, aspect, win, _MaximoIO, _MiniApp, log, Handlers){
    return declare([_MaximoIO, _MiniApp, Handlers], {
		// static variables
    	jsongraph: null,
    	i18nJElabels: null,    	
    	options: null,
		sizetoparentdomid: null,
		dom: null,
		currentMode: 'code',

		constructor: function(options) {
    		this.options = options;
    		this.sizetoparentdomid = options.sizetoparentdomid;
            if(options.dom) {
            	this.dom = options.dom;
            } else {
            	this.dom = this.domNode;
            }

    		if (options.loglevel) {
    			log.LOG_LEVEL=options.loglevel;
    		}

    		log.debug("{} options", this.TAG, options);
    		
    	},

        startup: function() {
        	this.inherited(arguments);

        	var me=this;
 //       	if (window.JSONGraph) {
        		me.createUI(null);
        		return;
//        	}
        },

		createUI: function() {
			if (!this.dom) {
				dnode = this.domNode;
			}

			log.debug("Creating JSONgraph UI");

        	thisJGObjectObj=this;
            
			var container = domConstruct.create( "div", {
				"id" : "jsonGraphId",
				"width": "100%",
				"margin-left": "20px"
			});
			
			domConstruct.place(container, this.domNode, "first");
			
			var jsonOptions = this.jsonEditorOptions();

			thisJGObjectObj.fetch('getSymbologyConfig').then(function(config) {
            	var thisJson = config.json;
            	var thisJsonSchema = config.jsonSchema;
            	
            	var jsPath = thisJGObjectObj.rootUrl + "/libraries/d3/d3.min.js";
            	if (thisJGObjectObj.options.loglevel == 0) {
            		jsPath = thisJGObjectObj.rootUrl + "/libraries/d3/d3.js";
            	}
            	
                require([jsPath], function (JSONGraph) {
                	thisJGObjectObj.jsongraph = thisJGObjectObj.createGraph(thisJson);
                });
            });
			
			this._resize();
			
			aspect.after(window, "onresize", lang.hitch(this,this._deferredResize));

		},
		
		resize: function() {
			this._resize();
		},
		
        _resize: function () {
        	console.log("_resize occured");
            var size = this.onMeasure();

            var domGraph = document.getElementById('jsonGraphId');
                          
			log.debug('{}: resize() called with measure', this.TAG, size);
			if (size && (size.w||size.h)) {
			    var width = Number((size.w).replace("px", ""));
			    var height = Number((size.h).replace("px", ""));
			    
			    if (this.fillHeight) {
			        var winSize = win.getBox();
			        var pos = geom.position(this.domNode);
			        size.w = (winSize.w - pos.x - this.PAD - 25) + "px";
			    }
			    size.h = (height - this.getHeightPad()) + "px";
			
			} else if (size && (size.width||size.height)) {
			    var width = Number((size.width).replace("px", ""));
			    var height = Number((size.height).replace("px", ""));
			
			    if (this.fillHeight) {
			        var winSize = win.getBox();
			        var pos = geom.position(this.domNode);
			        size.width = (winSize.w - pos.x - this.PAD - 25) + "px";
			    }
			    size.height = (height - this.getHeightPad()) + "px";
			
			} else {
			    log.warn("Failed to calculate size of miniapp??", size);
			}
			
			domStyle.set(this.domNode, size);
			if (domGraph != null) {
				this.refreshData();
			}
        },

		_removeOldEditor: function() {
			if (this.jsongraph != null) {
				log.debug('{} Cleaning up jsongraph', this.TAG);
				if (this.clearHandlers) this.clearHandlers();
			}
		},

		destroy: function () {
			this._removeOldEditor();
			this.inherited(arguments);
		},

		onRefreshRequested: function(data) {
			log.debug("Refresh UI -- nothing to refresh");
			log.debug(data);
        },
        
        jsonEditorOptions: function() {
            var options = {
	    	    mode: 'code',
	    	    modes: ['code', 'form', 'text', 'tree', 'view'], // allowed modes
	    	    
	    	    onError: function (err) {
	    	      alert(err.toString());
	    	    },
	    	    
	    	    onModeChange: function (newMode, oldMode) {
	    	    	thisJGObjectObj.currentMode = newMode;
	    	    	console.log('Mode switched from', oldMode, 'to', newMode);
	    	    }
            };
            
            return options;
        },
        
        getHeightPad: function () {
        	return 200;
        },
        
        setDomStyle: function (domGraph, domGraph_outer, size) {
			domStyle.set(domGraph, size);
        },
   
        _deferredResize: function () {
            var me=this;
			setTimeout(function(){
                me._resize();
            }, 300);
        },
        
        refreshData: function () {
        },
        
        createGraph: function(jsonObj) {
        	var treeData = jsonObj;
        	var graph = [];
        	
        	function traverse(jsonObj,graph) {
        	    if( typeof jsonObj == "object" ) {
        	        for (var prop in jsonObj) { 
        				var children = [];                
                        var k = prop;
                        var v = jsonObj[prop];
                        if (v.id) {
                            k=v.id;
                        } else if (v.name){
                            k=v.name;
                        } else if (v.value){
                            k=v.value;
                        } else if (v.objectName){
                            k=v.objectName;
                        }
                        if (k != "find") { // IE issue with find method
                        	traverse(v,children);
                        	graph.push({'name' : k,'children' : children});
                        }
        	        }
        	    }
        	    else {
        			graph.push({'name' : jsonObj});
        	    }
        	}
        	
        	traverse(treeData,graph);
        	var graph1 = JSON.stringify(graph);
        	treeData = graph1.substr(1,graph1.length-2);
        	treeData = JSON.parse(treeData);

        	
            // Calculate total nodes, max label length
            var totalNodes = 0;
            var maxLabelLength = 0;
            
            // panning variables
            var panSpeed = 200;
            // Misc. variables
            var i = 0;
            var duration = 750;
            var root;

            // size of the diagram
            var viewerWidth = this.domNode.clientWidth;
            var viewerHeight = this.domNode.clientHeight;

        	
            var tree = d3.layout.tree()
                .size([viewerHeight, viewerWidth]);

            // define a d3 diagonal projection for use by the node paths later on.
            var diagonal = d3.svg.diagonal()
                .projection(function(d) {
                    return [d.y, d.x];
                });

            // A recursive helper function for performing some setup by walking through all nodes

            function visit(parent, visitFn, childrenFn) {
                if (!parent) return;

                visitFn(parent);

                var children = childrenFn(parent);
                if (children) {
                    var count = children.length;
                    for (var i = 0; i < count; i++) {
                        visit(children[i], visitFn, childrenFn);
                    }
                }
            }


            // sort the tree according to the node names

            function sortTree() {
                tree.sort(function(a, b) {
                    return b.name.toString().toLowerCase() < a.name.toString().toLowerCase() ? 1 : -1;
                });
            }
 
            function expandJTreeAll(){
            	root.children.forEach(function(child){
            		expand(child);
            		updateTree(child);
             	    centerNode(child);
            	});
            }

            function collapseJTreeAll(){
            	root.children.forEach(function(child){
            		collapse(child);
            	    updateTree(child);
            	    centerNode(child);
            	});
            }


            // Sort the tree initially incase the JSON isn't in a sorted order.
            sortTree();

             function pan(domNode, direction) {
                var speed = panSpeed;
                if (panTimer) {
                    clearTimeout(panTimer);
                    translateCoords = d3.transform(svgGroup.attr("transform"));
                    if (direction == 'left' || direction == 'right') {
                        translateX = direction == 'left' ? translateCoords.translate[0] + speed : translateCoords.translate[0] - speed;
                        translateY = translateCoords.translate[1];
                    } else if (direction == 'up' || direction == 'down') {
                        translateX = translateCoords.translate[0];
                        translateY = direction == 'up' ? translateCoords.translate[1] + speed : translateCoords.translate[1] - speed;
                    }
                    scaleX = translateCoords.scale[0];
                    scaleY = translateCoords.scale[1];
                    scale = zoomListener.scale();
                    svgGroup.transition().attr("transform", "translate(" + translateX + "," + translateY + ")scale(" + scale + ")");
                    d3.select(domNode).select('g.node').attr("transform", "translate(" + translateX + "," + translateY + ")");
                    zoomListener.scale(zoomListener.scale());
                    zoomListener.translate([translateX, translateY]);
                    panTimer = setTimeout(function() {
                        pan(domNode, speed, direction);
                    }, 50);
                }
            }

            // Define the zoom function for the zoomable tree

            function zoom() {
                svgGroup.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
            }


            // define the zoomListener which calls the zoom function on the "zoom" event constrained within the scaleExtents
            var zoomListener = d3.behavior.zoom().scaleExtent([0.1, 3]).on("zoom", zoom);

            // define the baseSvg, attaching a class for styling and the zoomListener
            var baseSvg = d3.select("#jsonGraphId").append("svg")
                .attr("width", viewerWidth)
                .attr("height", viewerHeight)
                .attr("class", "overlay")
                .call(zoomListener);

            // Helper functions for collapsing and expanding nodes.

            function collapse(d) {
                if (d.children) {
                    d._children = d.children;
                    d._children.forEach(collapse);
                    d.children = null;
                }
            }

            function expand(d) {
                if (d._children) {
                    d.children = d._children;
                    d.children.forEach(expand);
                    d._children = null;
                }
            }


            // Function to center node when clicked/dropped so node doesn't get lost when collapsing/moving with large amount of children.

            function centerNode(source) {
                scale = zoomListener.scale();
                x = -source.y0;
                y = -source.x0;
                x = x * scale + viewerWidth / 2;
                y = y * scale + viewerHeight / 2;
                d3.select('g').transition()
                    .duration(duration)
                    .attr("transform", "translate(" + x + "," + y + ")scale(" + scale + ")");
                zoomListener.scale(scale);
                zoomListener.translate([x, y]);
            }

            // Toggle children function

            function toggleChildren(d) {
                if (d.children) {
                    d._children = d.children;
                    d.children = null;
                } else if (d._children) {
                    d.children = d._children;
                    d._children = null;
                }
                return d;
            }

            // Toggle children on click.

            function click(d) {
                d = toggleChildren(d);
                updateTree(d);
                centerNode(d);
            }

            // Call visit function to establish maxLabelLength
            visit(treeData, function(d) {
                totalNodes++;
        		var prevMaxLabelLength = maxLabelLength;
                maxLabelLength = Math.max(d.name.length, maxLabelLength);
        		
        		if(isNaN(maxLabelLength)){
        		   maxLabelLength = prevMaxLabelLength;
        		}

            }, function(d) {
                return d.children && d.children.length > 0 ? d.children : null;
            });
            
            function updateTree(source) {
                // Compute the new height, function counts total children of root node and sets tree height accordingly.
                // This prevents the layout looking squashed when new nodes are made visible or looking sparse when nodes are removed
                // This makes the layout more consistent.
                var levelWidth = [1];
                var childCount = function(level, n) {

                    if (n.children && n.children.length > 0) {
                        if (levelWidth.length <= level + 1) levelWidth.push(0);

                        levelWidth[level + 1] += n.children.length;
                        n.children.forEach(function(d) {
                            childCount(level + 1, d);
                        });
                    }
                };
                childCount(0, root);
                var newHeight = d3.max(levelWidth) * 50; // 25 pixels per line  
                tree = tree.size([newHeight, viewerWidth]);

                // Compute the new tree layout.
                var nodes = tree.nodes(root).reverse(),
                    links = tree.links(nodes);

                // Set widths between levels based on maxLabelLength.
                nodes.forEach(function(d) {
                    d.y = (d.depth * (maxLabelLength * 10)); //maxLabelLength * 10px
                    // alternatively to keep a fixed scale one can set a fixed depth per level
                    // Normalize for fixed-depth by commenting out below line
                     d.y = (d.depth * 250); //500px per level.
                });

                // Update the nodes…
                node = svgGroup.selectAll("g.node")
                    .data(nodes, function(d) {
                        return d.id || (d.id = ++i);
                    });

                // Enter any new nodes at the parent's previous position.
                var nodeEnter = node.enter().append("g")
                    .attr("class", "node")
                    .attr("transform", function(d) {
                        return "translate(" + source.y0 + "," + source.x0 + ")";
                    })
                    .on('click', click);

                nodeEnter.append("circle")
                    .attr('class', 'nodeCircle')
                    .attr("r", 0)
                    .style("fill", function(d) {
                        return d._children ? "lightsteelblue" : "#fff";
                    });

                nodeEnter.append("text")
                    .attr("x", function(d) {
                        return d.children || d._children ? -10 : 10;
                    })
                    .attr("dy", ".35em")
                    .attr('class', 'nodeText')
                    .attr("text-anchor", function(d) {
                        return d.children || d._children ? "end" : "start";
                    })
                    .text(function(d) {
                        return d.name;
                    })
                    .style("fill-opacity", 0);

                // phantom node to give us mouseover in a radius around it
                nodeEnter.append("circle")
                    .attr('class', 'ghostCircle')
                    .attr("r", 30)
                    .attr("opacity", 0.2) // change this to zero to hide the target area
                .style("fill", "red")
                    .attr('pointer-events', 'mouseover')
                    .on("mouseover", function(node) {
                        overCircle(node);
                    })
                    .on("mouseout", function(node) {
                        outCircle(node);
                    });

                // Update the text to reflect whether node has children or not.
                node.select('text')
                    .attr("x", function(d) {
                        return d.children || d._children ? -10 : 10;
                    })
                    .attr("text-anchor", function(d) {
                        return d.children || d._children ? "end" : "start";
                    })
                    .text(function(d) {
                        return d.name;
                    });

                // Change the circle fill depending on whether it has children and is collapsed
                node.select("circle.nodeCircle")
                    .attr("r", 4.5)
                    .style("fill", function(d) {
                        return d._children ? "lightsteelblue" : "#fff";
                    });

                // Transition nodes to their new position.
                var nodeUpdate = node.transition()
                    .duration(duration)
                    .attr("transform", function(d) {
                        return "translate(" + d.y + "," + d.x + ")";
                    });

                // Fade the text in
                nodeUpdate.select("text")
                    .style("fill-opacity", 1);

                // Transition exiting nodes to the parent's new position.
                var nodeExit = node.exit().transition()
                    .duration(duration)
                    .attr("transform", function(d) {
                        return "translate(" + source.y + "," + source.x + ")";
                    })
                    .remove();

                nodeExit.select("circle")
                    .attr("r", 0);

                nodeExit.select("text")
                    .style("fill-opacity", 0);

                // Update the links…
                var link = svgGroup.selectAll("path.link")
                    .data(links, function(d) {
                        return d.target.id;
                    });

                // Enter any new links at the parent's previous position.
                link.enter().insert("path", "g")
                    .attr("class", "link")
                    .attr("d", function(d) {
                        var o = {
                            x: source.x0,
                            y: source.y0
                        };
                        return diagonal({
                            source: o,
                            target: o
                        });
                    });

                // Transition links to their new position.
                link.transition()
                    .duration(duration)
                    .attr("d", diagonal);

                // Transition exiting nodes to the parent's new position.
                link.exit().transition()
                    .duration(duration)
                    .attr("d", function(d) {
                        var o = {
                            x: source.x,
                            y: source.y
                        };
                        return diagonal({
                            source: o,
                            target: o
                        });
                    })
                    .remove();

                // Stash the old positions for transition.
                nodes.forEach(function(d) {
                    d.x0 = d.x;
                    d.y0 = d.y;
                });
            }

            // Append a group which holds all nodes and which the zoom Listener can act upon.
            var svgGroup = baseSvg.append("g");

            // Define the root
            root = treeData;
            root.x0 = viewerHeight;
            root.y0 = 0;
        	
        	// Collapse all children of roots children before rendering.
        	root.children.forEach(function(child){
        		collapse(child);
        	});

            // Layout the tree initially and center on the root node.
            updateTree(root);
            centerNode(root);

        }
	});
});
