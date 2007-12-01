
/**
 * @cat Base
 * @name AttackAPI.trimString
 * @desc trim string
 * @param {String} s the string to trim
 * @return {String} trimmed text
 */
AttackAPI.trimString = function (s) {
	return s.replace(/^\s+|\s+$/, '');
};
