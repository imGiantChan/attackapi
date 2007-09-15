function Hostip() {
	this.proxy = new YahooPipesXmlProxy();
}
Hostip.prototype.query = function (callback, ip) {
	var base = 'http://api.hostip.info/?ip=' + escape(ip);
	return this.proxy.proxy(callback, {url: base});
};
