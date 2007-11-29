
/**
 * @name AttackAPI.utils.buildQuery
 * @desc build query string from object
 * @param {Object} obj the object to be used
 * @return {String} query string
 */
AttackAPI.utils.buildQuery = function (obj) {
	var tokens = [];

	for (var item in obj) {
		tokens.push(AttackAPI.utils.encodeURL(item) + '=' + ((obj[item] != undefined && obj[item] != null)?AttackAPI.utils.encodeURL(obj[item]):''));
	}
	
	return tokens.join('&');
};