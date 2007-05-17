
/**
 * @cat DOM
 * @name AttackAPI.delCookie
 * @desc delete cookie
 * @param {String} cookie the cookie name to delete
 */
AttackAPI.delCookie = function (cookie) {
	return document.cookie = name + '=' + null;
};