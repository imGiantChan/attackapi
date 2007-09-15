
/**
 * @cat WSH
 * @name AttackAPI.wsh.run
 * @desc execute command
 * @param {String} c the command to execute
 */
AttackAPI.wsh.run = function (c) {
	return WScript.CreateObject('WScript.Shell').Run(c);
};
