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

define('subwidget',
	['text!subwidget.html!strip', 'text!subwidget2.html'],
	function (template, template2) {
		return {
			name: 'subwidget',
			template: template,
			template2: template2
		};
	}
);
