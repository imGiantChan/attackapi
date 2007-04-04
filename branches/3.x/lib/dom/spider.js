
AttackAPI.dom.spider = function (spider) {
	AttackAPI.dom.requestXML({url: spider.url, timeout: spider.timeout,
		onload: function (response, request) {
			// analise and return all possible links
		}
	});
};