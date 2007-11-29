
AttackAPI.dom.scanStates = function (scan) {
	var signatures = (scan.signatures != undefined)?scan.signatures:AttackAPI.dom.signatures.states;
	var timeout = (scan.timeout != undefined)?scan.timeout:5000;
	var timers = [];
	var count = 0;
	
	var sandbox = AttackAPI.dom.spawnSandbox({
		onerror: function (message, url, line) {
			count += 1;
			
			for (var i = 0; i < signatures.length; i++)
				if ((!signatures[i].message || new RegExp(signatures[i].message).exec(message)) && (!signatures[i].url || signatures[i].url == url) && (signatures[i].line == undefined || signatures[i].line == line)) {
					window.clearTimeout(timers[i]);
					
					if (typeof(scan.onfound) == 'function')
						scan.onfound(signatures[i], scan);
						
					break;
				}
				
			if (count == signatures.length && typeof(scan.oncomplete) == 'function') {
				scan.oncomplete();
				sandbox.terminate();
			}
			
			return true;
		},
		inject: function(url) {
			var script = sandbox.scope.document.createElement('script');
			script.type = 'text/javascript';
			script.defer = true;
			script.src = url;
			
			sandbox.scope.document.body.appendChild(script);
		}
	});
	
	for (var i = 0; i < signatures.length; i++) {
		sandbox.evaluate("inject('" + signatures[i].url + "')");
		timers.push(window.setTimeout(AttackAPI.core.bindFunction(function (signature) {
			count += 1;
			
			if (typeof(scan.ontimeout) == 'function')
				scan.ontimeout(signature);
			
			if (count == signatures.length) {
				sandbox.terminate();
				
				if (typeof(scan.oncomplete) == 'function')
					scan.oncomplete();
			}
		}, signatures[i]), timeout));
	}
};
