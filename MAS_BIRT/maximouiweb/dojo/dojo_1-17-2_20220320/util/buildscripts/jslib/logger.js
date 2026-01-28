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

var logger = {
	TRACE: 0,
	INFO: 1,
	WARN: 2,
	ERROR: 3,
	level: 0,
	logPrefix: "",

	trace: function(message){
		if(this.level <= this.TRACE){
			this._print(message);
		}
	},

	info: function(message){
		if(this.level <= this.INFO){
			this._print(message);
		}
	},

	warn: function(message){
		if(this.level <= this.WARN){
			this._print(message);
		}
	},

	error: function(message){
		if(this.level <= this.ERROR){
			this._print(message);
		}
	},

	_print: function(message){
		print((this.logPrefix ? (this.logPrefix + " ") : "") + message);
	}
}
