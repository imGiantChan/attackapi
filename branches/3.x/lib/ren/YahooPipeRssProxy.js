function YahooPipeRssProxy() {
	this.pipe = new YahooPipe('RBCyzKn_2xGwmFFDzKky6g');
}
YahooPipeRssProxy.prototype.proxy = function (callback, url) {
	return this.pipe.run(callback, {url: url});
};
