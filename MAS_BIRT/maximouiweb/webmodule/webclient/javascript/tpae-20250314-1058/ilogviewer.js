/*
 * Licensed Materials - Property of IBM
 * 
 * 5724-U18, 5737-M66
 * 
 * (C) COPYRIGHT IBM CORP. 2012,2024 All Rights Reserved.
 * 
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 *
 */

// these are set in the Control's JSP File, there are listed here for reference only
//	var ILOG_VIEWER_APPLET_DIV = "ilogviewerAppletDiv";	
//	var ILOG_VIEWER_APPLET_ID = "ilogViewerId"
//	var ILOG_VIEWER_LOADING_ID = "ilogviewer_loading"; 
//	var ILOG_VIEWER_TABLE = "ilogviewertable";

	var ilogViewerApplet = null;

	var myId = null;
	var myRequestURLBase = null;
	var myProjectId = null;
	var myUISessionId = null;
	var noOfAttempts = 0;
	var ATTEMPTS_TO_CHECK = 20;
	var SKDsizer;

	var fullScrenOn = false;
	
	var schedulerDivWidth = null;
	var schedulerDivHeight = null;
	var schedulerTop = null;
	var schedulerLeft = null;
	var schedulerZIndex = null;

	var origClientAreaInfoScrollTop = null;
	var origClientAreaInfoScrollLeft = null;
	var origClientAreaInfoPosition = null;
	var origClientAreaInfoOverflow = null;
	var origClientAreaInfoTop = null;
	var origClientAreaInfoLeft = null;

	
	function toggleFullScreenMode()
	{
		var viewerDIV = document.getElementById(ILOG_VIEWER_APPLET_DIV);

		var viewportwidth;
		var viewportheight;

		viewportwidth = dijit.getViewport().w;
		viewportheight = dijit.getViewport().h;
 
		if (fullScrenOn)
		{
			if(dojo.isIE)
			{
				// Need to adjust the client area due to fix of issue 12-10107
				// we make the client area 'full screen'
				// clientAreaId is a value that is made available by Maximo
				if (window.clientAreaId) 
				{
					var clientArea = document.getElementById(window.clientAreaId);
					if (clientArea) 
					{
						clientArea.style.top = origClientAreaInfoTop;
						clientArea.style.left = origClientAreaInfoLeft;
						clientArea.style.position = origClientAreaInfoPosition;
						clientArea.style.overflow = origClientAreaInfoOverflow;
	
						clientArea.scrollTop = origClientAreaInfoScrollTop;
						clientArea.scrollLeft = origClientAreaInfoScrollLeft;
					}
				}
			}

			// 110572 - use relative positioning so that the gantt view doesn't overflow screen width
			viewerDIV.style.position = 'relative';
			viewerDIV.style.width = '100%';
			viewerDIV.style.height = schedulerDivHeight;
			viewerDIV.style.top = schedulerTop;
			viewerDIV.style.left = schedulerLeft;
			viewerDIV.style.zIndex = schedulerZIndex;
			fullScrenOn = false;
		}
		else
		{
			if(dojo.isIE)
			{
				if(window.clientAreaId)
				{
					var clientArea = document.getElementById(window.clientAreaId);
					if(clientArea)
					{
						var position = (clientArea.style.position || "relative");
						var overflow =  (clientArea.style.overflow || "auto");
						
						origClientAreaInfoScrollTop = clientArea.scrollTop;
						origClientAreaInfoScrollLeft = clientArea.scrollLeft;
						origClientAreaInfoPosition = position;
						origClientAreaInfoOverflow = overflow;
						origClientAreaInfoTop = clientArea.style.top;
						origClientAreaInfoLeft = clientArea.style.left;
						
						clientArea.scrollTop = 0;
						clientArea.scrollLeft = 0;
						clientArea.style.width = viewportwidth + "px";
						clientArea.style.height = viewportheight + "px";
						clientArea.style.top = '0px';
						clientArea.style.left = '0px';
						clientArea.style.position = 'absolute';
						clientArea.style.overflow = 'hidden';
					 }
				 }
			 }
			 
			this.schedulerDivWidth = viewerDIV.style.width;
			this.schedulerDivHeight = viewerDIV.style.height;
			this.schedulerTop = viewerDIV.style.top;
			this.schedulerLeft = viewerDIV.style.left;
			this.schedulerZIndex = viewerDIV.style.zIndex;
			// 110572 - Vertical Scrollbar issue - need to set absolute positioning for fullscreen workaround
			viewerDIV.style.position = 'absolute';
			viewerDIV.style.width = '100%';
			viewerDIV.style.height = (viewportheight - 20) + "px";
			viewerDIV.style.top = '0px';
			viewerDIV.style.left = '0px';
			viewerDIV.style.zIndex = '1000';
			fullScrenOn = true;
		 }
		
		 makeViewerFullheight();
	}
	

	
	function selectApplet(id)
	{
		if(ilogViewerAppletAvailable(id))
		{	
			try
			{
				ilogViewerApplet.setActive();
				//fix issue 12-12659
				setButtonEnabled(saveButton, true); 
			}
			catch(error)
			{
			}
		}
	}

	
	function refreshApplet(id)
	{
		if(!ilogViewerAppletAvailable(id))
			return;

		if(ilogViewerApplet.readyState!="complete")
			return;

		sendEvent(ilogViewerApplet.id, "updateapplet", '');
	}
	
	function initProjectDataModel(id, projectId, clearState)
	{
		myId = id;
		myProjectId = projectId;
		
		noOfAttempts++;
		
		if(!ilogViewerAppletAvailable(id))
			return;

		try
		{
			if (clearState && ilogViewerApplet.clearState) ilogViewerApplet.clearState();
			ilogViewerApplet.initProjectDataModel(myProjectId);
			hideWait();
			noOfAttempts = 0;
		}
		catch (err)
		{
			var errMessage = err.message;
			if ((errMessage.indexOf("Exception") > 0) || (errMessage.indexOf("Error") > 0)) 
			{
				// Assume these are Java Exception or Error Messages.
				return;
			}

			if (noOfAttempts > ATTEMPTS_TO_CHECK)
			{
				alert("An exception occurred in the script. Error name: " + err.name + ". Error description: " + err.description + ". Error number: " + err.number + ". Error message: " + err.message);
				return;
			}
	
			setTimeout("initProjectDataModel(myId, myProjectId)", 2000);
		}
	}

	function setSKDServletURLBase(id, requestURLBase)
	{
		myId = id;
		myRequestURLBase = requestURLBase;
		noOfAttempts++;

		if(!ilogViewerAppletAvailable(id))
			return;

		try
		{
			ilogViewerApplet.setSKDServletURLBase(myRequestURLBase);
			noOfAttempts = 0;
		}
		catch (err)
		{
			var errMessage = err.message;
			if ((errMessage.indexOf("Exception") > 0) || (errMessage.indexOf("Error") > 0)) 
			{
				// Assume these are Java Exception or Error Messages.
				return;
			}

			if (noOfAttempts > ATTEMPTS_TO_CHECK)
			{
				alert("An exception occurred in the script. Error name: " + err.name + ". Error description: " + err.description + ". Error number: " + err.number + ". Error message: " + err.message);
				return;
			}

			setTimeout("setSKDServletURLBase(myId, myRequestURLBase)", 2000);
		}
	}
	
	function setUISessionId(id, uisessionId)
	{
		myId = id;
		myUISessionId = uisessionId;
		noOfAttempts++;

		if(!ilogViewerAppletAvailable(id))
			return;

		try
		{
			ilogViewerApplet.setUISessionId(uisessionId);
			noOfAttempts = 0;
		}
		catch (err)
		{
			var errMessage = err.message;
			if ((errMessage.indexOf("Exception") > 0) || (errMessage.indexOf("Error") > 0)) 
			{
				// Assume these are Java Exception or Error Messages.
				return;
			}

			if (noOfAttempts > ATTEMPTS_TO_CHECK)
			{
				alert("An exception occurred in the script. Error name: " + err.name + ". Error description: " + err.description + ". Error number: " + err.number + ". Error message: " + err.message);
				return;
			}

			setTimeout("setUISessionId(myId, myUISessionId)", 2000);
		}
	}
	
	function sendSKDAppletEvent(id, eventName, data, decode) 
	{
		if (decode==undefined) decode=true;
		myId = id;
		myEventName = eventName;
		myData=data;
		if(!ilogViewerAppletAvailable(id))
			return;
		try
		{
			ilogViewerApplet.handleAppletEvent(eventName, data, decode);
			noOfAttempts = 0;
		}
		catch (err)
		{
			var errMessage = err.message;
			if ((errMessage.indexOf("Exception") > 0) || (errMessage.indexOf("Error") > 0))
			{
				// Assume these are Java Exception or Error Messages.
				return;
			}

			if (noOfAttempts > ATTEMPTS_TO_CHECK)
			{
				alert("An exception occurred in the script. Error name: " + err.name + ". Error description: " + err.description + ". Error number: " + err.number + ". Error message: " + err.message);
				return;
			}

			setTimeout("sendSKDAppletEvent(myId,myEventName, myData,"+decode+")", 2000);
		}
	}
	
	function setSKDActivityQBE(id, skdActivityQBE)
	{
		myId = id;
		mySkdActivityQBE = skdActivityQBE;
		noOfAttempts++;

		if(!ilogViewerAppletAvailable(id))
			return;

		try
		{
			ilogViewerApplet.setSKDActivityQBE(skdActivityQBE);
			noOfAttempts = 0;
		}
		catch (err)
		{
			var errMessage = err.message;
			if ((errMessage.indexOf("Exception") > 0) || (errMessage.indexOf("Error") > 0))
			{
				// Assume these are Java Exception or Error Messages.
				return;
			}

			if (noOfAttempts > ATTEMPTS_TO_CHECK)
			{
				alert("An exception occurred in the script. Error name: " + err.name + ". Error description: " + err.description + ". Error number: " + err.number + ". Error message: " + err.message);
				return;
			}

			setTimeout("setSKDActivityQBE(myId, mySkdActivityQBE)", 2000);
		}
	}

	function setConstraintValues(id, newValues)
	{
		myId = id;
		myNewValues = newValues;
		noOfAttempts++;

		if(!ilogViewerAppletAvailable(id))
			return;

		try
		{
			ilogViewerApplet.editConstraint(newValues);
			noOfAttempts = 0;
		}
		catch (err)
		{
			var errMessage = err.message;
			if ((errMessage.indexOf("Exception") > 0) || (errMessage.indexOf("Error") > 0))
			{
				// Assume these are Java Exception or Error Messages.
				return;
			}

			if (noOfAttempts > ATTEMPTS_TO_CHECK)
			{
				alert("An exception occurred in the script. Error name: " + err.name + ". Error description: " + err.description + ". Error number: " + err.number + ". Error message: " + err.message);
				return;
			}

			setTimeout("setConstraintValues(myId, myNewValues)", 2000);
		}
	}

	function ilogViewerAppletAvailable(id)
	{
		ilogViewerApplet = document.getElementById(id);
		if (!ilogViewerApplet) {
			// applet hasn't been created it, so add the object node
			ilogHolder = document.getElementById(id + "_object_holder");
			if (ilogHolder) {
				ilogHolder.innerHTML = ILOG_APPLET_IMPL;
			}
		}
		
		ilogViewerApplet = document.getElementById(id);
		if(!ilogViewerApplet)
		{
			alert("Error: Test Applet not found! id = " + id);
			return false;
		}
		return true;
	}


	function adjustForFullScreen()
	{
		if (dojo.isIE)
		{
			// The following code is added as a fix to the following problem.
			// If the browser window is in restored state (i.e not fully maximized)
			// and if the full screen is on (i.e user clicked on our full screen button)
			// and the user after that used F11 of the browser to show the browser
			// in full screen mode, then the client area is still left with old
			// width and height and the applet only renders in a partial area
			// instead of the full visible area.
			// NOTE that this happens only in IE
			 var viewportwidth;
			 var viewportheight;

			 viewportwidth = dijit.getViewport().w;
			 viewportheight = dijit.getViewport().h;

			 if(fullScrenOn)
			 {
				 if(window.clientAreaId)
				 {
					 var clientArea = document.getElementById(window.clientAreaId);
					 if(clientArea)
					 {
						var position = (clientArea.style.position || "relative");
						var overflow =  (clientArea.style.overflow || "auto");
						
						clientArea.scrollTop = 0;
						clientArea.scrollLeft = 0;
						clientArea.style.width = viewportwidth + "px";
						clientArea.style.height = viewportheight + "px";
						clientArea.style.top = '0px';
						clientArea.style.left = '0px';
						clientArea.style.position = 'absolute';
						clientArea.style.overflow = 'hidden';
						
					 }
				 }
			 }
		}
	}
	

	function makeViewerFullheight()
	{
		adjustForFullScreen();
		
		var ilogViewerApplet = document.getElementById(ILOG_VIEWER_APPLET_ID);
		if(!ilogViewerApplet)
			return;
		var ilogViewerAppletControl = getControl(ilogViewerApplet);
		if(!ilogViewerAppletControl)
			return;
		var vs = dojo.window.getBox();
		var available = parseInt(vs.h) - parseInt(getTopPosition(ilogViewerAppletControl));

		// 97497 - resize out div to hold applet
		var viewerDIV = document.getElementById(ILOG_VIEWER_APPLET_DIV);
		viewerDIV.style.height=available+"px";
		
		ilogViewerApplet.height=available+"px";
		ilogViewerApplet.style.height=available+"px";
		// 12-13399
		ilogViewerApplet.width="100%";
		ilogViewerApplet.style.width="100%";
		
	}

	function refreshskdviewer(skdid,servletbase,uisessionid,projectid,skdtableid)
	{
		setSKDServletURLBase(skdid, servletbase);
		setUISessionId(skdid, uisessionid);
		initProjectDataModel(skdid, projectid);
		ilogViewerApplet = document.getElementById(skdid);
		ilogViewerAppletControl = getControl(ilogViewerApplet);
		if(ilogViewerAppletControl)
		{
			ilogViewerAppletControl.style.top=0 + "px";
			var el = document.getElementById(skdtableid);
			if(el)
			{
				el.width="100%";
				makeViewerFullheight(skdid);
			}
		}
		//fix issue 12-12659
		setButtonEnabled(saveButton, true); 
	}

	function skdviewerprojectchanged(skdid,servletbase,uisessionid,projectid,forceRefresh)
	{
		setSKDServletURLBase(skdid, servletbase);
		setUISessionId(skdid, uisessionid);
		initProjectDataModel(skdid, projectid, forceRefresh);
	}

	function _fixSchedulerOuterDivSize() {
		// 89862 - restore outer div size
		var ilogViewerAppletControl = getControl(ilogViewerApplet);
		if(!ilogViewerAppletControl)
			return;
		var vs = dojo.window.getBox();
		var available = parseInt(vs.h) - parseInt(getTopPosition(ilogViewerAppletControl));

		var viewerDIV = document.getElementById(ILOG_VIEWER_APPLET_DIV);
		viewerDIV.style.height=available+"px";
	}
	
	function showSchedulerLoading(loading) {
		// 89862 - restore outer div size
		_fixSchedulerOuterDivSize();
		
		var id = document.getElementById(ILOG_VIEWER_LOADING_ID);
		if (id!=null) {
			var skdViewerApplet = document.getElementById(ILOG_VIEWER_APPLET_ID);
			var skdViewerAppletControl = getControl(skdViewerApplet);
			if (skdViewerAppletControl) {
				if (loading) {
					// hide the applet, when we are loading
					makeSchedulerVisibile(false, ILOG_VIEWER_APPLET_ID);
					id.style.display="";
					skdViewerAppletControl._loading=true;
				} else {
					
					if (skdViewerAppletControl._loading==true) {
						// show applet when we are done loading
						makeSchedulerVisibile(true, ILOG_VIEWER_APPLET_ID);
					}
					
					_hideSchedulerLoading(skdViewerAppletControl);
				}
			}
		}
	}
	
	function _hideSchedulerLoading(appletControl) {
		var id = document.getElementById(ILOG_VIEWER_LOADING_ID);
		if (id!=null) {
			id.style.display="none";
		}
		if (appletControl) {
			appletControl._loading=false;
		}
	}
	
	function skdviewer_showObjs()
	{
		// showObjs is deprecated
		// 135901
	}
	
	function makeSchedulerVisibile(vis,id)
	{
		// force applet to be loaded
		if (vis) {
			ilogViewerAppletAvailable(id)
		
			// make sure it's visible
			skdviewer_showObjs();
		}
		
		// now make the applet visible
		var ilogViewerApplet = document.getElementById(id);
		var ilogViewerAppletControl = getControl(ilogViewerApplet);
		if(ilogViewerAppletControl)
		{
			var tbl = document.getElementById(ILOG_VIEWER_TABLE);
			if(vis)
			{
				// hide loading animation
				_hideSchedulerLoading(ilogViewerAppletControl);
				
				ilogViewerAppletControl.style.position="relative";
				ilogViewerAppletControl.style.top=0 + "px";
				if(tbl)
				{
					tbl.width="100%";
					window.setTimeout(makeViewerFullheight, 10);
				}
				ilogViewerApplet.tabIndex="0";
				if(!SKDsizer)
				{
					SKDsizer=dojo.connect(window, "resize", null, makeViewerFullheight);
				}
			}
			else
			{
				// hide loading, just in case
				_hideSchedulerLoading(ilogViewerAppletControl);
				
				// hide the html elements when we no longer are visible so that it doesn't consume whitespace
				// 12-12450
				if (dojo.isIE) {
					// we need to use absolute to ensure "space" isn't added to the visible screen in IE
					ilogViewerAppletControl.style.position="absolute";
				}
				ilogViewerAppletControl.style.top=-5000 + "px";
				if(tbl)
				{
					tbl.height=1;
					tbl.width=1;
				}
				ilogViewerApplet.tabIndex="-1";
				dojo.disconnect(SKDsizer);
				SKDsizer = undefined;
				
				// 89862 - shrink div to fix scrollbar issue in Chrome
				var viewerDIV = document.getElementById(ILOG_VIEWER_APPLET_DIV);
				viewerDIV.style.height="1px";
			}
		}
	}
	
	/**
	 * @returns
	 */
	function SKDInvokeUrl(url, reply_event_id, postData) {
		console.log("SKD Sending Async Request:" + url);
		var xhrArgs = {
		    url: url,
		    // At some point we may need to use sync=true,
		    // if we start using maximo xhr requests, since
		    // maximo xhr will block these requests, unless
		    // sync is true.  For now, we are not using
		    // maximo xhr in scheduler.
		    // sync: true,
		    handleAs: "text",
		    load: function(data){
		    	console.log("SKD Reply for " + url);
				// post our event to the Applet's EventBus for processing
		    	// don't auto decode the reply
				sendSKDAppletEvent(ILOG_VIEWER_APPLET_ID, reply_event_id, data, false);
		    },
		    error: function(error){
		    	console.log('SKD Reply Erorr for ' + url);
				sendSKDAppletEvent(ILOG_VIEWER_APPLET_ID, reply_event_id, null, false);
		    }
		};
		
		if (postData!=undefined) {
			console.log('POST: ' + postData);
			xhrArgs.postData = postData;
			xhrArgs.headers = {
			        'Content-Type': 'application/octet-stream' 
			};
		    // Call the asynchronous xhrPost
			dojo.xhrPost(xhrArgs);
		} else {
		    // Call the asynchronous xhrGet
			dojo.xhrGet(xhrArgs);
		}
		
	}
