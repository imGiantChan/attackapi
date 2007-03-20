
AttackAPI.dom.requestXML = function (request) {
	var tmr = null;
	var xhr = AttackAPI.dom.getXHR();
	
	if (!xhr) {
		if (typeof(request.onerror) == 'function')
			request.onerror('request implementation not found', request);
			
		return;
	}
	
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4) {
			window.clearTimeout(tmr);
			
			if (typeof(request.onload) == 'function')
				request.onload({status: xhr.status, data: xhr.responseText, dataXML: xhr.responseXML, headers: xhr.getAllResponseHeaders()}, request);
		}
	};
	
	try {
		xhr.open(request.method?request.method:'GET', request.url);
		
		if (request.headers)
			for (var header in request.headers)
				xhr.setRequestHeader(header, request.headers[header]);
				
		xhr.send(request.body?request.body:(request.query?AttackAPI.query(request.query):null));
	} catch (e) {
		if (typeof(request.onerror) == 'function')
			request.onerror(e, request);
			
		return;
	}
	
	tmr = window.setTimeout(function () {
		xhr.abort();
		
		if (typeof(request.ontimeout) == 'function')
			request.ontimeout(request);
	}, request.timeout?request.timeout:1000);
};
