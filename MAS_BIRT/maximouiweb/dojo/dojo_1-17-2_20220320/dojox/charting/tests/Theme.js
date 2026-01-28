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

define(["doh", "dojox/charting/Theme", "dojox/charting/themes/PlotKit/blue"], 
	function(doh, Theme, blue){
	doh.register("dojox.charting.tests.Theme", [
		function testDefineColor(t){
			var args={ num:16, cache:false };
			Theme.defineColors(args);
			var a=blue.colors;
			var s="<table border=1>";
			for(var i=0; i<a.length; i++){
				if(i%8==0){
					if(i>0) s+="</tr>";
					s+="<tr>";
				}
				s+='<td width=16 bgcolor='+a[i]+'>&nbsp;</td>';
			}
			s+="</tr></table>";
			doh.debug(s);

			var args={ num:32, cache: false };
			Theme.defineColors(args);
			var a=blue.colors;
			var s="<table border=1 style=margin-top:12px;>";
			for(var i=0; i<a.length; i++){
				if(i%8==0){
					if(i>0) s+="</tr>";
					s+="<tr>";
				}
				s+='<td width=16 bgcolor='+a[i]+'>&nbsp;</td>';
			}
			s+="</tr></table>";
			doh.debug(s);

			var args={ saturation:20, num:32, cache:false };
			Theme.defineColors(args);
			var a=blue.colors;
			var s="<table border=1 style=margin-top:12px;>";
			for(var i=0; i<a.length; i++){
				if(i%8==0){
					if(i>0) s+="</tr>";
					s+="<tr>";
				}
				s+='<td width=16 bgcolor='+a[i]+'>&nbsp;</td>';
			}
			s+="</tr></table>";
			doh.debug(s);

			var args={ low:10, high:90, num:32, cache: false };
			Theme.defineColors(args);
			var a=blue.colors;
			var s="<table border=1 style=margin-top:12px;>";
			for(var i=0; i<a.length; i++){
				if(i%8==0){
					if(i>0) s+="</tr>";
					s+="<tr>";
				}
				s+='<td width=16 bgcolor='+a[i]+'>&nbsp;</td>';
			}
			s+="</tr></table>";
			doh.debug(s);
		}
	]);
});
