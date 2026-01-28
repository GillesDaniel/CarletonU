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

define(["./fs"], function(fs){
	var cached = {};

	return function(contents, replacement){
		var encoding = "utf8";
		if(replacement instanceof Array){
			// replacement is a vector of replacement instructions; maybe the first item is an encoding
			if(typeof replacement[0]=="string"){
				encoding = replacement[0];
				replacement = replacement.slice(1);
			}
		}else{
			// replacement is a single replacement [search, replacement, type] triple
			replacement = [replacement];
		}
		// at this point, encoding has been determined and replacement is a vector of [search, replacement, type] triples

		replacement.forEach(function(item){
			var
				searchText = item[0],
				replacementText = item[1],
				type = item[2];
			if(type=="file"){
				// replacementText gives a filename that holds the replacement text
				// TODO add type AMD module
				// TODO: there's no such method as readFileSynch().  It's called readFileSync().  Is this code ever running?
				replacementText = (cached[filename] = cached[filename] || fs.readFileSynch(replacementText, encoding));
			}
			if(searchText instanceof RegExp){
				contents = contents.replace(searchText, replacementText);
			}else if(typeof searchText=="function"){
				contents = searchText(contents);
			}else{
				// replace all occurences of searchText with replacementText
				var
					searchTextLength = searchText.length,
					replacementTextLength = replacementText.length,
					start = contents.indexOf(searchText);
				while(start!=-1){
					contents = contents.substring(0, start) + replacementText + contents.substring(start + searchTextLength);
					start = contents.indexOf(searchText, start + replacementTextLength);
				}
			}
		});
		return contents;
	};
});

