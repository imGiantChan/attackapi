
/**
 * @cat DOM
 * @name AttackAPI.dom.requestJSON
 * @desc perform JSON request
 */
AttackAPI.dom.requestJSON = function (request) {
	var callbackName = '__c' + new Date().getTime();
	window[callbackName] = function () {
		if (typeof(request.oncallback) == 'function')
			request.oncallback.apply(request, arguments);
	};
	
	var query = request.query?request.query:{};
	query[request.callback?request.callback:'callback'] = callbackName;
	
	this.requestJSL(request.url + '?' + this.buildQuery(query));
};
