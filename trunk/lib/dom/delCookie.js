
/**
 * @cat DOM
 * @name AttackAPI.dom.delCookie
 * @desc delete cookie
 * @param {String} cookie the cookie name to delete
 */
AttackAPI.dom.delCookie = function (cookie) {
	return document.cookie = name + '=' + null;
};
