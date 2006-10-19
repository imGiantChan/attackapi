AttackAPI.URLFetcher = {};
AttackAPI.URLFetcher.fetch = function (callback, URL, timeout) {
	var timeout = (timeout == undefined)?1000:timeout;
	var request = AttackAPI.RequestBuilder.build();
	request.onreadystatechange = function () {
		if (request.readyState == 4) {
			clearTimeout(timer);
			callback(URL, request.responseText, request.status);
		}
	};
	request.open('GET', URL, true);
	request.send(null);
	
	var timer = setTimeout(function () {
		request.abort();
		callback(URL, '', 408);
	}, timeout);
};
AttackAPI.URLFetcher.iframeFetch = function (callback, URL, timeout) {
	var timeout = (timeout == undefined)?1000:timeout;
	var iframe = document.createElement('iframe');
	iframe.style.visibility = 'hidden';
	iframe.src = URL;
	iframe.onload = function () {
		clearTimeout(timer);
		
		var content = '';
		if (iframe.contentDocument) {
			content = iframe.contentDocument.body.innerHTML;
		} else if (iFrameEl.contentWindow) {
			content = iframe.contentWindow.document.body.innerHTML;
		} else if (iFrameEl.document) {
			content = iframe.document.body.innerHTML;
		}
		
		iframe.src = '';
		document.body.removeChild(iframe);
		callback(URL, content, true);
	};
	
	document.body.appendChild(iframe);
	
	var timer = setTimeout(function () {
		iframe.src = '';
		document.body.removeChild(iframe);
		callback(URL, undefined, false);
	}, timeout);
};
AttackAPI.URLFetcher.liveJavaFetch = function (callback, URL) {
	var data = null;
	var destination = new java.net.URL(URL);
	var buffer = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, 65536);
	var stream = destination.getContent();
	
	while (true) {
		var count = stream.read(buffer);
		
		if (count <= 0)
			break;
			
		var str = new java.lang.String(buffer, 0, count);
		data += str;
	}
	
	stream.close();
	callback(URL, data);
};
