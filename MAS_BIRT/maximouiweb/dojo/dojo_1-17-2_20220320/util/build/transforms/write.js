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

define([
	"../buildControl",
	"../fileUtils",
	"../fs",
	"../replace"
], function(bc, fileUtils, fs, replace) {
	return function(resource, callback) {
		if(resource.tag.noWrite){
			return 0;
		}
		fileUtils.ensureDirectoryByFilename(resource.dest);
		fs.writeFile(resource.dest, bc.newlineFilter(resource.getText(), resource, "write"), resource.encoding, function(err) {
			callback(resource, err);
		});
		return callback;
	};
});
