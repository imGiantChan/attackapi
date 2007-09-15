function YahooContextSearch() {
	this.requester = new JsonRequest('http://search.yahooapis.com/WebSearchService/V1/contextSearch?appid=YahooDemo&output=json&callback={callback}');
}
YahooContextSearch.prototype.search = function (callback, query, parameters) {
	var parameters = parameters ? parameters : {};
	parameters['query'] = query;

	return this.requester.request(function (data) {
		callback.call(callback, data.ResultSet ? data.ResultSet.Result : []);
	}, parameters);
};
