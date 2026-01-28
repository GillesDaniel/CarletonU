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

/* global xdomainExecSequence */
xdomainExecSequence.push('local2-1');
dojo.provide('dojo.tests._base.loader.xdomain.local2');
xdomainExecSequence.push('local2-2');

// put the loader in xdomain loading mode
dojo.require('dojo.hash');
xdomainExecSequence.push('local2-3');

// load a local module that will have to be transformed
dojo.require('dojo.tests._base.loader.xdomain.local3');
xdomainExecSequence.push('local2-4');

dojo.tests._base.loader.xdomain.local2.status = 'local2-loaded';
