
AttackAPI.dom.requestJSON = function (request) {
	if (AttackAPI.dom.requestJSON.callbacks == undefined)
		AttackAPI.dom.requestJSON.callbacks = new Array();
		
	AttackAPI.dom.requestJSON.callbacks['callback' + AttackAPI.dom.requestJSON.callbacks.length] = function () {
		delete AttackAPI.dom.requestJSON.callbacks['callback' + AttackAPI.dom.requestJSON.callbacks.length];
		
		if (typeof(request.oncallback) == 'function')
			request.oncallback.apply(request, arguments);
	};
	
	var query = request.query?request.query:{};
	query[request.callback?request.callback:'callback'] = 'AttackAPI.dom.requestJSON.callbacks.callback' + AttackAPI.dom.requestJSON.callbacks.length;
	
	AttackAPI.dom.requestJSL(request.url + '?' + AttackAPI.utils.buildQuery(query));
};