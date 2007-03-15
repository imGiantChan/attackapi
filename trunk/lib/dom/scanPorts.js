
AttackAPI.dom.scanPorts = function (scan) {
	var ports = (scan.ports != undefined)?scan.ports:AttackAPI.dom.signatures.ports;
	var timeout = (scan.timeout != undefined)?scan.timeout:1000;
	
	function check(port, index, length) {
		var img = new Image();
		img.onload = img.onerror = function () {
			if (!img) return;
			img = undefined;
			
			if (typeof(scan.onfound) == 'function')
				scan.onfound(port, scan);
				
			if (index == length - 1 && typeof(scan.oncomplete) == 'function')
				scan.oncomplete(scan);
		};
		img.src = 'http://' + scan.target + ':' + port;
		
		window.setTimeout(function () {
			if (!img) return;
			img = undefined;
			
			if (typeof(scan.ontimeout) == 'function')
				scan.ontimeout(port, scan);
				
			if (index == length - 1 && typeof(scan.oncomplete) == 'function')
				scan.oncomplete(scan);
		}, timeout);
	}
	
	for (var i = 0; i < ports.length; i++)
		check(ports[i], i, ports.length);
};
