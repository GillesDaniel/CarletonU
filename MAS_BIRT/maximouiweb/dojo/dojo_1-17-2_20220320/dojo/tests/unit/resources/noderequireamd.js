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

/*
 * Test module for dojo/node plugin that relies upon a 'dual' AMD/CommonJS module
 */

var noderequireamd = module.exports = exports;

noderequireamd.nodeamd = require('./nodeamd');
