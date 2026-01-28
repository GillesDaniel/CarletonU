/*
 * Licensed Materials - Property of IBM
 * "Restricted Materials of IBM"
 *
 * 5725-M39, 5724-U18, 5737-M66
 *
 * (C) COPYRIGHT IBM CORP. 2013,2024 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 *
 */

define("ibm/tivoli/fwm/mxmap/security/ValidateUrlToken", [
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/request",
	"dojo/Deferred"
	],
	function(declare, lang, request, Deferred) {
	var esriServices = [
		"MapServer",
		"GPServer",
		"GeocodeServer",
		"FeatureServer",
		"ImageServer",
		"NAServer",
		"GeometryServer",
		"MobileServer",
		"GeoDataServer",
		"GlobeServer",
		"VectorTileServer"
		];

	return declare( null, {

		_TAG: "ibm/tivoli/fwm/mxmap/security/ValidateUrlToken.js",
		tokenInfoObject: null,
		alreadyCheckedToNeedToken: [],

		constructor: function(/*Object*/ options){
			console.debug(this._TAG + ", **** In ValidateUrlToken.js Constructor");
			lang.mixin(this, options);
			if (this.mapConf != null && this.mapstraction == null){
				this.mapConfForSecurity = this.mapConf;
			} else if (this.mapstraction != null && this.mapstraction.mapConf != null ){
				this.mapConfForSecurity = this.mapstraction.mapConf;
			}
		},

		chkTokenSecurity: function(url) {
			thisobj = this;
			var urlServiceType = this.getUrlServiceType(url);
			var queryParameters = {urlService:url, siteID:thisobj.mapConfForSecurity.SPATIAL.mapInfo.siteID, thisTokenIsFor:urlServiceType};
			if (this.mapConfForSecurity.isInMapManager ) {
				queryParameters["mapName"] = thisobj.mapConfForSecurity.SPATIAL.mapInfo.mapName;
			}

			return request.get(dojo.config.fwm.ctxRoot+"/webclient/pluss/token.jsp", {
				query:queryParameters,
				sync: true,
				handleAs: "text",
				preventCache: true
			}).then(function(data){
				thisobj.tokenInfoObject = dojo.fromJson(dojo.string.trim(data));
				if (thisobj.tokenInfoObject.tokenValue !== ""){
					console.log("token: " +  thisobj.tokenInfoObject.tokenValue + " that will be used with: " + url );
				}else {
					console.log("token is NOT used with: " + url );
				}
				return thisobj.tokenInfoObject;
			}, function(error){
				console.error('couldNotgetToken'); /*just ignore*/
				return thisobj.tokenInfoObject;
			});
		},

		getUrlService: function(url){
			if(url){
				var urlService = this.removeProxyIfExists(url);
				var questionMarkIndex = urlService.indexOf("?");
				if (questionMarkIndex != -1) {
					urlService = urlService.substring(0, questionMarkIndex);
				}

				for (var i = 0; i < esriServices.length; i++) {
					if (urlService.indexOf(esriServices[i]) != -1) {
						urlService = urlService.substring(0, urlService.indexOf(esriServices[i])) + esriServices[i];
						return urlService;
					}
				}
			}

			console.debug("In getUrlService(url) is returning a NULL, should only happen during OAuth 2.0 Authentication!! url: " + urlService);
			return null;
		},

		getUrlServiceType: function(urlService){
			if (urlService != null) {
				for (var i = 0; i < esriServices.length; i++) {
					if (urlService.indexOf(esriServices[i]) != -1) {
						return esriServices[i];
					}
				}
			}

			console.debug("In getUrlServiceType(urlService) is returning a NULL, should only happen during OAuth 2.0 Authentication!! for Web Map URL Type ");
			return null;
		},

		getTokenInfo: function (that, url){
			url = this.removeProxyIfExists(url);
			var urlService = this.getUrlService(url);
			if (urlService == null){
				urlService = url;
			}
			var mapName = this.mapConfForSecurity.SPATIAL.mapInfo.mapName;
			var tokenData = this.mapConfForSecurity.SPATIAL;
			var nonSecureTimeLife = this.mapConfForSecurity.SPATIAL.nonSecureTimeLife;
			var urlKey = urlService + "-" + mapName;
			var tokenValue = "";

			if (tokenData.mapServiceTokenInfo[urlKey] != null) {
				if (tokenData.mapServiceTokenInfo[urlKey].urlTokenSecure) {
					var date = new Date();
					var currentClientTimeMSec = date.getTime();
					var tokenExpiretime = tokenData.mapServiceTokenInfo[urlKey].tokenExpiretime;
					if ((currentClientTimeMSec + this.mapConfForSecurity.SPATIAL.tokenExpireResetLimit) > tokenExpiretime){
						var tokenInfoObject;
						this.chkTokenSecurity(url).then(function(tio){
							tokenInfoObject = tio;
						});
						if (tokenInfoObject.tokenValue != "") {
							tokenValue = tokenInfoObject.tokenValue;
							var NewTokenExpiretime =  currentClientTimeMSec + tokenInfoObject.tokenLife - (60 * 1000 * 1);

							tokenData.mapServiceTokenInfo[urlKey].tokenExpiretime = NewTokenExpiretime;
							tokenData.mapServiceTokenInfo[urlKey].tokenValue = tokenValue;
							tokenData.mapServiceTokenInfo[urlKey].tokenLife = tokenInfoObject.tokenLife;
							tokenData.mapServiceTokenInfo[urlKey].urlTokenSecure = true;
							tokenData.mapServiceTokenInfo[urlKey].userID = tokenInfoObject.userID;
						} else {
							var newNonSecureCheckTimer =  currentClientTimeMSec + nonSecureTimeLife;

							tokenData.mapServiceTokenInfo[urlKey].tokenLife = nonSecureTimeLife;
							tokenData.mapServiceTokenInfo[urlKey].urlTokenSecure = false;
							tokenData.mapServiceTokenInfo[urlKey].tokenExpiretime = newNonSecureCheckTimer;
							tokenData.mapServiceTokenInfo[urlKey].tokenValue = "";
							tokenData.mapServiceTokenInfo[urlKey].userID = "";
						}
					} else {
						if (tokenData.mapServiceTokenInfo[urlKey].urlTokenSecure){
							tokenValue = tokenData.mapServiceTokenInfo[urlKey].tokenValue;
						}
					}
				}
			} else {
				if (tokenData.mapServiceTokenError[urlKey] != null) {
					var error = tokenData.mapServiceTokenError[urlKey];
					throw {"message": error.message};
				} else {
					var date = new Date();
					var currentClientTimeMSec = date.getTime();
					var tokenInfoObject;
					this.chkTokenSecurity(url).then(function(tio){
						tokenInfoObject = tio;
					});
					var addUrl = new Object();
					if (tokenInfoObject.tokenValue != "") {
						tokenValue = tokenInfoObject.tokenValue;
						var NewTokenExpiretime =  currentClientTimeMSec + tokenInfoObject.tokenLife - (60 * 1000 * 1);

						addUrl.tokenExpiretime = NewTokenExpiretime;
						addUrl.tokenValue = tokenValue;
						addUrl.tokenLife = tokenInfoObject.tokenLife;
						addUrl.urlTokenSecure = true;
						addUrl.userID = tokenInfoObject.userID;
						tokenData.mapServiceTokenInfo[urlKey] = addUrl;

					} else {
						var newNonSecureCheckTimer =  currentClientTimeMSec + nonSecureTimeLife;

						addUrl.tokenExpiretime = newNonSecureCheckTimer;
						addUrl.tokenValue = "";
						addUrl.userID = "";
						addUrl.tokenLife = nonSecureTimeLife;
						addUrl.urlTokenSecure = false;
						tokenData.mapServiceTokenInfo[urlKey] = addUrl;
					}
				}
			}
			return tokenValue;
		},

		removeTokenParameterIfExists: function(url) {
			var proxyDirRef = this.returnProxyDirRefIfExists(url);
			url = this.removeProxyIfExists(url);

			if (url.indexOf("?")==-1) {
				return url; // without proxy.jsp directory reference
			}

			var rtn = url.split("?")[0];
			var param;
			var params_arr = [];
			var queryString = (url.indexOf("?") !== -1) ? url.split("?")[1] : "";
			if (queryString !== "") {
				params_arr = queryString.split("&");
				for (var i = params_arr.length - 1; i >= 0; i -= 1) {
					param = params_arr[i].split("=")[0];
					if (param === "token") {
						params_arr.splice(i, 1);
					}
				}
				if (params_arr.length > 0) {
					rtn = rtn + "?" + params_arr.join("&");
				}
			}

			if (proxyDirRef != null) {
				rtn = proxyDirRef + rtn;
			}
			return rtn;
		},

		removeProxyIfExists: function(url) {
			if (url.indexOf("proxy.jsp?")==-1) {
				return url;
			}

			//somewhere in ArcGIS source is implementing proxy.jsp url twice in the main url for each tilemaps... we catch it here
			var rtn = url.split("proxy.jsp?")[url.split("proxy.jsp?").length - 1];
			return rtn;
		},

		returnProxyDirRefIfExists: function(url) {
			if (url.indexOf("proxy.jsp?")==-1) {
				return null;
			}
			var rtn = url.split("proxy.jsp?")[0] + "proxy.jsp?";
			return rtn;
		},

		addProxyDirToUrlIfNeeded: function(url) {
			if (esriConfig.defaults.io.alwaysUseProxy) {
				if (url.indexOf("proxy.jsp?")==-1) {
					url = esriConfig.defaults.io.proxyUrl + "?" + url;
				}
			}
			return url;
		},

		getTokenValueForWebCreate: function (url) {
			var tokenValue = "";

			if (this.mapConfForSecurity.SPATIAL.webMap.OAuthEnabledForWebMap && this.mapConfForSecurity.SPATIAL.webMap.webMapDefined) {
				var wbmapUrl = "https://www.arcgis.com/sharing/content/items/" + this.mapConfForSecurity.SPATIAL.webMap.webMapID + "/data";
				if (this.mapConfForSecurity.SPATIAL.webMap.arcGISPortalEnabled) {
					wbmapUrl = this.mapConfForSecurity.SPATIAL.webMap.PORTALURL + "/" + this.mapConfForSecurity.SPATIAL.webMap.webMapID + "/data";
				}

//				var isTokenNeeded = this.getTokenInfo(this, url);
				var isTokenNeeded = this.checkIfTokenNeeded(url);

				var webTokenValue = this.getTokenInfo(this, wbmapUrl);

				if (webTokenValue != "" && isTokenNeeded) {
					tokenValue = webTokenValue;
				}
			}

			return tokenValue;
		},

		addTokenIfApplicable: function (url) {
			
			if (this.mapConfForSecurity.SPATIAL.tokenAuthSecurityEnabled) {
				var tokenValue = "";
				var isTokenNeeded = this.checkIfTokenNeeded(this.removeTokenParameterIfExists(url));

				if (isTokenNeeded) {
					tokenValue = this.getTokenInfo(this, url);
					var proxyDirRef = this.returnProxyDirRefIfExists(url);
					url = this.removeTokenParameterIfExists(url);
					if (tokenValue != "") {
						url = this.removeProxyIfExists(url);

						url = url + (url.indexOf("?") > -1 ? "&token=" : "?token=") + tokenValue;

						if (proxyDirRef != null && this.getUrlServiceType(url) != null) {
							url = proxyDirRef + url;
							if (url.indexOf("f=json") == -1 && url.indexOf("f=pjson") == -1) {
								url = url + "&f=pjson"
							}
						}

						return url;
					}
				}
			}
			return url;
		},

		initTokenExpiretime: function(mapConf) {
			for (var msti in mapConf.SPATIAL.mapServiceTokenInfo) {
				// Adjust token time (server) left with client's time

				var date = new Date();
				var timeMSec = date.getTime();

				console.debug("URL: " +  msti);
				console.debug("Client's Time in msec: " +  timeMSec);
				console.debug("serverTime Time in msec: " +  mapConf.SPATIAL.mapServiceTokenInfo[msti].serverTime);

				// token time life left when retrieved from server
				var tokenLife = mapConf.SPATIAL.mapServiceTokenInfo[msti].tokenLife;

				// subtract about 30 seconds for deviation in tokenExpiretime
				// tokenExpiretime: calculated token expired time on clientside
				var tokenExpiretime =  timeMSec + tokenLife - (60 * 1000 * 0.5);

				mapConf.SPATIAL.mapServiceTokenInfo[msti].tokenExpiretime = tokenExpiretime;
			}
		},

		checkIfTokenNeeded: function(url) {
			var urlService = this.getUrlService(url);
			if (urlService == null) {
				urlService = url;
			}

			var thisObj = this;

			// IJ44163 - making sure the token check uses the proxy url if enabled
			url = this.addProxyDirToUrlIfNeeded(url);

			var args = {
					callbackParamName: "callback",
					content: {
						f: "json"
					},
					sync: true,
					handleAs: "json",
					headers: {
						"X-Requested-With": null
					},
					timeout: 60000,
					url: url,
					load: function (data) {
						if (data != null && data.error != null) {
							console.debug("Token is assumed to be needed for url: " + url);
							thisObj.alreadyCheckedToNeedToken[urlService] = true;
						} else {
							thisObj.alreadyCheckedToNeedToken[urlService] = false;
						}
					},
					error: function (e, f) {
						console.error("ERROR happened while checking for the need to have token for url: " + url);
					}
			};

			// reduce request to system if we already asked it before during the current instance
			if (this.alreadyCheckedToNeedToken == null || this.alreadyCheckedToNeedToken[urlService] == null) {
				if (url.indexOf("tilemap") > -1 || url.indexOf("attribution") > -1) {
					dojo.xhr("GET", args);
				} else {
					dojo.xhr("POST", args);
				}
			}

			return this.alreadyCheckedToNeedToken[urlService];
		}
	});
});
