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

function timestamp(){
	// this function isn't really necessary...
	// just using it to show you can call a function to get a profile property value
	var d = new Date();
	return d.getFullYear() + '-' + (d.getMonth()+1) + "-" + d.getDate() + "-" +
		d.getHours() + ':' + d.getMinutes() + ":" + d.getSeconds();
}

var profile = {
	basePath:".",
	buildTimestamp:timestamp()
};
