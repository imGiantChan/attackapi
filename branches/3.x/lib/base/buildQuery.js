
/**
 * @cat Base
 * @name AttackAPI.buildQuery
 * @desc build query string from object
 * @param {Object} obj the object to be used
 * @return {String} query string
 */
AttackAPI.buildQuery = function (obj) {
	var tokens = [];

	for (var item in obj) {
		tokens.push(this.encodeURL(item) + '=' + ((obj[item] != undefined && obj[item] != null)?this.encodeURL(obj[item]):''));
	}
	
	return tokens.join('&');
};