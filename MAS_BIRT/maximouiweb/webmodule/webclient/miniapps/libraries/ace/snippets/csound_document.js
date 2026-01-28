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

ace.define("ace/snippets/csound_document",["require","exports","module"],function(e,t,n){"use strict";t.snippetText="# <CsoundSynthesizer>\nsnippet synth\n	<CsoundSynthesizer>\n	<CsInstruments>\n	${1}\n	</CsInstruments>\n	<CsScore>\n	e\n	</CsScore>\n	</CsoundSynthesizer>\n",t.scope="csound_document"});
                (function() {
                    ace.require(["ace/snippets/csound_document"], function(m) {
                        if (typeof module == "object" && typeof exports == "object" && module) {
                            module.exports = m;
                        }
                    });
                })();
            
