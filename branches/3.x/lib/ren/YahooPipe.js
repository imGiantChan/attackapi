function YahooPipe(id) {
	this.id = id;
	this.requester = new JsonRequest('http://pipes.yahoo.com/pipes/pipe.run?_render=json&_callback={callback}&_id=' + escape(id));
}
YahooPipe.prototype.run = function (callback, parameters) {
	var parameters = parameters;
	parameters['_r'] = (new Date).getTime();

	return this.requester.request(function (data) {
		callback.call(callback, data.value.items);
	}, parameters);
};
