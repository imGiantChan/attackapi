AttackAPI.Client = {};
AttackAPI.Client.getPlatformInfo = function (signatures) {
	return {platform: navigator.platform};
};
AttackAPI.Client.getBrowserInfo = function (signatures) {
	var browser = undefined;
	
	if (navigator.userAgent) {
		browser = navigator.userAgent;
	} else if (navigator.vendor) {
		browser = navigator.vendor;
	} else if (window.opera) {
		browser = "Opera";
	}
		
	return {browser: browser};
};
AttackAPI.Client.getPluginsInfo = function () {
	return navigator.plugins;
};
AttackAPI.Client.getNetworkInfo = function () {
	var hostname = undefined;
	var address = undefined;
	
	try {
		var sock = new java.net.Socket();
		sock.bind(new java.net.InetSocketAddress('0.0.0.0', 0));
		sock.connect(new java.net.InetSocketAddress(document.domain, (!document.location.port)?80:document.location.port));
		hostname = sock.getLocalAddress().getHostName();
		address = sock.getLocalAddress().getHostAddress();	
	} catch (e) {}
	
	return {hostname: hostname, address: address};
};
