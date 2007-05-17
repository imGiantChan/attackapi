
/**
 * @cat DOM
 * @name AttackAPI.encodeURL
 * @desc URL encode string
 * @param {String} url the url to encode
 * @return {String} url encoded string
 */
AttackAPI.encodeURL = function (url) {
	return escape(url);
};