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

define(['doh', '../../crypto/SimpleAES'], function(doh, SimpleAES){
	var message="The rain in Spain falls mainly on the plain.";
	var key="foo-bar-baz";
	var enc = null;

	tests.register("dojox.encoding.crypto.tests.SimpleAES", [
		function testAES(t){
			var dt = new Date();
			enc = SimpleAES.encrypt(message, key);
			doh.debug("Encrypt: ", new Date()-dt, "ms.");
			var dt2 = new Date();
			t.assertEqual(message, SimpleAES.decrypt(enc, key));
			doh.debug("Decrypt: ", new Date()-dt2, "ms.");
		}
	]);
});
