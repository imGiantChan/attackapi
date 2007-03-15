
AttackAPI.utils.parseQuery = function (query) {
	var queryobj = new Object();
	var tokens = query.split('&');
	
	for (var index = 0; index < tokens.length; index++) {
		var pair = tokens[index].split('=');
		queryobj[AttackAPI.utils.decodeURL(pair[0])] = AttackAPI.utils.decodeURL(pair[1]);
	}
		
	return queryobj;
};
