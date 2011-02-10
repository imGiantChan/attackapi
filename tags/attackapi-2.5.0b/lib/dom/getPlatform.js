
/**
 * @cat DOM
 * @name AttackAPI.dom.getPlatform
 * @desc retrieve the operating system type
 * @return {String} platform name
 */
AttackAPI.dom.getPlatform = function () {
	return navigator.platform.toLowerCase();
};
