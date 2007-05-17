
/**
 * @cat Base
 * @name AttackAPI.encodeURL
 * @desc URL encode string
 * @param {String} url the url to encode
 * @return {String} url encoded string
 * @todo this one should be generic
 */
AttackAPI.encodeURL = function (url) {
	return escape(url);
};