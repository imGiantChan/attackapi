
/**
 * @cat Base
 * @name AttackAPI.parseJSON
 * @desc pare JSON strings. This function is the opposite of AttackAPI.buildJSON. Keep in mind that
 * the function simply verifies whether the input is trusted with the help of the isSafe parameter
 * and then simply evaluates the string s content.
 * @param {String} s the JSON string
 * @param {Boolean} isSafe is string safe
 * @return {Object} parsed JSON object
 * @examples <pre><code>var o = AttackAPI.parseJSON('{name: "Fred", lastName: "Johnson"}', true);</code></pre>
 * <p>results into an object <strong>o</strong> which have properties <strong>name</strong> and <strong>lastName</strong>.</p>
 */
AttackAPI.parseJSON = function (s, isSafe) {
	var isSafe = (isSafe != undefined) ? isSafe : false;
	
	if (isSafe && !/^("(\\.|[^"\\\n\r])*?"|[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t])+?$/.test(s)) {
		return null;
	}
		
	return eval('(' + s + ')');
};
