function GoogleMashup(name) {
	this.name = name;
	this.proxy = new YahooPipeRssProxy();
}
GoogleMashup.prototype.fetchAppFeed = function (callback, name, parameters) {
	if (parameters) {
		var parameters = parameters;
	} else {
		var parameters = {};
	}

	parameters['r'] = (new Date).getTime();

	var base = 'http://' + escape(this.name) + '.googlemashups.com/feeds/app/' + escape(name) + '?' + this.proxy.pipe.requester.buildQuery(parameters);
	return this.proxy.proxy(callback, base);
};
