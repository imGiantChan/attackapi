
AttackAPI.requestJS = function (request) {
	var tmr = null;
	
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.defer = true;
	script.onload = function () {
		window.clearTimeout(tmr);
		document.body.removeChild(script);
		
		if (typeof(request.onload) == 'function')
			request.onload(new Object(), request);
	};
	script.onerror = function () {
		window.clearTimeout(tmr);
		document.body.removeChild(script);
		
		if (typeof(request.onerror) == 'function')
			request.onerror('error', request);
	};
	
	if (request.query)
		script.src = request.url + '?' + this.buildQuery(request.query);
	else
		script.src = request.url;
		
	document.body.appendChild(script);
	
	tmr = window.setTimeout(function () {
		document.body.removeChild(script);
		
		if (typeof(request.ontimeout) == 'function')
			request.ontimeout(request);
	}, request.timeout?request.timeout:1000);
};
