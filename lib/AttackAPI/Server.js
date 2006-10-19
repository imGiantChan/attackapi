AttackAPI.Server = {};
AttackAPI.Server.getPlatformInfo = function (callback, timeout) {
	var timeout = (timeout == undefined)?1000:timeout;
	var request = AttackAPI.RequestBuilder.build();
	request.onreadystatechange = function () {
		if (request.readyState == 4) {
			clearTimeout(timer);
			callback({ platform: request.getResponseHeader('Server'),
			           date: request.getResponseHeader('Date'),
			           powered_by: request.getResponseHeader('X-Powered-By') });
		}
	};
	request.open('HEAD', document.location);
	request.send(null);
	
	var timer = setTimeout(function () {
		request.abort();
		callback(undefined);
	}, timeout);
};
AttackAPI.Server.getNetworkInfo = function () {
	var hostname = document.domain;
	var address = undefined;
	
	try {
		var sock = new java.net.Socket();
		sock.bind(new java.net.InetSocketAddress('0.0.0.0', 0));
		sock.connect(new java.net.InetSocketAddress(document.domain, (!document.location.port)?80:document.location.port));
		hostname = sock.getInetAddress().getHostName();	
		address = sock.getInetAddress().getHostAddress();	
	} catch (e) {}
	
	return {hostname: hostname, address: address};
};
