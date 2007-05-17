
AttackAPI.requestJSON = function (request) {
	var callbackName = '__c' + new Date().getTime();
	window[callbackName] = function () {
		if (typeof(request.oncallback) == 'function')
			request.oncallback.apply(request, arguments);
	};
	
	var query = request.query?request.query:{};
	query[request.callback?request.callback:'callback'] = callbackName;
	
	this.requestJSL(request.url + '?' + this.buildQuery(query));
};