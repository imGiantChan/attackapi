
/**
 * @cat DOM
 * @name AttackAPI.dom.request
 * @desc perform a request
 */
AttackAPI.dom.request = function (request) {
	var tmr = null;
	
	var img = new Image();
	img.onload = img.onerror = function () {
		window.clearTimeout(tmr);
		
		if (typeof(request.onload) == 'function')
			request.onload(new Object(), request);
	};
	
	if (request.query)
		img.src = request.url + '?' + this.buildQuery(request.query);
	else
		img.src = request.url;
		
	tmr = window.setTimeout(function () {
		delete img;
		
		if (typeof(request.ontimeout) == 'function')
			request.ontimeout(request);
	}, request.timeout?request.timeout:1000);
};
