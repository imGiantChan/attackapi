AttackAPI.HistoryDumper = {};
AttackAPI.HistoryDumper.lazyDump = function (callback, links) {
	var iframe = document.createElement('iframe');
	iframe.style.visibility = 'hidden';
	document.body.appendChild(iframe);
	
	var doc = iframe.contentDocument;
	if (doc == undefined) doc = iframe.contentWindow.document;
		
	doc.open();
	doc.write('<style>a:visited{display: none}</style>');
	doc.close();
	
	for (index = 0; index < links.length; index++) {
		var testLink = doc.createElement('a');
		testLink.href = links[index];
		doc.body.appendChild(testLink);
		
		if (testLink.currentStyle) var display = testLink.currentStyle['display'];
		else var display = doc.defaultView.getComputedStyle(testLink, null).getPropertyValue('display')
			
		callback(links[index], display == 'none'?true:false);
	}
	
	document.body.removeChild(iframe);
};
