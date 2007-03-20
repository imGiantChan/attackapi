
// needs more work on this function
AttackAPI.utils.parseJSON = function (input, isSafe) {
	var isSafe = (isSafe != undefined)?isSafe:false;
	
	if (isSafe && !/^("(\\.|[^"\\\n\r])*?"|[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t])+?$/.test(input))
		return null;
		
	return eval('(' + input + ')');
};