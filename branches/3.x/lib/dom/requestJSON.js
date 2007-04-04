
AttackAPI.dom.requestJSON = function (request) {
	if (AttackAPI.dom.requestJSON.callbacks == undefined)
		AttackAPI.dom.requestJSON.callbacks = {};
		
	var callbackName = 'c' + new Date().getTime();
	AttackAPI.dom.requestJSON.callbacks[callbackName] = function () {
		if (typeof(request.oncallback) == 'function')
			request.oncallback.apply(request, arguments);
	};
	
	var query = request.query?request.query:{};
	query[request.callback?request.callback:'callback'] = 'AttackAPI.dom.requestJSON.callbacks.' + callbackName;
	
	AttackAPI.dom.requestJSL(request.url + '?' + AttackAPI.utils.buildQuery(query));
};