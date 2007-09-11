
/**
 * @cat Base
 * @name AttackAPI.buildQuery
 * @desc build query string from object
 * @param {Object} o the object to be used
 * @return {String} query string
 */
AttackAPI.buildQuery = function (o) {
	var t = [];

	for (var i in o) {
		t.push(this.encodeURL(i) + '=' + ((o[i] != undefined && o[i] != null)?this.encodeURL(o[i]):''));
	}
	
	return t.join('&');
};
