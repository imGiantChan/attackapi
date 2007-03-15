
AttackAPI.dom.request = function (request) {
	var turl = AttackAPI.utils.parseURL(request.url);
	var curl = AttackAPI.utils.parseURL(document.location);

	if (turl.protocol == curl.protocol && turl.hostname == curl.hostname && turl.port == curl.port)
		return AttackAPI.dom.requestXML(request);
	else
		return AttackAPI.dom.requestCSRF(request);
};
