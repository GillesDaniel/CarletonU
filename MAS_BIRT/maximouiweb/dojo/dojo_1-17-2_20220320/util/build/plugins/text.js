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

define(["dojo/json", "../fs"], function(json, fs){
	return {
		start:function(
			mid,
			referenceModule,
			bc
		){
			// mid may contain a pragma (e.g. "!strip"); remove
			mid = mid.split("!")[0];

			var textPlugin = bc.amdResources["dojo/text"],
			moduleInfo = bc.getSrcModuleInfo(mid, referenceModule, true),
			textResource = bc.resources[moduleInfo.url];

			if (!textPlugin){
				throw new Error("text! plugin missing");
			}
			if (!textResource){
				throw new Error("text resource (" + moduleInfo.url + ") missing");
			}

			var result = [textPlugin];
			if(bc.internStrings && !bc.internSkip(moduleInfo.mid, referenceModule)){
				result.push({
					module:textResource,
					pid:moduleInfo.pid,
					mid:moduleInfo.mid,
					deps:[],
					getText:function(){
						var text = this.module.getText ? this.module.getText() : this.module.text;
						if(text===undefined){
							// the module likely did not go through the read transform; therefore, just read it manually
							text= fs.readFileSync(this.module.src, "utf8");
						}
						return json.stringify(text+"");
					},
					internStrings:function(){
						return ["url:" + this.mid, this.getText()];
					}
				});
			}
			return result;
		}
	};
});
