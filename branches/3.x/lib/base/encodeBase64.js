
/**
 * @cat Base
 * @name AttackAPI.encodeBase64
 * @desc performs a base64 encoding on a string.
 * @param {String} input the string to encode
 * @return {String} base64 encoded string
 * @examples <pre><code>var s = AttackAPI.encodeBase64('gnucitizen.org')</code></pre>
 * <p>results in string <strong>'Z251Y2l0aXplbi5vcmc='</strong>.</p>
 */
AttackAPI.encodeBase64 = function (input) {
	var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

	var result = '';
	var chr1, chr2, chr3;
	var enc1, enc2, enc3, enc4;
	var i = 0;
	
	do {
		chr1 = input.charCodeAt(i++);
		chr2 = input.charCodeAt(i++);
		chr3 = input.charCodeAt(i++);
		
		enc1 = chr1 >> 2;
		enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
		enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
		enc4 = chr3 & 63;
		
		if (isNaN(chr2)) {
			enc3 = enc4 = 64;
		} else if (isNaN(chr3)) {
			enc4 = 64;
		}
		
		result += chars.charAt(enc1) + chars.charAt(enc2) + chars.charAt(enc3) + chars.charAt(enc4);
	} while (i < input.length);
	
	return result;
};
