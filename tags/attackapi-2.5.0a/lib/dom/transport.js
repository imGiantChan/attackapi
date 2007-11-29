
AttackAPI.dom.transport = function (request) {
	var url = request.url + '?' + AttackAPI.utils.buildQuery(request.query);
	
	if (url.length <= 2048)
		return AttackAPI.dom.requestIMG(request);
	else
		return AttackAPI.dom.requestCSRF(AttackAPI.core.extend(request, {method: 'POST'}));
};
