function YahooSiteExplorerPageData() {
	this.requester = new JsonRequest('http://search.yahooapis.com/SiteExplorerService/V1/pageData?appid=YahooDemo&output=json&callback={callback}');
}
YahooSiteExplorerPageData.prototype.query = function (callback, query, size, start) {
	return this.requester.request(function (data) {
		callback.call(callback, data.ResultSet?data.ResultSet.Result:[]);
	}, {query: query, results: size?size:100, start: start?start:1});
};
