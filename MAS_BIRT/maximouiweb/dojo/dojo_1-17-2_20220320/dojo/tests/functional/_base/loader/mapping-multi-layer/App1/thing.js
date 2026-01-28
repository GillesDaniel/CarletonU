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

require({cache:
	{
		'common/another':function(){
			define([], function () {
				console.log('this is Common1/another in layer');
				results.push('Common1/another:cache');
			});
		}
	}
});
define(['common/another', 'starmap/demo2'], function() {
	console.log('this is App1/thing in layer');
	results.push('App1/thing:cache');
});
