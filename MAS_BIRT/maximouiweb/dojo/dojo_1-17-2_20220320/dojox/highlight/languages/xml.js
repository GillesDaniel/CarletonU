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

define(["../_base"], function(dh){

	var XML_COMMENT = {
		className: 'comment',
		begin: '<!--', end: '-->'
	};
	
	var XML_ATTR = {
		className: 'attribute',
		begin: ' [a-zA-Z-]+\\s*=\\s*', end: '^',
		contains: ['value']
	};
	
	var XML_VALUE = {
		className: 'value',
		begin: '"', end: '"'
	};
	
	var dhc = dh.constants;
	dh.languages.xml = {
		defaultMode: {
			contains: ['pi', 'comment', 'cdata', 'tag']
		},
		case_insensitive: true,
		modes: [
			{
				className: 'pi',
				begin: '<\\?', end: '\\?>',
				relevance: 10
			},
			XML_COMMENT,
			{
				className: 'cdata',
				begin: '<\\!\\[CDATA\\[', end: '\\]\\]>'
			},
			{
				className: 'tag',
				begin: '</?', end: '>',
				contains: ['title', 'tag_internal'],
				relevance: 1.5
			},
			{
				className: 'title',
				begin: '[A-Za-z:_][A-Za-z0-9\\._:-]+', end: '^',
				relevance: 0
			},
			{
				className: 'tag_internal',
				begin: '^', endsWithParent: true,
				contains: ['attribute'],
				relevance: 0,
				illegal: '[\\+\\.]'
			},
			XML_ATTR,
			XML_VALUE
		],
		// exporting constants
		XML_COMMENT: XML_COMMENT,
		XML_ATTR: XML_ATTR,
		XML_VALUE: XML_VALUE
	};

	return dh.languages.xml;

});
