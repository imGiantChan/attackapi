AttackAPI.PortScanner = {};
AttackAPI.PortScanner.scan = function (callback, target, ports, timeout) {
	var timeout = (timeout == null)?100:timeout;
	var checkSinglePort = function (target, port) {
		var img = new Image();
		img.onload = img.onerror = function () {
			if (!img) return;
			img = undefined;
			callback(target, port, true);
		};
		img.src = 'http://' + target + ':' + port;
		
		setTimeout(function () {
			if (!img) return;
			img = undefined;
			callback(target, port, false);
		}, timeout);
	};
	
	for (index = 0; index < ports.length; index++)
 		checkSinglePort(target, ports[index]);
};
AttackAPI.PortScanner.lazyScan = function (callback, target, ports, protocols) {
	var links = [];
	var protocols = (protocols == null)?['ftp', 'http', 'https']:protocols;
	
	for (index = 0; index < ports.length; index++) {
		for (zindex = 0; zindex < protocols.length; zindex++) {
			var link = new String(protocols[zindex] + '://' + target + ':' + ports[index]);
			link.target = target;
			link.port = ports[index];
			links.push(link);
		}
	}
	
	AttackAPI.HistoryDumper.lazyDump(function (link, status) {
		callback(link.target, link.port, status);
	}, links);
};
