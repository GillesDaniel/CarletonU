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
xdomainExecSequence.push('local1-dep-1');
var x1 = dojo.provide('dojo.tests._base.loader.xdomain.local1-dep');
dojo.getObject('dojo.tests._base.loader.xdomain.local1-dep').status =
	'dojo.tests._base.loader.xdomain.local1-dep-ok';
xdomainExecSequence.push('local1-dep-2');
