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

//Make a copy of the tests dir, then run this script, giving the location
//of the tests copy, and the URL to use dojo.js

var startDir = arguments[0];
var xdDojoUrl = arguments[1];

load("jslib/fileUtil.js");
load("jslib/buildUtil.js");

var fileList = fileUtil.getFilteredFileList(startDir, /\.(html|htm)$/, true);

for(var i = 0; i < fileList.length; i++){
	var fileName = fileList[i];
	var fileContents = fileUtil.readFile(fileName);
	fileContents = fileContents.replace(/src\=\".*dojo.js"/, 'src="' + xdDojoUrl + '"');
	fileUtil.saveUtf8File(fileName, fileContents);
}
