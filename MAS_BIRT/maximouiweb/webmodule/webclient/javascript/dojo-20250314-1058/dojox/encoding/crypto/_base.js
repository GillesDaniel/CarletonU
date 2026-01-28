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

define("dojox/encoding/crypto/_base", ["dojo/_base/lang"], function(lang) {
	
	var c = lang.getObject("dojox.encoding.crypto", true);

	c.cipherModes = {
		// summary:
		//		Enumeration for various cipher modes.
		ECB:0, CBC:1, PCBC:2, CFB:3, OFB:4, CTR:5
	};
	c.outputTypes = {
		// summary:
		//		Enumeration for input and output encodings.
		Base64:0, Hex:1, String:2, Raw:3
	};
	
	return c;
});
