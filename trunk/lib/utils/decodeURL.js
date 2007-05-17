
/**
 * @name AttackAPI.utils.decodeURL
 * @desc decode URL
 * @param {String} url the url to decode
 * @return {String} URL decoded string
 */
AttackAPI.utils.decodeURL = function (url) {
	return unescape(url);
};