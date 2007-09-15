function SeoTextBrowserProxy() {
	this.browser = new SeoTextBrowser();
}
SeoTextBrowserProxy.prototype.proxy = function (callback, url) {
	return this.browser.query(function (data) {
		callback.call(callback, data.content);
	}, url);
};
