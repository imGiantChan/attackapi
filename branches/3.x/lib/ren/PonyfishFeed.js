function PonyfishFeed(id) {
	this.id = id;
	this.proxy = new YahooPipeRssProxy();
}
PonyfishFeed.prototype.fetch = function (callback) {
	var base = 'http://www.ponyfish.com/feeds/' + escape(this.id);
	return this.proxy.proxy(callback, base);
};
