
/**
 * @name AttackAPI.utils.parseJSON
 * @desc pare JSON string
 * @param {String} input the JSON string
 * @param {Boolean} isSafe is string safe
 * @return {Object} parsed JSON object
 */
AttackAPI.utils.parseJSON = function (input, isSafe) {
	var isSafe = (isSafe != undefined)?isSafe:false;
	
	if (isSafe && !/^("(\\.|[^"\\\n\r])*?"|[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t])+?$/.test(input)) {
		return null;
	}
		
	return eval('(' + input + ')');
};