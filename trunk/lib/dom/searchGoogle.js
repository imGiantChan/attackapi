
AttackAPI.dom.searchGoogle = function (query) {
	AttackAPI.dom.requestJSON({
		url: 'http://www.google.com/uds/GwebSearch',
		query: {
			context: (query.context != undefined)?query.context:0,
			key: (query.key != undefined)?query.key:'internal-documentation',
			lstkp: 0, rsz: 'large', hl: 'en', v: '0.1', q: query.query
		},
		oncallback: query.onresults});
};