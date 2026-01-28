/* IBM Confidential
 *
 * OCO Source Materials
 *
 * 5724-U18, 5737-M66
 *
 * (C) COPYRIGHT IBM CORP. 2011,2024
 *
 * The source code for this program is not published or otherwise
 * divested of its trade secrets, irrespective of what has been
 * deposited with the U.S. Copyright Office.
 */


define(["dojo/main", "dijit/main", "dojo/_base/declare",
	"ibm/tivoli/fwm/mxmap/_Base"],
	function(dojo, dijit, declare, _Base) {
		/**
		 * Implements Maximo <-> Map JS framework communication. Currently using sendEvent
		 */
		return declare([_Base], {
			compId: null,
			constructor: function(params) {
				dojo.mixin(this, params);
				this.addSubscription("mxmap_onServerData_" + this.compId, dojo.hitch(this, function(data) {
					this.handleServer(data);
				}));
			},
			resetMaximoTimeout: function(fromServer) {
				try {
					console.log("timer from server:", fromServer);
					if (!fromServer) {
						fromServer = false;
					}
					resetLogoutTimer(fromServer);
					// reset timer
				} catch (e) {

				}
			},
			maximoRecordChanged: function(actionCurrentMbo) {
				var differentRecord = false;
				if (actionCurrentMbo) {
					var actionMboInfo = actionCurrentMbo.mxdata.mboInfo;
					var currentMboInfo = this.mapConf.currentMbo.mxdata.mboInfo;
					for (var key in actionMboInfo) {
						if (!actionMboInfo.hasOwnProperty(key))
							continue;
						var actionMboInfoValue = actionMboInfo[key];
						var currentMboInfoValue = currentMboInfo[key];
						if (currentMboInfoValue == null || currentMboInfoValue !== actionMboInfoValue) {
							differentRecord = true;
						}
					}
				}
				return differentRecord;
			},
			/**
			 * Handles actions from server
			 */
			handleServer: function(actions) {
				console.log("[Maximo Integration] Actions Received: ", actions);

				var action = null;
				try {
					this.resetMaximoTimeout(true);
					if (actions) {
						for (var id in actions) {
							action = actions[id];
							console.log("[Maximo Integration] Processing action: ", action);
							switch (action.action) {
								case "updatedCurrentRecordLocation":
									console.log("onCurrentRecordUpdate_" + this.compId);
									dojo.publish("onCurrentRecordUpdate_" + this.compId, [
										action.data.currentMbo
									]);
									break;
								case "updatedRecordSetLocation":
									if (action.data.currentMbo) {
										dojo.publish("onCurrentRecordUpdate_" + this.compId, [
											action.data.currentMbo
										]);
										if (this.mapConf.provider == "spatial") {
											if (this.maximoRecordChanged(action.data.currentMbo)) {
												dojo.publish("refreshMapListener", [
													action.data.currentMbo
												]);
											}
											dojo.publish("onSketchMboChange", [
												action.data.currentMbo
											]);
										}
										console.log("event was updatedRecordSetLocation");
									}
									dojo.publish("onCurrentRecordSetUpdated_" + this.compId, [
										action.data.records
									]);
									break;
								case "addRecordsToLayer":
									console.log('received records to add to layer', action);
									dojo.publish("addRecordsToLayer_" + this.compId, [
										action.layerName, action.data.records, action.cleanBeforeAdd
									]);
									break;
								case "removeRecordsFromLayer":
									console.log('received records to remove from layer', action);
									dojo.publish("removeRecordsFromLayer_" + this.compId, [
										action.layerName, action.data.records
									]);
									break;
								case "exception":
									dojo.publish("onServerException_" + this.compId, [
										action.data.failedAction
									]);
									console.warn("An exception was thrown from server", action.data);
									break;
								case "refreshroute":
									console.warn("refreshroute", action);
									dojo.publish("refreshroute_" + this.compId, [
										action.data
									]);

									break;
								case "refreshdatasource":
									console.warn("refreshdatasource", action);
									this.refreshDatasource(dojo.hitch(this, function(response) {
										this.handleServer(response);
									}), function() {
									});

									break;
								case "noop":
									sendEvent("NOOP", this.compId, '');

									break;

								default:

									dojo.publish(action.action + "_" + this.compId, [
										action.data
									]);
									break;
							}
						}
					}
				} catch (e) {
					if (action) {
						console.error("Failed executing server action: ", action, e);
					} else {
						console.error("Failed executing server actions: ", actions, e);
					}
				}
			},
			storeUserLocation: function(locationInfo) {
				var myEvent = new Event("storeUserLocation", this.compId, dojo.toJson(locationInfo),
					REQUESTTYPE_HIGHASYNC);
				queueManager.queueEvent(myEvent, "application/json", "json", function() {
				}, function() {
					console.error("failed to save user context.");
				});
			},
			getRouteStops: function(callback, erroCb, forceRefresh, serverCallback) {
				if (forceRefresh == null) {
					forceRefresh = false;
				}
				var normalReturn = function(data) {

					if (data.error) {
						erroCb(data);

					} else {
						if (data.forceUIRefresh == true) {
							data.hasRoute = false;// the NOOP would force the route to
							// be drawn again.
							console
								.info("the results bean is going to change and then will send another UI Refresh.");
							sendEvent("NOOP", this.compId, '');
						}
						callback(data);

					}

				};
				if (!serverCallback) {
					serverCallback = false;
				}
				var myEvent = new Event("getRouteStops", this.compId + "_router", {
					forceRefresh: forceRefresh,
					serverCallback: serverCallback
				}, REQUESTTYPE_HIGHASYNC);
				queueManager.queueEvent(myEvent, "application/json", "json", dojo.hitch(this, normalReturn),
					erroCb);
			},

			loadMapTipTemplate: function(mxdata, mapTipOverrides, successCallback, errorCallback) {
				var myEvent = new Event("loadMapTipTemplate", this.compId, {
					objectName: mxdata.mboName,
					objectId: mxdata.uid.value,
					mapTipOverrides: mapTipOverrides
				}, REQUESTTYPE_HIGHASYNC);
				queueManager.queueEvent(myEvent, "text/html", "text", successCallback, errorCallback);
			},

			loadMapTipSummaryTemplate: function(mxdata, mapTipOverrides, successCallback, errorCallback) {
				var myEvent = new Event("loadMapTipSummaryTemplate", this.compId, {
					objectName: mxdata.mboName,
					objectId: mxdata.uid.value,
					mapTipOverrides: mapTipOverrides
				}, REQUESTTYPE_HIGHASYNC);
				queueManager.queueEvent(myEvent, "text/html", "text", successCallback, errorCallback);
			},

			loadLinearLayerObjectAttributes: function(objectName, relationship, attributes, successCallback,
				errorCallback) {
				var myEvent = new Event("loadLinearLayerObjectAttributes", this.compId, {
					objectName: objectName,
					relationship: relationship,
					attributes: attributes
				}, REQUESTTYPE_HIGHASYNC);
				queueManager.queueEvent(myEvent, "application/json", "json", successCallback, errorCallback);
			},

			loadAttributesFromLinearAttributeTemplate: function(template, objectName, successCallback,
				errorCallback) {
				var myEvent = new Event("loadAttributesFromLinearAttributeTemplate", this.compId, {
					template: template,
					objectName: objectName,
				}, REQUESTTYPE_HIGHASYNC);
				queueManager.queueEvent(myEvent, "application/json", "json", successCallback, errorCallback);
			},

			loadMapTipItems: function(successCallback, errorCallback) {
				var myEvent = new Event("loadMenuItems", this.compId, "", REQUESTTYPE_HIGHASYNC);
				queueManager.queueEvent(myEvent, "application/json", "json", successCallback, errorCallback);

			},

			getLinearGraphicsbyWhereClause: function(whereClause, objectName, successCallback, errorCallback) {
				var params = {
					whereClause: whereClause,
					objectName: objectName
				};
				var myEvent = new Event("getLinearGraphicsbyWhereClause", this.compId, params,
					REQUESTTYPE_HIGHASYNC);
				queueManager.queueEvent(myEvent, "application/json", "json", successCallback, errorCallback);
			},
			/**
			 * Send the set current location on server record.
			 */
			setCurrentRecordLocation: function (location, status) {
				var params = {
					lat: location.lat,
					lng: location.lng,
					formattedaddress: location.address,
					status: status,
					sr: location.sr
				};
				console.log("Calling Maximo event with data: ", location);

				var myEvent = new Event("setCurrentSALocation", this.compId, params, REQUESTTYPE_SYNC);
				queueManager.queueEvent(myEvent, "text/xml", "xml", processXHR, function (err) {
					console.log("error", err);
				});
			},

			invokeAction: function(params, onSuccess, onError) {
				var event = new Event(
					"invokeAction", 
					"spatialmapdispatcher", 
					params, 
					REQUESTTYPE_HIGHASYNC
				);

				queueManager.queueEvent(
					event,
					"application/json",
					"json",
					onSuccess,
					onError
				);
			},

			unlinkFeature: function(feature, mapServiceUrl, functionSuccess) {
				var params = {
					"attributes": (feature.attributesFieldsName) ? feature.attributesFieldsName
						: feature.attributes,
					"mapServiceUrl": mapServiceUrl
				};

				var myEvent = new Event("unlinkFeature", "spatialmapdispatcher", params, REQUESTTYPE_HIGHASYNC);
				queueManager.queueEvent(myEvent, "application/json", "json", functionSuccess,
					function(err) {
						console.error("error", err);

					});
			},
			getArcGISQueryAttributesFromListTabLinkedMbos: function(functionSuccess) {
				var params = {};
				var myEvent = new Event("getArcGISQueryAttributesFromListTabLinkedMbos",
					"spatialmapdispatcher", params, REQUESTTYPE_HIGHASYNC);
				queueManager.queueEvent(myEvent, "application/json", "json", functionSuccess,
					function(err) {
						console.error("error", err);

					});
			},
			updateFieldValue: function(maximoReturnAttribute, maximoObjectFeature, functionSuccess) {
				var params = {
					maximoReturnAttribute: maximoReturnAttribute,
					maximoObjectFeatureAttributes: maximoObjectFeatureAttributes
				};

				sendEvent("updateFieldValue", "spatialmapdispatcher", JSON.stringify(params));
			},
			updateApplicationList: function(maximoFieldName, maximoFieldValues, functionSuccess) {
				var params = {
					maximoFieldName: maximoFieldName,
					maximoFieldValues: maximoFieldValues
				};

				sendEvent("updateApplicationList", "spatialmapdispatcher", JSON.stringify(params));
			},
			loadLinearSegments: function(linearLayers, functionSuccess) {
				var params = {
					linearLayers: []
				};
				for (var key in linearLayers) {
					// skip loop if the property is from prototype
					if (!linearLayers.hasOwnProperty(key))
						continue;

					var obj = linearLayers[key];
					console.log(obj);
					params.linearLayers.push({
						"linearLayer": obj
					});
				}

				var myEvent = new Event("loadLinearSegments", "spatialmapdispatcher", params,
					REQUESTTYPE_HIGHASYNC);
				queueManager.queueEvent(myEvent, "application/json", "json", functionSuccess,
					function(err) {
						console.error("error", err);
					});
			},
			updateApplicationListFromListView: function(maximoReturnAttribute, featuresAttributes,
				functionSuccess) {
				var params = {
					maximoReturnAttribute: maximoReturnAttribute,
					featuresAttributes: featuresAttributes
				};

				sendEvent("updateApplicationListFromListView", "spatialmapdispatcher", JSON.stringify(params));
			},
			updateCurrentMaximoRecord: function(feature, linkConfiguration) {
				var params = {
					"attributes": (feature.attributesFieldsName) ? feature.attributesFieldsName
						: feature.attributes,
					"linkConfiguration": linkConfiguration
				};

				sendEvent("updateCurrentMaximoRecord", "spatialmapdispatcher", JSON.stringify(params));
			},
			renderPage: function() {
				sendEvent("renderPage", "spatialmapdispatcher", null);
			},
			setAppToUpdateCurrentMaximoRecord: function(info) {
				sendEvent("setAppToUpdateCurrentMaximoRecord", "spatialmapdispatcher", JSON.stringify(info));
			},
			isFeatureLinkedToMultipleRecords: function(feature, currMbo, functionSuccess) {

				var params = {
					features: []
				};
				
				var attributes = currMbo.mxdata.attributes;
				feature.attributes.layerMapServerUrl = currMbo.layerInfoData[0].url;
				feature.attributes.layerName = attributes.layerName;
				feature.attributes.layerId = attributes.layerId;
				feature.attributes.layerGroup = attributes.layerGroup;

				if (feature.isLinearGraphic == undefined || feature.isLinearGraphic == null
					|| feature.isLinearGraphic == false) {
					params.features
						.push({
							"attributes": feature.attributes
						});
				}

				var myEvent = new Event("isFeatureLinkedToMultipleRecords", "spatialmapdispatcher", params,
					REQUESTTYPE_HIGHASYNC);
				queueManager.queueEvent(myEvent, "application/json", "json", functionSuccess,
					function(err) {
						console.error("error", err);

					});
			},
			updateGeometryData: function( esriGeometryJSON, functionSuccess){
				var params = {
					esriGeometryJSON: esriGeometryJSON,
				};
				var myEvent = new Event("updateGeometryData", "spatialmapdispatcher", params,
					REQUESTTYPE_HIGHASYNC);
				queueManager.queueEvent(myEvent, "application/json", "json", functionSuccess,
					function(err) {
						console.error("error", err);
					});
			},
			isFeatureLinked: function(featureArray, functionSuccess) {

				var params = {
					features: []
				};
				for (var i = 0; i < featureArray.length; i++) {
					var featureElement = featureArray[i];
					if (featureElement.isLinearGraphic == undefined || featureElement.isLinearGraphic == null
						|| featureElement.isLinearGraphic == false) {
						params.features
							.push({
								"attributes": (featureElement.attributesFieldsName) ? featureElement.attributesFieldsName
									: featureElement.attributes
							});
					}

				}

				var myEvent = new Event("isFeatureLinked", "spatialmapdispatcher", params,
					REQUESTTYPE_HIGHASYNC);
				queueManager.queueEvent(myEvent, "application/json", "json", functionSuccess,
					function(err) {
						console.error("error", err);

					});
			},
			getWhereClause: function(feature, functionSuccess, functionError) {
				var params = {
					attributes: (feature.attributesFieldsName) ? feature.attributesFieldsName
						: feature.attributes
				};
				var myEvent = new Event("getWhereClause", "spatialmapdispatcher", params,
					REQUESTTYPE_HIGHASYNC);
				queueManager.queueEvent(myEvent, "application/json", "json", functionSuccess, functionError);
			},
			checkFeatureToMaximo: function(feature, functionSuccess, functionError) {
				var params = {
					attributes: (feature.attributesFieldsName) ? feature.attributesFieldsName
						: feature.attributes
				};
				var myEvent = new Event("checkFeatureToLink", "spatialmapdispatcher", params,
					REQUESTTYPE_HIGHASYNC);
				queueManager.queueEvent(myEvent, "application/json", "json", functionSuccess, functionError);
			},
			updateMaximoObject: function(updatedfeature, originalFeature, functionSuccess) {
				var params = {
					updatedAttributes: (updatedfeature.attributesFieldsName) ? updatedfeature.attributesFieldsName
						: updatedfeature.attributes,
					originalAttributes: (originalFeature.attributesFieldsName) ? originalFeature.attributesFieldsName
						: originalFeature.attributes,
				};
				var myEvent = new Event("updateMaximoObject", "spatialmapdispatcher", params,
					REQUESTTYPE_HIGHASYNC);
				queueManager.queueEvent(myEvent, "application/json", "json", functionSuccess,
					function(err) {
						console.error("error", err);

					});
			},
			linkFeatureToMaximo: function(feature, esriGeometryJSON, unlinkFirstParam, currentFeatureClass,
				currentSystemRecord, currentWhereClauses, functionSuccess) {
				var params = {
					esriGeometryJSON: esriGeometryJSON,
					attributes: (feature.attributesFieldsName) ? feature.attributesFieldsName
						: feature.attributes,
					unlinkFirst: unlinkFirstParam,
					currentFeatureClass: currentFeatureClass,
					currentSystemRecord: currentSystemRecord,
					currentWhereClauses: currentWhereClauses
				};
				var myEvent = new Event("linkfeatureToMaximo", "spatialmapdispatcher", params,
					REQUESTTYPE_HIGHASYNC);
				queueManager.queueEvent(myEvent, "application/json", "json", functionSuccess,
					function(err) {
						console.error("error", err);

					});
			},
			createNewSDEMbo: function(layerName, layerId, layerGroup, editingObjectGeometryData,
				editingObjectGeometryInfo, geometryService, successFunction) {
				var params = {
					layerName: layerName,
					layerId: layerId,
					layerGroup: layerGroup,
					editingObjectGeometryData: editingObjectGeometryData,
					editingObjectGeometryInfo: editingObjectGeometryInfo,
					geometryService: geometryService
				};
				var myEvent = new Event("createNewSDEMbo", "spatialmapdispatcher", params,
					REQUESTTYPE_HIGHASYNC);
				queueManager.queueEvent(myEvent, "application/json", "json", successFunction,
					function(err) {
						console.error("error", err);

					});
			},
			updateSDEMbo: function(layerName, layerId, layerGroup, objectId, updateArray, successFunction) {
				var params = {
					layerName: layerName,
					layerId: layerId,
					layerGroup: layerGroup,
					objectId: objectId,
					updateArray: updateArray
				};
				var myEvent = new Event("updateSDEMbo", "spatialmapdispatcher", params, REQUESTTYPE_HIGHASYNC);
				queueManager.queueEvent(myEvent, "application/json", "json", successFunction,
					function(err) {
						console.error("error", err);

					});
			},
			deleteGISFeature: function(featureClass, idFieldName, idFieldValue, successFunction) {
				var params = {
					featureClass: featureClass,
					idFieldName: idFieldName,
					idFieldValue: idFieldValue
				};
				var myEvent = new Event("deleteGISFeature", "spatialmapdispatcher", params,
					REQUESTTYPE_HIGHASYNC);
				queueManager.queueEvent(myEvent, "application/json", "json", successFunction,
					function(err) {
						console.error("error", err);
					});
			},
			deleteLinearLayerSegmentObjects: function(objectName, relationship, attributes, successCallback,
				errorCallback) {
				var myEvent = new Event("deleteLinearLayerSegmentObjects", this.compId, {
					objectName: objectName,
					relationship: relationship,
					attributes: attributes
				}, REQUESTTYPE_HIGHASYNC);
				queueManager.queueEvent(myEvent, "application/json", "json", successCallback, errorCallback);
			},
			/**
			 * Save sketchs to maximo
			 */
			saveSketchToMaximo: function(graphicsArray, extent, functionSuccess) {

				var params = {
					arrayToBeSaved: graphicsArray,
					extent: extent
				};

				var myEvent = new Event("saveSketchToMaximo", "spatialmapdispatcher", params,
					REQUESTTYPE_HIGHASYNC);
				queueManager.queueEvent(myEvent, "application/json", "json", functionSuccess,
					function(err) {
						console.error(
							"Problem with Sketch Tool Function's save Graphics. queue Manager error.",
							err);
					});
			},

			/**
			 * Delete Sketch From Maximo
			 */
			deleteSketchFromMaximo: function(sketchID, functionSuccess) {

				var params = {
					sketchToBeDeleted: sketchID
				};

				var myEvent = new Event("deleteSketchFromMaximo", "spatialmapdispatcher", params,
					REQUESTTYPE_HIGHASYNC);
				queueManager.queueEvent(myEvent, "application/json", "json", functionSuccess,
					function(err) {
						console.error(
							"Problem with Sketch Tool Function's delete Sketchs. queue Manager error.",
							err);
					});
			},

			/**
			 * Load sketchs to maximo
			 */
			loadSketchFromMaximo: function(functionSuccess) {
				var params = {
					h: 1
				};

				var myEvent = new Event("loadSketchFromMaximo", "spatialmapdispatcher", params,
					REQUESTTYPE_HIGHASYNC);
				queueManager.queueEvent(myEvent, "application/json", "json", functionSuccess,
					function(err) {
						console.error(
							"Problem with Sketch Tool Function's load Graphics. queue Manager error.",
							err);
					});
			},

			/**
			 * Save the Tools Configuration, such as dialog position (x,y), dimension (width, height), open or
			 * not, and specific configuration for each tool.
			 */
			saveToolsConfiguration: function(toolsJson, functionSuccess) {
				var params = {
					toolsJson: toolsJson
				};

				var myEvent = new Event("saveToolsConfiguration", "spatialmapdispatcher", params,
					REQUESTTYPE_HIGHASYNC);
				queueManager
					.queueEvent(
						myEvent,
						"application/json",
						"json",
						functionSuccess,
						function(err) {
							console
								.error(
									"Problem with saveToolsConfiguration Function. queue Manager error.",
									err);
						});
			},

			/**
			 * Load the Tools Configuration, such as dialog position (x,y), dimension (width, height), open or
			 * not, and specific configuration for each tool.
			 */
			loadToolsConfiguration: function(functionSuccess) {
				var myEvent = new Event("loadToolsConfiguration", "spatialmapdispatcher", {},
					REQUESTTYPE_HIGHASYNC);
				queueManager
					.queueEvent(
						myEvent,
						"application/json",
						"json",
						functionSuccess,
						function(err) {
							console
								.error(
									"Problem with loadToolsConfiguration Function. queue Manager error.",
									err);
						});
			},

			/**
			 * Send Maximo event to display a Maxmsg.
			 * 
			 * @param msgGroup
			 * @param msgKey
			 * @param params
			 *            string[]
			 */
			showMessage: function(msgGroup, msgKey, params) {

				var myEvent = new Event("showMaxMessage", this.compId, {
					msgKey: msgKey,
					msgGroup: msgGroup,
					params: params
				}, REQUESTTYPE_SYNC);
				queueManager.queueEvent(myEvent, "text/xml", "xml", processXHR, function(err) {
					console.log("error", err);
				});
			},
			showMaximoDialog: function(dialogId, objectname, objectid, relationship) {
				addCommInput('dialogid', dialogId);
				if (objectname && objectid) {
					addCommInput('objectname', objectname);
					addCommInput('objectid', objectid);

				}
				if (relationship) {
					addCommInput('relationship', relationship);
				}
				dojo.publish("onDialogRequested_" + this.compId, []);
				sendEvent('showDialog', this.compId, '');
			},
			showQueryUnassignedWorkDialog: function(bounds) {
				//before showing Maximo Dialog, return the dojo mapping to Maximo Dojo
				if (this.mapConf.provider === "spatial") {
					document.__dojoToDomId = ibm.tivoli.fwm.mxmap.factory._dojoToDomId;
					require({ map: { "*": { dojo: "dojo", dijit: "dijit", dojox: "dojox" } } }, ["require"]);
				}
				if (bounds) {
					addCommInput('mapbounds_sw_latitudey', bounds.sw.lat);
					addCommInput('mapbounds_sw_longitudex', bounds.sw.lon);
					addCommInput('mapbounds_ne_latitudey', bounds.ne.lat);
					addCommInput('mapbounds_ne_longitudex', bounds.ne.lon);
				} else {
					console.warn("No bounds specified for query unassigned work");
				}
				this.showMaximoDialog('map_wo_query_unassigned_work', null, null);
			},
			showAuditLBSLocationDialog: function() {
				this.showMaximoDialog('map_labor_crew_query_location_history', null, null);
			},
			queryUnassignedWorkDispatcher: function(queryData, callback, errorCb) {
				if (queryData) {
					var myEvent = new Event("queryUnassignedWorkDispatcher", this.compId, queryData,
						REQUESTTYPE_HIGHASYNC);
					queueManager.queueEvent(myEvent, "application/json", "json", callback, errorCb);
				} else {
					console.warn("No queryData specified for query unassigned work");
				}
			},
			refreshQueryUnassignedWork: function(bounds, queryData, callback, errorCb) {
				if (bounds) {
					var params = {
						"bounds": bounds,
						"queryData": queryData
					};
					var myEvent = new Event("queryUnassignedWorkDispatcher", this.compId, params,
						REQUESTTYPE_HIGHASYNC);
					queueManager.queueEvent(myEvent, "application/json", "json", callback, errorCb);
				} else {
					console.warn("No bounds specified for query unassigned work");
				}
			},
			getCrewLaborByQueryParams: function(callback, erroCb, queryParams) {

				var myEvent = new Event("getCrewLaborByQueryParams", this.compId, queryParams,
					REQUESTTYPE_HIGHASYNC);
				queueManager.queueEvent(myEvent, "application/json", "json", callback, erroCb);
			},
			getWeatherAlertsByQueryParams: function(callback, erroCb, queryParams) {

				var myEvent = new Event("getWeatherAlertsByQueryParams", this.compId, queryParams,
					REQUESTTYPE_HIGHASYNC);
				queueManager.queueEvent(myEvent, "application/json", "json", callback, erroCb);
			},

			_refreshDSRunning: false,
			refreshDatasource: function(callback, errorcb) {
				if (this._refreshDSRunning == true) {
					console.log("refresh datasouce is already taking place.");
					return;
				}
				var onSuccess = function(response) {
					console.log("[Maximo Integration] Refreshing Map: ", response);
					callback(response);
					if ((response != null) && (response != undefined)) {
						/* 12-13622 */
						if (response.action.data.error) {
							this.showMessage(response.action.data.error.group, response.action.data.error.key,
								[
									response.action.data.error.params
								]);
						}
					}
					this._refreshDSRunning = false;
				};
				var onError = function() {
					console.error("Failed to refresh marker position");
					errorcb();
					this._refreshDSRunning = false;
				};
				var myEvent = new Event("refreshMarkersPositions", this.compId, {}, REQUESTTYPE_HIGHASYNC);
				queueManager.queueEvent(myEvent, "application/json", "json", dojo.hitch(this, onSuccess),
					dojo.hitch(this, onError));
			},
			loadSymbologyConfigFile: function(successCallback, errorCallback) {
				var myEvent = new Event("loadSymbologyConfig", this.compId, "", REQUESTTYPE_HIGHASYNC);
				queueManager.queueEvent(myEvent, "application/json", "json", successCallback, errorCallback);
			},
			refreshLinearLayers: function(mapMeasureUnit, successCallback, errorCallback) {
				var params = {
					"mapMeasureUnit": mapMeasureUnit
				};
				var myEvent = new Event("refreshLinearLayers", this.compId, params, REQUESTTYPE_HIGHASYNC);
				queueManager.queueEvent(myEvent, "application/json", "json", successCallback, errorCallback);
			},
			getAutoLocateLabel: function(successCallback) {
				var params = {};
				var myEvent = new Event("getAutoLocateLabel", "spatialmapdispatcher", params,
					REQUESTTYPE_HIGHASYNC);
				queueManager
					.queueEvent(
						myEvent,
						"application/json",
						"json",
						successCallback,
						function(err) {
							console
								.error(
									"Problem with autolocate label function. queue Manager error.",
									err);
						});
			},
			isCurrentMboAddressable: function(callback, erroCb) {
				var myEvent = new Event("isCurrentMboAddressable", this.compId, {}, REQUESTTYPE_HIGHASYNC);
				queueManager.queueEvent(myEvent, "application/json", "json", callback, erroCb);
			},
			isMboFormattedAddressEditable: function(callback, erroCb) {
				var myEvent = new Event("isMboFormattedAddressEditable", this.compId, {}, REQUESTTYPE_HIGHASYNC);
				queueManager.queueEvent(myEvent, "application/json", "json", callback, erroCb);
			},
			unlinkOrphanMaximoRecord: function(systemOfRecord, featureClass, callback, erroCb) {
				var params = {
					systemOfRecord: systemOfRecord,
					featureClass: featureClass
				};
				var myEvent = new Event("unlinkOrphanMaximoRecord", "spatialmapdispatcher", params,
					REQUESTTYPE_HIGHASYNC);
				queueManager.queueEvent(myEvent, "application/json", "json", callback, erroCb);
			},
			generateUpdatedLayerDefinition: function(mapServiceName, layerIds, callback, erroCb) {
				var params = {
					mapServiceName: mapServiceName,
					layerIds: layerIds
				};
				var myEvent = new Event("generateUpdatedLayerDefinition", "spatialmapdispatcher", params,
					REQUESTTYPE_HIGHASYNC);
				queueManager.queueEvent(myEvent, "application/json", "json", callback, erroCb);
			},
			/**
			 * Send request to Maximo for getting MultiAssetLocCI records
			 * 
			 * @param {*} callback 
			 * @param {*} erroCb 
			 */
			getWOMultiAssetLocCIRecords: function(callback, erroCb) {
				var myEvent = new Event( "getWOMultiAssetLocCIRecords", "spatialmapdispatcher", {},
						REQUESTTYPE_HIGHASYNC );
				queueManager.queueEvent( myEvent, "application/json", "json", callback, erroCb);
			},
			/**
			 *  Send request to Maximo for getting Task records
			 * @param {*} callback 
			 * @param {*} erroCb 
			 */
			getWORelatedTasks: function(callback, erroCb) {
				var myEvent = new Event( "getWOTaskRecords", "spatialmapdispatcher", {},
						REQUESTTYPE_HIGHASYNC );
				queueManager.queueEvent( myEvent, "application/json", "json", callback, erroCb);
			}
		});
	});
