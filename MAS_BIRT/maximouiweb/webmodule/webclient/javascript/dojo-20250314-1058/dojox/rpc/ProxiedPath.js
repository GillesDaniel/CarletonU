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

define("dojox/rpc/ProxiedPath", ["dojo", "dojox", "dojox/rpc/Service"], function(dojo, dojox) {

dojox.rpc.envelopeRegistry.register(
	"PROXIED-PATH",function(str){return str == "PROXIED-PATH"},{
		serialize:function(smd, method, data){
			var i;
			var target = dojox.rpc.getTarget(smd, method);
			if(dojo.isArray(data)){
				for(i = 0; i < data.length;i++){
					target += '/' + (data[i] == null ? "" : data[i]);
				}
			}else{
				for(i in data){
					target += '/' + i + '/' + data[i];
				}
			}
			return {
				data:'',
				target: (method.proxyUrl || smd.proxyUrl) + "?url=" + encodeURIComponent(target)
			};
		},
		deserialize:function(results){
			return results;
		}
	}
);

});
