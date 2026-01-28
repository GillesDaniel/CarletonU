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

ace.define("ace/snippets/makefile",["require","exports","module"],function(e,t,n){"use strict";t.snippetText="snippet ifeq\n	ifeq (${1:cond0},${2:cond1})\n		${3:code}\n	endif\n",t.scope="makefile"});
                (function() {
                    ace.require(["ace/snippets/makefile"], function(m) {
                        if (typeof module == "object" && typeof exports == "object" && module) {
                            module.exports = m;
                        }
                    });
                })();
            
