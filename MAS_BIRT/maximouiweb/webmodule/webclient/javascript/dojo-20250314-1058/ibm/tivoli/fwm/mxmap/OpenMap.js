// wrapped by build app
define("ibm/tivoli/fwm/mxmap/OpenMap", ["dijit","dojo","dojox"], function(dijit,dojo,dojox){
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


function createMap(_openMapProvider, _openMapURL, _iniLat, _iniLng, _iniZoom, _componentId, _mapConf) {

	if (_openMapURL.endsWith('/')) {
		_openMapURL = _openMapURL.slice(0, _openMapURL.length - 1);
	}

	if (typeof _iniLat === 'string') {
		_iniLat = parseFloat(_iniLat);
	}

	if (typeof _iniLng === 'string') {
		_iniLng = parseFloat(_iniLng);
	}

	if (typeof _iniZoom === 'string') {
		_iniZoom = parseFloat(_iniZoom);
	}

	const LATLONGWKID = 4326;
	const isCoordinatesLatLong = _mapConf && _mapConf.isCoordinatesLatLong;
	const initialLocation = [_iniLng, _iniLat];
	
	const attributionControl = new ol.control.Attribution({
		collapsible: true
	});
		  
	const map = new ol.Map({
		view:  new ol.View({
			center: initialLocation,
			zoom: _iniZoom
		}),    
		target: _componentId + '_mapdiv',
		controls: ol.control.defaults({attribution: false}).extend([attributionControl])
	});

	if (isCoordinatesLatLong) {
		const initialLocationXY = convertLongLatCoordinatesToXY(initialLocation, getMapWKID());
		map.getView().setCenter(initialLocationXY);
	}
	  
	let baseMapLayer;
	const isVectorLayer = (_openMapURL.toLowerCase().indexOf("/vectortileserver") > -1);
		
	switch (_openMapProvider) {
		case "ARCGISOMAPS":
			if (isVectorLayer) {
				const projectionValue = ol.proj.get(_mapConf.baseMapEPSG);
				const tileGridOptions = {
					tileSize: 512
				};
				const extent = projectionValue.getExtent();
				if (extent) {
					tileGridOptions.extent = extent;
				}
				const tileGridValue = new ol.tilegrid.createXYZ(tileGridOptions);
				baseMapLayer = new ol.layer.VectorTile({
					source: new ol.source.VectorTile({
						url: _openMapURL + '/tile/{z}/{y}/{x}.pbf',
						format: new ol.format.MVT(),
						projection: projectionValue,
						tileGrid: tileGridValue,
						attributions:_mapConf.copyrightText
					}),
					declutter: true,
					visible: true
				});
				
				const openStreetMapVectorTileStyles = _openMapURL + '/resources/styles/';

				fetch(openStreetMapVectorTileStyles).then(function(response) {    
					response.json().then(function(glStyle) { 
						const newStyle =  Object.assign(glStyle, {
							"sprite": _openMapURL + "/resources/sprites/sprite",
							"glyphs": _openMapURL + "/resources/fonts/{fontstack}/{range}.pbf"
						})

						olms.applyStyle(baseMapLayer, newStyle, 'esri', {}, tileGridValue.getResolutions()); 
					})
				});
	
			} else {
				// tile ArcGIS REST API Layer
				baseMapLayer = new ol.layer.Tile({
					source: new ol.source.TileArcGISRest({
						url: _openMapURL,
						attributions: _mapConf.copyrightText
					}),
					visible: true
				})
			}
			break;
		case "OPENSTREETOMAPS":
			// Openstreet Map 
			baseMapLayer = new ol.layer.Tile({
				source: new ol.source.OSM({
					url: _openMapURL
				}),
				visible: true
			})
			break;
		default:
			console.info('Invalid OpenStreetMap provider');
			break;
	}

	// Base Layer Group
	const baseLayerGroup = new ol.layer.Group({
		layers: [baseMapLayer]
	})
	
	map.addLayer(baseLayerGroup);

	function updateMap (event) {
		const map = event.map;
		const extent = map.getView().calculateExtent(map.getSize());
		const minBoundary = ol.extent.getBottomLeft(extent);
		const maxBoundary = ol.extent.getTopRight(extent);
		const xmin = minBoundary[0];
		const ymin = minBoundary[1];
		const xmax = maxBoundary[0];
		const ymax = maxBoundary[1];
		const zoomvalue = Number.parseInt(map.getView().getZoom());
		const mapprojection = getMapWKID();
		const lng = map.getView().getCenter()[0];
		const lat = map.getView().getCenter()[1];

		return {
			'xmin': xmin,
			'ymin': ymin,
			'xmax': xmax,
			'ymax': ymax,
			'lng': lng,
			'lat': lat,
			'level': zoomvalue,
			'spatialReference': mapprojection
		};
	}

    map.on('moveend', (event) => {
		const locInfo = updateMap(event);

		if (isCoordinatesLatLong) {
			convertLocInfoToLatLong(locInfo);
		}
			
		const myEvent = new Event(
			"storeUserLocation",
			_componentId,
			locInfo,
			window.REQUESTTYPE_HIGHASYNC
		);
	
		window.queueManager.queueEvent(
			myEvent, 
			"application/json", 
			"json", 
			function() {},
			function() {
				console.error("failed to save user context.");
			}
		);
    });

	console.info("MXOPENMAP displayed");

	function getMapWKID() {
		return map.getView().getProjection().getCode();
	}

	function convertXYToLongLat(x, y, sourceWKID) {
		const longLatCoordinates = ol.proj.toLonLat([x, y], sourceWKID);
		
		return {
			x: longLatCoordinates[0],
			y: longLatCoordinates[1]
		};
	}

	function convertLongLatCoordinatesToXY(coordinates, targetWKID) {
		return ol.proj.fromLonLat(coordinates, targetWKID);
	}

	function convertLocInfoToLatLong(locInfo) {
		var mapWKID = getMapWKID();
	
		if (mapWKID === LATLONGWKID) {
			return;
		}

		function convertXYFieldsToLongLat(x, y) {
			if (locInfo[x] === undefined || locInfo[y] === undefined) {
				return;
			}

			var point = convertXYToLongLat(locInfo[x], locInfo[y], mapWKID);

			locInfo[x] = point.x;
			locInfo[y] = point.y;
		}

		convertXYFieldsToLongLat('lng', 'lat');
		convertXYFieldsToLongLat('xmin', 'ymin');
		convertXYFieldsToLongLat('xmax', 'ymax');
		locInfo.spatialReference = LATLONGWKID;
	}
}

});
