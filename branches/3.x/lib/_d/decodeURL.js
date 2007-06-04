
/**
 * @cat DOM
 * @name AttackAPI.decodeURL
 * @desc decode URL
 * @param {String} url the url to decode
 * @return {String} URL decoded string
 */
AttackAPI.decodeURL = function (url) {
	return unescape(url);
};