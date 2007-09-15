function YahooRelatedSuggestion() {
	this.requester = new JsonRequest('http://search.yahooapis.com/WebSearchService/V1/relatedSuggestion?appid=YahooDemo&output=json&callback={callback}');
}
YahooRelatedSuggestion.prototype.search = function (callback, query, parameters) {
	var parameters = parameters ? parameters : {};
	parameters['query'] = query;

	return this.requester.request(function (data) {
		callback.call(callback, data.ResultSet ? data.ResultSet.Result : []);
	}, parameters);
};
