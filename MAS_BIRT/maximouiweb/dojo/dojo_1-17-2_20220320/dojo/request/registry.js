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
	'require',
	'../_base/array',
	'./default!platform',
	'./util'
], function(require, array, fallbackProvider, util){
	var providers = [];

	function request(url, options){
		var matchers = providers.slice(0),
			i = 0,
			matcher;

		while(matcher=matchers[i++]){
			if(matcher(url, options)){
				return matcher.request.apply(null, arguments);
			}
		}

		return fallbackProvider.apply(null, arguments);
	}

	function createMatcher(match, provider){
		var matcher;

		if(provider){
			if(match.test){
				// RegExp
				matcher = function(url){
					return match.test(url);
				};
			}else if(match.apply && match.call){
				matcher = function(){
					return match.apply(null, arguments);
				};
			}else{
				matcher = function(url){
					return url === match;
				};
			}

			matcher.request = provider;
		}else{
			// If only one argument was passed, assume it is a provider function
			// to apply unconditionally to all URLs
			matcher = function(){
				return true;
			};

			matcher.request = match;
		}

		return matcher;
	}

	request.register = function(url, provider, first){
		var matcher = createMatcher(url, provider);
		providers[(first ? 'unshift' : 'push')](matcher);

		return {
			remove: function(){
				var idx;
				if(~(idx = array.indexOf(providers, matcher))){
					providers.splice(idx, 1);
				}
			}
		};
	};

	request.load = function(id, parentRequire, loaded, config){
		if(id){
			// if there's an id, load and set the fallback provider
			require([id], function(fallback){
				fallbackProvider = fallback;
				loaded(request);
			});
		}else{
			loaded(request);
		}
	};

	util.addCommonMethods(request);

	return request;
});
