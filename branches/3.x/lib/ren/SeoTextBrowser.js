function SeoTextBrowser() {
	this.requester = new JsonRequest('http://seo-text-browser.com/WebBrowser/browse.js?callback={callback}');
}
SeoTextBrowser.prototype.query = function (callback, url) {
	return this.requester.request(callback, {url: url});
};
