function JsonRequest(base) {
	this.base = base;
}
JsonRequest.prototype.buildQuery = function (parameters) {
	var query = [];

	for (var key in parameters) {
		query.push(escape(key) + '=' + escape(parameters[key])); 
	}

	return query.join('&');
};
JsonRequest.prototype.loadScript = function (url) {
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = url;

	return document.body.appendChild(script);
};
JsonRequest.prototype.request = function (callback, parameters) {
	var name = 'jsoncallback' + (new Date).getTime() + Math.random().toString().substring(2);

	if (parameters) {
		var query = this.buildQuery(parameters);
	} else {
		var query = '';
	}

	var script;

	window[name] = function () {
		document.body.removeChild(script);

		if (typeof(callback) == 'function') {
			callback.apply(callback, arguments);
		}
	}

	script = this.loadScript(this.base.replace(/{callback}/, name) + '&' + query);
};
