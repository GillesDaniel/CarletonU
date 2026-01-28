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

ace.define("ace/mode/plain_text",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/text_highlight_rules","ace/mode/behaviour"],function(e,t,n){"use strict";var r=e("../lib/oop"),i=e("./text").Mode,s=e("./text_highlight_rules").TextHighlightRules,o=e("./behaviour").Behaviour,u=function(){this.HighlightRules=s,this.$behaviour=new o};r.inherits(u,i),function(){this.type="text",this.getNextLineIndent=function(e,t,n){return""},this.$id="ace/mode/plain_text"}.call(u.prototype),t.Mode=u});
                (function() {
                    ace.require(["ace/mode/plain_text"], function(m) {
                        if (typeof module == "object" && typeof exports == "object" && module) {
                            module.exports = m;
                        }
                    });
                })();
            
