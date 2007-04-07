
AttackAPI.dom.requestJSL = function (url) {
	var script = document.createElement('script');
	script.defer = true;
	script.type = 'text/javascript';
	script.src = url;
	script.onload = script.onerror = function () {
		document.body.removeChild(script);
	};
	
	document.body.appendChild(script);
};
