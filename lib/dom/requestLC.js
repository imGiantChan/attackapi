
AttackAPI.requestLC = function (request) {
	try {
		if (typeof(request.onload) == 'function')
			request.onload({data: this.requestLCL(request.url + (request.query?request.query:'?' + this.buildQuery(request.query)))}, request);
	} catch (e) {
		if (typeof(request.onerror) == 'function')
			request.onerror(e, request);
	}
};