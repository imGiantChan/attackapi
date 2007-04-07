
AttackAPI.dom.getInternalHostname = function () {
	try {
		var sock = new java.net.Socket();
		
		sock.bind(new java.net.InetSocketAddress('0.0.0.0', 0));
		sock.connect(new java.net.InetSocketAddress(document.domain, (!document.location.port)?80:document.location.port));
		
		return sock.getLocalAddress().getHostName();	
	} catch (e) {}
	
	return 'localhost';
};
