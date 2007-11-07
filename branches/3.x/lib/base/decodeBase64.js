
/**
 * @cat Base
 * @name AttackAPI.decodeBase64
 * @desc decodes base64 encoded input string.
 * @param {String} input the string to decode
 * @return {String} decoded string
 * @examples <pre><code>var s = AttackAPI.decodeBase64('Z251Y2l0aXplbi5vcmc=')</code></pre>
 * <p>results into string <strong>'gnucitizen.org'</strong>.</p>
 */
AttackAPI.decodeBase64 = function (input) {
	var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
	
	var result = '';
	var chr1, chr2, chr3;
	var enc1, enc2, enc3, enc4;
	var i = 0;

	var input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');

	do {
		enc1 = chars.indexOf(input.charAt(i++));
		enc2 = chars.indexOf(input.charAt(i++));
		enc3 = chars.indexOf(input.charAt(i++));
		enc4 = chars.indexOf(input.charAt(i++));

		chr1 = (enc1 << 2) | (enc2 >> 4);
		chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
		chr3 = ((enc3 & 3) << 6) | enc4;

		result += String.fromCharCode(chr1);

		if (enc3 != 64) {
			result += String.fromCharCode(chr2);
		}
		
		if (enc4 != 64) {
			result += String.fromCharCode(chr3);
		}
	} while (i < input.length);
	
	return result;
};
