AttackAPI.RequestBuilder = {};
AttackAPI.RequestBuilder.build = function () {
	var request;
	
	if (window.XMLHttpRequest) {
		request = new XMLHttpRequest();
	} else if (window.createRequest) {
		request = window.createRequest();
	} else if (window.ActiveXObject) {
		try {
			request = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try {
				request = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e) {}
		}
	}
	
	if (!request)
		throw 'request implementation not found';
	
	return request;
};
