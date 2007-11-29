
AttackAPI.transport = function (request) {
	var url = request.url + '?' + this.buildQuery(request.query);
	
	if (url.length <= 2048)
		return this.requestL(request);
	else
		return this.requestCSRF(this.extend(request, {method: 'POST'}));
};