AttackAPI.URLScanner = {};
AttackAPI.URLScanner.scan = function (callback, URLs, timeout) {
	var timeout = (timeout == null)?1000:timeout;
	var checkSingleURL = function (URL) {
		var request = AttackAPI.RequestBuilder.build();
		request.onreadystatechange = function () {
			if (request.readyState == 4) {
				clearTimeout(timer);
				callback(URL, request.status);
			}
		};
		request.open('GET', URL, true);
		request.send(null);
		
		var timer = setTimeout(function () {
			request.abort();
			callback(URL, 408);
		}, timeout);
	};
	
	for (index = 0; index < URLs.length; index++)
		checkSingleURL(URLs[index]);
};
AttackAPI.URLScanner.scriptScan = function (callback, URLs, timeout) {
	var timeout = (timeout == null)?1000:timeout;
	var head = document.getElementsByTagName('head')[0];
	var checkSingleURL = function (URL) {
		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.defer = true;
		script.src = URL;
		script.onerror = function () {
			clearTimeout(timer);
			head.removeChild(script);
			callback(URL, false);
		};
		script.onload = function () {
			clearTimeout(timer);
			head.removeChild(script);
			callback(URL, true);
		};
		
		head.appendChild(script);
		
		var timer = setTimeout(function () {
			head.removeChild(script);
			callback(URL, false);
		}, timeout);
	};
	
	var onerror = window.onerror;
	window.onerror = function (message, URL, line) {
		if (onerror)
			return onerror(message, URL, line);
		
		return true;
	};
	
	for (var index = 0; index < URLs.length; index++)
		checkSingleURL(URLs[index]);
};
