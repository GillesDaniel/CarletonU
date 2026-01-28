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



define("ibm/tivoli/fwm/mxmap/_Polyline", ["dojo/_base/declare"], 
		function(declare) {
	return declare(null, {
		api: null,
		points: null,
		attributes: [],
		onmap: false,
		proprietary_polyline: false,

		/**
		 * Instantiates a new Polyline.
		 * 
		 * @name mxn.Polyline
		 * @constructor
		 * @param {Point[]}
		 *            points Points that make up the Polyline.
		 * @exports Polyline as mxn.Polyline
		 */
		constructor: function(params)
		{
			dojo.mixin(this, params);
			this.pllID = "mspll-" + new Date().getTime() + '-' + (Math.floor(Math.random() * Math.pow(2, 16)));
		},

		/**
		 * Retrieve the settings from a proprietary polyline.
		 * 
		 * @name mxn.Polyline#fromProprietary
		 * @function
		 * @param {String}
		 *            apiId The API ID of the proprietary polyline.
		 * @param {Object}
		 *            polyline The proprietary polyline.
		 */
		fromProprietary: function()
		{
			console.error("Method " + arguments.callee.nom + " be implemented by the derived class");
		},

		/**
		 * Hide the polyline.
		 * 
		 * @name mxn.Polyline#hide
		 * @function
		 */
		hide: function()
		{
			console.error("Method " + arguments.callee.nom + " be implemented by the derived class");
		},

		/**
		 * Show the polyline.
		 * 
		 * @name mxn.Polyline#show
		 * @function
		 */
		show: function()
		{
			console.error("Method " + arguments.callee.nom + " be implemented by the derived class");
		},

		/**
		 * Converts the current Polyline to a proprietary one for the API specified
		 * by apiId.
		 * 
		 * @name mxn.Polyline#toProprietary
		 * @function
		 * @param {String}
		 *            apiId The API ID of the proprietary polyline.
		 * @returns A proprietary polyline.
		 */
		toProprietary: function()
		{
			console.error("Method " + arguments.callee.nom + " be implemented by the derived class");
		},

		/**
		 * Updates the Polyline with the path of the attached proprietary polyline
		 * on the map.
		 * 
		 * @name mxn.Polyline#update
		 * @function
		 */
		update: function()
		{
			console.error("Method " + arguments.callee.nom + " be implemented by the derived class");
		},

		/**
		 * addData conviniently set a hash of options on a polyline
		 * 
		 * @param {Object}
		 *            options An object literal hash of key value pairs. Keys are:
		 *            color, width, opacity, closed, fillColor, borderOpacity.
		 */
		addData: function(options)
		{
			for ( var sOpt in options)
			{
				if (options.hasOwnProperty(sOpt))
				{
					switch (sOpt)
					{
					case 'color':
						this.setColor(options.color);
						break;
					case 'width':
						this.setWidth(options.width);
						break;
					case 'opacity':
						this.setOpacity(options.opacity);
						break;
					case 'closed':
						this.setClosed(options.closed);
						break;
					case 'fillColor':
						this.setFillColor(options.fillColor);
						break;
					case 'borderOpacity':
						this.setBorderOpacity(options.borderOpacity);
						break;
					default:
						this.setAttribute(sOpt, options[sOpt]);
					break;
					}
				}
			}
		},

		setChild: function(some_proprietary_polyline)
		{
			this.proprietary_polyline = some_proprietary_polyline;
			this.onmap = true;
		},

		/**
		 * in the form: #RRGGBB Note map24 insists on upper case, so we convert it.
		 */
		setColor: function(color)
		{
			this.color = (color.length == 7 && color[0] == "#") ? color.toUpperCase() : color;
		},

		/**
		 * Stroke width of the polyline
		 * 
		 * @param {Integer}
		 *            width
		 */
		setWidth: function(width)
		{
			this.width = width;
		},

		/**
		 * A float between 0.0 and 1.0
		 * 
		 * @param {Float}
		 *            opacity
		 */
		setOpacity: function(opacity)
		{
			this.opacity = opacity;
		},

		/**
		 * Marks the polyline as a closed polygon
		 * 
		 * @param {Boolean}
		 *            bClosed
		 */
		setClosed: function(bClosed)
		{
			this.closed = bClosed;
		},

		/**
		 * Fill color for a closed polyline as HTML color value e.g. #RRGGBB
		 * 
		 * @param {String}
		 *            sFillColor HTML color value #RRGGBB
		 */
		setFillColor: function(sFillColor)
		{
			this.fillColor = sFillColor;
		},

		/**
		 * A float between 0.0 and 1.0
		 * 
		 * @param {Float}
		 *            opacity
		 */
		setBorderOpacity: function(borderOpacity)
		{
			this.borderOpacity = borderOpacity;
		},

		/**
		 * Set an arbitrary key/value pair on a polyline
		 * 
		 * @param {String}
		 *            key
		 * @param value
		 */
		setAttribute: function(key, value)
		{
			this.attributes[key] = value;
		},

		/**
		 * Gets the value of "key"
		 * 
		 * @param {String}
		 *            key
		 * @returns value
		 */
		getAttribute: function(key)
		{
			return this.attributes[key];
		},

		/**
		 * Simplifies a polyline, averaging and reducing the points
		 * 
		 * @param {Number}
		 *            tolerance (1.0 is a good starting point)
		 */
		simplify: function(tolerance)
		{
			var reduced = [];

			// First point
			reduced[0] = this.points[0];

			var markerPoint = 0;

			for ( var i = 1; i < this.points.length - 1; i++)
			{
				if (this.points[i].distance(this.points[markerPoint]) >= tolerance)
				{
					reduced[reduced.length] = this.points[i];
					markerPoint = i;
				}
			}

			// Last point
			reduced[reduced.length] = this.points[this.points.length - 1];

			// Revert
			this.points = reduced;
		}

	});
});
