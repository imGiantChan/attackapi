
AttackAPI.requestXHR = function (request) {
	var xhr = this.getXHR();
	
	if (!xhr) {
		if (typeof(request.onerror) == 'function')
			request.onerror('request implementation not found', request);
			
		return;
	}
	
	var tmr = window.setTimeout(function () {
		xhr.abort();
		
		if (typeof(request.ontimeout) == 'function')
			request.ontimeout(request);
	}, request.timeout?request.timeout:10000);
	
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4) {
			window.clearTimeout(tmr);
			
			if (typeof(request.onload) == 'function')
				request.onload({status: xhr.status, data: xhr.responseText, dataXML: xhr.responseXML, headers: xhr.getAllResponseHeaders()}, request);
		}
	};
	
	try {
		var method = request.method?request.method:'GET';
		var url = request.url + (method == 'GET' && request.query?'?' + this.buildQuery(request.query):'');
		
		xhr.open(method, url);
		
		if (request.headers)
			for (var header in request.headers)
				xhr.setRequestHeader(header, request.headers[header]);
				
		xhr.send(request.body?request.body:(method != 'GET' && request.query?this.buildQuery(request.query):null));
	} catch (e) {
		if (typeof(request.onerror) == 'function')
			request.onerror(e, request);
			
		return;
	}
};