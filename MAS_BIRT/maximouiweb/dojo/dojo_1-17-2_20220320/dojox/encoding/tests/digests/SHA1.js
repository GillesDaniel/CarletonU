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

define(['doh', '../../digests/_base', '../../digests/SHA1'], function(doh, ded, SHA1){
	var message="abc";
	var base64="qZk+NkcGgWq6PiVxeFDCbJzQ2J0=";
	var hex="a9993e364706816aba3e25717850c26c9cd0d89d";
	var s="\251\231\76\66\107\6\201\152\272\76\45\161\170\120\302\154\234\320\330\235";

	doh.register("dojox.encoding.tests.digests.SHA1", [
		function testBase64Compute(t){
			t.assertEqual(base64, SHA1(message));
		},
		function testHexCompute(t){
			t.assertEqual(hex, SHA1(message, ded.outputTypes.Hex));
		},
		function testStringCompute(t){
			t.assertEqual(s, SHA1(message, ded.outputTypes.String));
		}
	]);
});
