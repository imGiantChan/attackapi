
AttackAPI.dom.requestLC = function (request) {
	try {
		if (typeof(request.onload) == 'function')
			request.onload({data: AttackAPI.dom.requestLCL(request.url + (request.query?request.query:'?' + AttackAPI.utils.buildQuery(request.query)))}, request);
	} catch (e) {
		if (typeof(request.onerror) == 'function')
			request.onerror(e, request);
	}
};
