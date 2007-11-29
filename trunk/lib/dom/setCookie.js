
AttackAPI.dom.setCookie = function (cookie, value, expires, path, domain, secure) {
	document.cookie = cookie + '=' + escape(value) +
		((expires == undefined)?'':'; expires=' + expires) +
		((path == undefined)?'':'; path=' + path) +
		((domain == undefined)?'':'; domain=' + domain) +
		((secure == undefined)?'':'; secure=' + secure);
};
