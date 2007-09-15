function DapperDapp(id) {
	this.id = id;
	this.requester = new JsonRequest('http://www.dapper.net/transform.php?dappName=' + escape(id) + '&transformer=JSON&extraArg_callbackFunctionWrapper={callback}');
}
DapperDapp.prototype.run = function (callback, url, parameters) {
	if (typeof(parameters) == 'undefined') {
		var parameters = {};
	}

	parameters['applyToUrl'] = url;

	return this.requester.request(function (data) {
		callback.call(callback, data.groups);
	}, parameters);
};
