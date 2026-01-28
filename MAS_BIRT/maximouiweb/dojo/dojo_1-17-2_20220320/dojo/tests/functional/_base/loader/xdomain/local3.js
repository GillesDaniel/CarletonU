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
xdomainExecSequence.push('local3-1');
dojo.provide('dojo.tests._base.loader.xdomain.local3');
xdomainExecSequence.push('local3-2');

// load a local module that will have to be transformed
//debugger;
dojo.require('dojo.tests._base.loader.xdomain.local1');
xdomainExecSequence.push('local3-3');

dojo.tests._base.loader.xdomain.local3.status = 'local3-loaded';
