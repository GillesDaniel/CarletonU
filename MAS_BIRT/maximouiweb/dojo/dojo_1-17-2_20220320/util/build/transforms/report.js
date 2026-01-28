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
	"../fs"
], function(bc, fileUtils, fs) {
	return function(resource, callback) {
		resource.reports.forEach(function(report){
			// report is a hash of dir, filename, content; content may be a function
			var
				dest = fileUtils.computePath(fileUtils.catPath(report.dir, report.filename), bc.destBasePath),
				content = report.content;
			if(typeof content=="function"){
				content = content(bc);
			};
			bc.waiting++; // matches *1*
			fileUtils.ensureDirectory(fileUtils.getFilepath(dest));
			fs.writeFile(dest, content, "utf8", function(err){
				if(err){
					//TODO
				}
				bc.passGate(); // matches *1*
			});
		});
		return 0;
	};
});
