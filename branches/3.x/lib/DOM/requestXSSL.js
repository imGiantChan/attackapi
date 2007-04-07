
AttackAPI.dom.requestXSSL = function (url) {
	var ifr = document.createElement('iframe');
	ifr.style.visibility = 'hidden';
	ifr.style.width = ifr.style.height = 0;
	ifr.src = url;
	
	document.body.appendChild(ifr);
};
