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

/**
 * 
 */

define(["dojo/_base/declare",
        "dojo/_base/array",
        "dojo/_base/lang",
        "dojo/_base/window",
        "dojo/dom-construct",
        "dojo/on",
        "dojo/query",
        "dojo/Deferred"], 

function(declare, array, lang, win, domConstruct, on, query, Deferred) {
	
	var resourceHelper = {
			
			_loadedFiles: [],
			
			resolveURL: function(url) {
				if ( /(http|https):\/\/.*/.test(url)) return url;
				// else
				var pkg = url.substring(0, url.indexOf("/"));
				var pkgLocation = require.toUrl(pkg);
				if ( pkgLocation.charAt(pkgLocation.length - 1) != '/' ) pkgLocation += "/";
				
				return pkgLocation + url.substring(1 + url.indexOf("/"));;
			},
			
			loadScript: function(url) {
				var def = new Deferred();
				
				var url = this.resolveURL(url);
				var found = query("script[src$=\"" + url + "\"]", win.doc.getElementsByTagName('head')[0]);
				if ( found.length != 0 ) {
					found.forEach(lang.hitch(this, function(linkNode) {
						if ( array.indexOf(this._loadedFiles, url) >= 0 ) {
							def.resolve(linkNode);
						} else {
							on(linkNode, "load", lang.hitch(this, function() {
								this._loadedFiles.push(url);
								def.resolve(linkNode);
							}));
						}
					}));
					return def;
				}
				var heads = win.doc.getElementsByTagName('head')[0].childNodes;
				
				var n = domConstruct.create("script", {
					src: url,
					type: "text/javascript",
				});
				
				
				
				on(n, "load", lang.hitch(this, function() {
					this._loadedFiles.push(url);
					def.resolve(n);
				}));

				domConstruct.place(n, win.doc.getElementsByTagName('head')[0]);
				return def;
			},
	
			loadCss: function(url) {
				var def = new Deferred();
				var url = this.resolveURL(url);
				var found = query("link[href$=\"" + url + "\"]", win.doc.getElementsByTagName('head')[0]);
				if ( found.length != 0 ) {
					found.forEach(lang.hitch(this, function(linkNode) {
						if ( array.indexOf(this._loadedFiles, url) >= 0 ) {
							def.resolve(linkNode);
						} else {
							on(linkNode, "load", lang.hitch(this, function() {
								this._loadedFiles.push(url);
								def.resolve(linkNode);
							}));
						}
					}));
					return def;
				}
				var heads = win.doc.getElementsByTagName('head')[0].childNodes;
				
				var i;
				var found = false;
				for(i = 0; i < heads.length && !found; i++) {
					var node = heads[i];
					found = node.nodeName == "LINK" && node.rel == "stylesheet";
				}
				
				
//				var baseSrc = heads[i-1].href;
//				baseSrc = baseSrc.match(/.*\/dojo-.*src\//);
//				var cssDocument = baseSrc + url;
				
				var n = domConstruct.create("link", {
					href: url,
					type: "text/css",
					rel: "stylesheet"
				});
				
				
				
				on(n, "load", lang.hitch(this, function() {
					this._loadedFiles.push(url);
					def.resolve(n);
				}));

				domConstruct.place(n, win.doc.getElementsByTagName('head')[0]);
				return def;
			}		
	};
	
	return resourceHelper;
});
