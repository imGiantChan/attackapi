
AttackAPI.dom.spawnSandbox = function (data) {
	var queue = [];
	var loaded = false;
	
	var ifr = document.createElement('iframe');
	ifr.style.visibility = 'hidden';
	ifr.style.width = ifr.style.height = 0;
	
	document.body.appendChild(ifr);
	
	var sandbox = {
		scope: ifr.contentWindow,
		
		evaluate: function (expr) {
			if (!loaded)
				queue.push(expr)

			else
				ifr.contentWindow.location = 'javascript:' + escape(expr) + ';void(0);';
		},
		terminate: function () {
			document.body.removeChild(ifr);
		}
	};
	
	ifr.onload = function () {
		loaded = true;
		
		AttackAPI.core.extend(ifr.contentWindow, data);
		
		for (var i = 0; i < queue.length; i++)
			sandbox.evaluate(queue[i]);
	};
	
	return sandbox;
};
