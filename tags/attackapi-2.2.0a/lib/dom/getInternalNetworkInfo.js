
AttackAPI.dom.getInternalNetworkInfo = function () {
	var info = {hostname: 'localhost', IP: '127.0.0.1'};
	
	try {
		var sock = new java.net.Socket();
		
		sock.bind(new java.net.InetSocketAddress('0.0.0.0', 0));
		sock.connect(new java.net.InetSocketAddress(document.domain, (!document.location.port)?80:document.location.port));
		
		info.IP = sock.getLocalAddress().getHostAddress();	
		info.hostname = sock.getLocalAddress().getHostName();	
	} catch (e) {}
	
	return info;
};
