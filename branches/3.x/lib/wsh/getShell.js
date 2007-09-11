
/**
 * @cat WSH
 * @name AttackAPI.getShell
 * @desc get WScript shell
 * @return {Object} WScript.Shell
 */
AttackAPI.getShell = function () {
	return WScript.CreateObject('WScript.Shell');
};
