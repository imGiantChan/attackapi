
/**
 * @cat WSH
 * @name AttackAPI.run
 * @desc execute command
 * @param {String} c the command to execute
 */
AttackAPI.run = function (c) {
	return WScript.CreateObject('WScript.Shell').Run(c);
};
