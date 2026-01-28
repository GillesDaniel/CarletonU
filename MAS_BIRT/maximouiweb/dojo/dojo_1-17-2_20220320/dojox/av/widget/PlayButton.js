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

define(['dojo', 'dijit', 'dijit/_Widget', 'dijit/_TemplatedMixin'],function(dojo, dijit, _Widget, _TemplatedMixin){

return dojo.declare("dojox.av.widget.PlayButton", [_Widget, _TemplatedMixin], {
	// summary:
	//		A Play/Pause button widget to use with dojox.av.widget.Player

	templateString: dojo.cache("dojox.av.widget","resources/PlayButton.html"),

	postCreate: function(){
		// summary:
		//		Initialize button.
		this.showPlay();
	},

	setMedia: function(/* Object */med){
		// summary:
		//		A common method to set the media in all Player widgets.
		//		May do connections and initializations.

		this.media = med;
		dojo.connect(this.media, "onEnd", this, "showPlay");
		dojo.connect(this.media, "onStart", this, "showPause");
	},

	onClick: function(){
		// summary:
		//		Fired on play or pause click.

		if(this._mode=="play"){
			this.onPlay();
		}else{
			this.onPause();
		}
	},

	onPlay: function(){
		// summary:
		//		Fired on play click.

		if(this.media){
			this.media.play();
		}
		this.showPause();
	},
	onPause: function(){
		// summary:
		//		Fired on pause click.

		if(this.media){
			this.media.pause();
		}
		this.showPlay();
	},
	showPlay: function(){
		// summary:
		//		Toggles the pause button invisible and the play
		//		button visible..

		this._mode = "play";
		dojo.removeClass(this.domNode, "Pause");
		dojo.addClass(this.domNode, "Play");
	},
	showPause: function(){
		// summary:
		//		Toggles the play button invisible and the pause
		//		button visible.

		this._mode = "pause";
		dojo.addClass(this.domNode, "Pause");
		dojo.removeClass(this.domNode, "Play");
	}
});

});
