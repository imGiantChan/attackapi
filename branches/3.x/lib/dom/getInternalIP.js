
/**
 * @cat DOM
 * @name AttackAPI.dom.getInternalIP
 * @desc get internal IP address
 * @return {String} IP address
 */
AttackAPI.dom.getInternalIP = function () {
	try {
		var sock = new java.net.Socket();
		
		sock.bind(new java.net.InetSocketAddress('0.0.0.0', 0));
		sock.connect(new java.net.InetSocketAddress(document.domain, (!document.location.port)?80:document.location.port));
		
		return sock.getLocalAddress().getHostAddress();	
	} catch (e) {}
	
	return '127.0.0.1';
};
