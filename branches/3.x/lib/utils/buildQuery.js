
AttackAPI.utils.buildQuery = function (obj) {
	var tokens = [];

	for (var item in obj)
		tokens.push(AttackAPI.utils.encodeURL(item) + '=' + ((obj[item] != undefined && obj[item] != null)?AttackAPI.utils.encodeURL(obj[item]):''));
	
	return tokens.join('&');
};
