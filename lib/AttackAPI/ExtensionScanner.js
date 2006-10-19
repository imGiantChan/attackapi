AttackAPI.ExtensionScanner = {};
AttackAPI.ExtensionScanner.scan = function (callback, signatures, timeout) {
	var signatures = (signatures == null)?AttackAPI.Signatures.extensions:signatures;
	var timeout = (timeout == null)?100:timeout;
	var checkSingleExtension = function (signature) {
		var img = new Image();
		img.onload = function() {
			if (!img) return;
			img = undefined;
			callback(signature, true)
		};
		img.onerror = function() {
			if (!img) return;
			img = undefined;
			callback(signature, false)
		};
		img.src = signature.src;
		
		setTimeout(img.onerror, timeout);
	};
	
	for (index = 0; index < signatures.length; index++)
		checkSingleExtension(signatures[index]);
};
