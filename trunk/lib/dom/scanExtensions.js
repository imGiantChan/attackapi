
AttackAPI.dom.scanExtensions = function (scan) {
	var signatures = (scan.signatures != undefined)?scan.signatures:AttackAPI.dom.signatures.extensions;
	
	function check(signature, index, length) {	
		var img = new Image();
		img.onload = function() {
			if (typeof(scan.onfound) == 'function')
				scan.onfound(signature, scan);

			if (index == length - 1 && typeof(scan.oncomplete) == 'function')
				scan.oncomplete(scan);
		};
		img.onerror = function() {
			if (index == length - 1 && typeof(scan.oncomplete) == 'function')
				scan.oncomplete(scan);
		};
		img.src = signature.url;
	}
	
	for (var i = 0; i < signatures.length; i++)
		check(signatures[i], i, signatures.length);
};
