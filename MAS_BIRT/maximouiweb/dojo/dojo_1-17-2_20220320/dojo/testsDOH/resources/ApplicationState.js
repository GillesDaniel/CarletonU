/*
 * Licensed Materials - Property of IBM
 *
 * 5724-U18, 5737-M66
 *
 * (C) Copyright IBM Corp. 2023,2024 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */

/*
ApplicationState is an object that represents the application state.
It will be given to dojo.undo.browser to represent the current application state.
*/
ApplicationState = function(stateData, outputDivId, backForwardOutputDivId, bookmarkValue){
	this.stateData = stateData;
	this.outputDivId = outputDivId;
	this.backForwardOutputDivId = backForwardOutputDivId;
	this.changeUrl = bookmarkValue;
};

ApplicationState.prototype.back = function(){
	this.showBackForwardMessage("BACK for State Data: " + this.stateData);
	this.showStateData();
};

ApplicationState.prototype.forward = function(){
	this.showBackForwardMessage("FORWARD for State Data: " + this.stateData);
	this.showStateData();
};

ApplicationState.prototype.showStateData = function(){
	dojo.byId(this.outputDivId).innerHTML += this.stateData + '<br />';
};

ApplicationState.prototype.showBackForwardMessage = function(message){
	dojo.byId(this.backForwardOutputDivId).innerHTML += message + '<br />';
};
