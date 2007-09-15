function YahooSiteExplorerPing() {
	this.requester = new JsonRequest('http://search.yahooapis.com/SiteExplorerService/V1/ping?output=json&callback={callback}');
}
YahooSiteExplorerPing.prototype.ping = function (callback, url) {
	return this.requester.request(callback, {sitemap: url});
};
