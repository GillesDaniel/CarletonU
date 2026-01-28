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
			define(['./anotherone'], function () {
				console.log('this is Common2/another in layer');
				results.push('Common2/another:cache');
			});
		},
		'common/anotherone':function(){
			define([], function () {
				console.log('this is Common2/anotherone in layer');
				results.push('Common2/anotherone:cache');
			});
		}

	}
});
define(['common/another', 'starmapModule/mappedB'], function() {
	console.log('this is App2/thing in layer');
	results.push('App2/thing:cache');
});
