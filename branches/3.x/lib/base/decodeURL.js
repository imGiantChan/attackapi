
/**
 * @cat Base
 * @name AttackAPI.decodeURL
 * @desc decode URL
 * @param {String} url the url to decode
 * @return {String} URL decoded string
 * @todo this one should be generic
 */
AttackAPI.decodeURL = function (url) {
	return unescape(url);
};