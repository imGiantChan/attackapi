AttackAPI.GoogleSearch = {};
AttackAPI.GoogleSearch.callbacks = {};
AttackAPI.GoogleSearch.search = function (callback, query, key, context) {
	var key = (key == undefined)?'internal-documentation':key;
	var context = (context == undefined)?0:context;
	var index = (AttackAPI.GoogleSearch.callbacks.index == undefined)?1:AttackAPI.GoogleSearch.callbacks.index + 1;
	
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.defer = true;
	script.src = 'http://www.google.com/uds/GwebSearch?callback=AttackAPI.GoogleSearch.callbacks.callback' + index + '&context=' + context + '&lstkp=0&rsz=large&hl=en&q=' + query + '&key=' + key + '&v=0.1';
	
	AttackAPI.GoogleSearch.callbacks['callback' + index] = function (context, results, status) {
		document.body.removeChild(script);
		delete AttackAPI.GoogleSearch.callbacks['callback' + index];
		callback(results, query, key, context, status);
	};
	
	document.body.appendChild(script);
	AttackAPI.GoogleSearch.callbacks.index = index;
};
