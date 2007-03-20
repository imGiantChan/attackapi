
AttackAPI.dom.searchGoogle = function (request) {
	if (request.query == undefined && typeof(request.onresults) != 'function')
		return;

	if (AttackAPI.dom.searchGoogle.callbacks == undefined)
		AttackAPI.dom.searchGoogle.callbacks = new Array();
		
	AttackAPI.dom.searchGoogle.callbacks['callback' + AttackAPI.dom.searchGoogle.callbacks.length] = function () {
		delete AttackAPI.dom.searchGoogle.callbacks['callback' + AttackAPI.dom.searchGoogle.callbacks.length];
		request.onresults.apply(request, arguments);
	};
	
	AttackAPI.dom.requestJSL('http://www.google.com/uds/GwebSearch?' + AttackAPI.dom.buildQuery({
		callback: 'AttackAPI.dom.searchGoogle.callbacks.callback' + AttackAPI.dom.searchGoogle.callbacks.length,
		context: (request.context != undefined)?request.context:0,
		key: (request.key != undefined)?request.key:'internal-documentation',
		lstkp: 0, rsz: 'large', hl: 'en', v: '0.1', q: request.query}));
};
