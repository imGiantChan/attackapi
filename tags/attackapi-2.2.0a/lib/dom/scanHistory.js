
AttackAPI.dom.scanHistory = function (scan) {
	var urls = (scan.urls != undefined)?scan.urls:AttackAPI.dom.signatures.sites;
	
	var ifr = document.createElement('iframe');
	ifr.style.visibility = 'hidden';
	ifr.style.width = ifr.style.height = 0;
	
	document.body.appendChild(ifr);
	
	var doc = AttackAPI.dom.getDocument(ifr);
	doc.open();
	doc.write('<style>a:visited{display: none}</style>');
	doc.close();
	
	for (var i = 0; i < urls.length; i++) {
		var a = doc.createElement('a');
		a.href = urls[i];
		
		doc.body.appendChild(a);
		
		if (a.currentStyle)
			var display = a.currentStyle['display'];
		else
			var display = doc.defaultView.getComputedStyle(a, null).getPropertyValue('display')
			
		if (display == 'none' && typeof(scan.onfound) == 'function')
			scan.onfound(urls[i], scan);
	}
	
	document.body.removeChild(ifr);
	
	if (typeof(scan.oncomplete) == 'function')
		scan.oncomplete(scan);
};
