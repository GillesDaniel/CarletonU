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

define(['doh', '../../digests/_base', '../../digests/SHA256'], function(doh, ded, SHA256){
	var message="abc";
	var hex="ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad";
	var base64="ungWv48Bz+pBQUDeXa4iI7ADYaOWF3qctBD/YfIAFa0=";
	var hmacKey="Jefe";
	var hmacData="what do ya want for nothing?";
	var hmacHex="5bdcc146bf60754e6a042426089575c75a003f089d2739839dec58b964ec3843";

	doh.register("dojox.encoding.tests.digests.SHA256", [
		function testBase64Compute(t){
			t.assertEqual(base64, SHA256(message));
		},
		function testHexCompute(t){
			t.assertEqual(hex, SHA256(message, ded.outputTypes.Hex));
		},
		function testHmacCompute(t){
			t.assertEqual(hmacHex, SHA256.hmac(hmacData, hmacKey, ded.outputTypes.Hex));
		}
	]);
});
