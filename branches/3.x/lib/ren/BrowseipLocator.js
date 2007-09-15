function BrowseipLocator() {
	this.proxy = new YahooPipeXmlProxy();
}
BrowseipLocator.prototype.locate = function (callback, ip) {
	var base = 'http://www.browseip.com/xml?host=' + escape(ip);
	return this.proxy.proxy(callback, base);
};
