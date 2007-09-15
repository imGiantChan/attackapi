function GoogleWebSearch() {
	this.requester = new JsonRequest('http://www.google.com/uds/GwebSearch?callback={callback}&rsz=large&v=0.1&context=0');
}
GoogleWebSearch.prototype.search = function (callback, query, parameters) {
	var parameters = parameters ? parameters : {};
	parameters['q'] = query;
	parameters['key'] = parameters['key'] ? parameters['key'] : 'internal-documentation';

	return this.requester.request(function (c, data) {
		callback.call(callback, data.results);
	}, parameters);
};
