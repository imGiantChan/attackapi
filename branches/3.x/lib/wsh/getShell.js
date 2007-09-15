
/**
 * @cat WSH
 * @name AttackAPI.wsh.getShell
 * @desc get WScript shell
 * @return {Object} WScript.Shell
 */
AttackAPI.wsh.getShell = function () {
	return WScript.CreateObject('WScript.Shell');
};
