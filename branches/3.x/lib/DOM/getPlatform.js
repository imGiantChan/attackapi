
/**
 * @cat DOM
 * @name AttackAPI.getPlatform
 * @desc retrieve the operating system type
 * @return {String} platform name
 */
AttackAPI.getPlatform = function () {
	return navigator.platform.toLowerCase();
};