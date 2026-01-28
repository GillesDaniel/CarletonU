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
    "dojo/dom-class",
    "dojo/_base/window",
    "com/ibm/tivoli/maximo/miniapps/_MiniApp",
    "com/ibm/tivoli/maximo/miniapps/_MaximoLog",
    "com/ibm/tivoli/maximo/miniapps/Handlers"

], function (lang, declare, geom, dom, domStyle, domAttr, domClass, bwin, _MiniApp, log, Handlers) {
    return declare([_MiniApp, Handlers], {
        // static variables
        TAG: "ACEEDITOR",
        SIZE: {w: 800, h: 500},

        /**
         * Known Options
         *
         * @param options
         */
        constructor: function (options) {
            this.options = options || {};

            log.debug("{} options", this.TAG, options);
        },

        startup: function () {
            this.inherited(arguments);
            // load the base ace library
            var me=this;
            var url = this.rootUrl + "/libraries/ace/ace.js";
            this.loadLibrary(
                // check will return true when Ace is loaded
                function () {
                    return window.ace!=null && window.ace.require!=null;
                },
                url,
                // now that ace is loaded, load the lang tools which offers code completion, syntax highlighters, etc
                lang.hitch(me, me.loadLangTools));
        },

        loadLangTools: function() {
            var me=this;
            var url = this.rootUrl + "/libraries/ace/ext-language_tools.js";
            this.loadLibrary(
                // ace require will return non null when module is loaded
                function () {
                    return window.ace.require("ace/ext/language_tools");
                },
                url,
                // call createUI now that we have the libraries
                lang.hitch(me, me.createUI));

        },

        createUI:function() {
            var me=this;

            try {
                // try a chrome div resize handler
                me.domNode.style.resize='both';
                var ro = new ResizeObserver(function (entries) {
                    me.invokeLater(function () {
                        me.updateSize();
                    }, 200, "_updatesize");
                });

                // Only observe the second box
                ro.observe(me.domNode);
            } catch (e) {
                me.domNode.style.resize='';
                log.error("ResizeObserver not available");
            }

            // update the editor Mode from the Maximo UI
            var editorMode = 'text';

            this.editor = window.ace.edit(this.domNode,{
                theme: 'ace/theme/chrome'
                // this is dark theme
                // theme: 'ace/theme/dracula'
            });

            this.editor.setOptions({
                mode: editorMode,
                enableBasicAutocompletion: true,
                enableSnippets: true,
                enableLiveAutocompletion: false,
                showInvisibles: false,
                highlightSelectedWord: true,
                fontSize: 14
            });

            this.editor.commands.addCommand({
                name: 'save',
                bindKey: {win: "Ctrl-S", "mac": "Cmd-S"},
                exec: function(editor) {
                    me.updateSource();
                }
            });

            // set the editor size
            var size = this.onMeasure();
            if (size) {
                this.editor.resize(true);
            }

            // load the source from the server
            this.getSource();

            // everytime we focus, let's sync with the selected language type
            this.editor.on('focus', function(f) {
                console.log("got focus", f);
                me.updateEditorMode();
            });
        },

        /**
         * Find the Language Selection DropDown and sync our mode to it.
         *
         * @returns {string}
         */
        updateEditorMode: function() {
            this.fetch('getscripttype', {}).then(lang.hitch(this, this.updateEditorModeFromResult));
        },

        updateEditorModeFromResult: function(result) {
            log.debug("SCRIPT TYPE:", result);
            if (result && result.sourceType) {
            	var mode = 'text';
            	if (result.sourceType.toLowerCase().indexOf('ython')>=0) {
                    mode='python';            		
            	} else if (result.sourceType.toLowerCase().indexOf('rhino')>=0) {
            		mode='javascript';
            	} else if (result.sourceType.toLowerCase().indexOf('nash')>=0) {
            		mode='javascript';
            	} else if (result.sourceType.toLowerCase().indexOf('javascr')>=0) {
            		mode='javascript';
            	} else if (result.sourceType.toLowerCase().indexOf('ecma')>=0) {
            		mode='javascript';
            	} else if (result.sourceType.toLowerCase().indexOf('js')>=0) {
            		mode='javascript';
            	} else if (result.sourceType.toLowerCase().indexOf('groovy')>=0) {
            		mode='groovy';
            	} else if (result.sourceType.toLowerCase().indexOf('mbr')>=0) {
            		// todo: at some point add in mbr script support
            		mode='text';
            	} else {
            		mode='text';
            		log.debug('Using Text for ', result)
            	}
                this.editor.session.setMode('ace/mode/'+mode);
            }
        },

        updateSize: function() {
            if (!this.editor) return;
            var box = geom.getContentBox(this.domNode);
            if (box) {
                log.debug("resizing", box);
                //this.editor.session.setSize(box.w, box.h);
                this.editor.resize(true);
                this.SIZE=box;
            }
        },

        getSource: function() {
            var me=this;
            this.fetch("getsource", {}).then(function(result) {
                log.debug("SOURCE", result);
                // turn off the change handler when updating the source
                if (me._updateHandler)
                    me.editor.session.removeListener('change', me._updateHandler);

                if (result) {
                    me.editor.setValue(result.source);
                    if (result.type) {
                        me.updateEditorModeFromResult(result);
                    }
                    me.editor.getSelection().clearSelection();
                    // important, let's reset the UNDO stack so that Ctrl+Z doesn't nuke our code
                    me.editor.session.getUndoManager().reset();
                }

                // now that we have initial source, register onchange to update changes.
                me._updateHandler = lang.hitch(me, me.updateSource);
                me.editor.session.on('change', me._updateHandler);
            });
        },

        /**
         * Sends the updated source to the server
         */
        updateSource: function() {
            var me=this;
            this.invokeLater(function() {
                me._updateSource();
            }, 200, "_updatesource");
        },

        _updateSource: function() {
            this.fetch("update", {source: this.editor.getValue()}).then(function() {
                log.debug("source updated");
                saveUnlocked =true;
                setButtonEnabled(saveButton,true);
            });
        },

        destroy: function () {
            this.inherited(arguments);
        },

        /**
         * Gets called when the server changes to a new record.  We need to update our UI to match.
         * @param data
         */
        onRefreshRequested: function (data) {
            log.debug("Refresh UI");
            this.getSource();
            this.updateEditorMode();
        },

        /**
         * Either returns an object with w,h or width,height.
         * The latter being a css measurement vs a pixel box measurement.
         */
        onMeasure: function () {
            return this.SIZE;
        }
    });
});
