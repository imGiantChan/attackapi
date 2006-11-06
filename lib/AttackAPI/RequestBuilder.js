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
AttackAPI.RequestBuilder.buildFormRequest = function (callback, method, URL, fields, timeout) {
	var timeout = (timeout == undefined)?1000:timeout;
	var timer = null;
	
	var iframe = document.createElement('iframe');
	iframe.style.visibility = 'hidden';
	
	document.body.appendChild(iframe);
	
	if (iframe.contentDocument) var iframedoc = iframe.contentDocument; 
	else if (iframe.contentWindow) var iframedoc = iframe.contentWindow.document.body.innerHTML;
	else var iframedoc = iframe.document;
	
	var form = document.createElement('form');
	form.setAttribute('method', method);
	form.setAttribute('action', URL);
	
	for (var name in fields) {
		var input = document.createElement('input');
		input.setAttribute('name', name);
		input.setAttribute('value', fields[name]);
		input.setAttribute('type', 'text');
		
		form.appendChild(input);
	}

	iframedoc.body.appendChild(form);
	
	iframe.onload = function () {
		clearTimeout(timer);
		document.body.removeChild(iframe);
		callback(true, method, URL, fields);
	};
	
	timer = setTimeout(function () {
		document.body.removeChild(iframe);
		callback(false, method, URL, fields);
	}, timeout);
	
	form.submit();
};