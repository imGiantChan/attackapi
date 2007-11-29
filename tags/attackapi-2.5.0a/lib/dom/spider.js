
AttackAPI.dom.spider = function (o) {
	var urls = [];
	
	function scan(url) {
		AttackAPI.dom.requestXML({url: url, timeout: o.timeout,
			onload: function (response, request) {
				var doc = AttackAPI.dom.parseHTML(response.data);
				console.log(doc);
				var links = doc.getElementsByTagName('a');
				
				for (var i = 0; i < links.length; i++) {
					urls.push(links[i].href);
				}
			}
		});
	}
	
	scan(o.url);
};