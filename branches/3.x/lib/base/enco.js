
/**
 * @name AttackAPI.Encoder['Base64']
 * @desc base64 encode/decode util
 * @extend AttackAPI.Encoder
 */
AttackAPI.Encoder['::Base64'] = AttackAPI.Encoder.extend({
	/**
	 * @name AttackAPI.Encoder['::Base64'].base64charset
	 * @desc the base64 charset
	 */
	base64charset: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
	/**
	 * @name AttackAPI.Encoder['::Base64'].prototype.encode
	 * @desc encode base64 string
	 * @param String input string to encode
	 */
	encode: function (input) {
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
			
			if (isNaN(chr2))
				enc3 = enc4 = 64;
			else if (isNaN(chr3))
				enc4 = 64;
				
			result += this.base64charset.charAt(enc1)
			       +  this.base64charset.charAt(enc2)
			       +  this.base64charset.charAt(enc3)
				   +  this.base64charset.charAt(enc4);
		} while (i < input.length);

		return result;
	},
	/**
	 * @name AttackAPI.Encoder['::Base64'].prototype.decode
	 * @desc decode base64 string
	 * @param String input string to decode
	 */
	decode: function (input) {
		var result = '';
		var chr1, chr2, chr3;
		var enc1, enc2, enc3, enc4;
		var i = 0;
		
		var input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');
		
		do {
			enc1 = this.base64charset.indexOf(input.charAt(i++));
			enc2 = this.base64charset.indexOf(input.charAt(i++));
			enc3 = this.base64charset.indexOf(input.charAt(i++));
			enc4 = this.base64charset.indexOf(input.charAt(i++));
			
			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;
			
			result += String.fromCharCode(chr1);
			
			if (enc3 != 64)
				result += String.fromCharCode(chr2);
				
			if (enc4 != 64)
				result += String.fromCharCode(chr3);
		} while (i < input.length);
		
		return result;
	}
});

/**
 * @name AttackAPI.Encoder['URL']
 * @desc url encode/decode util
 * @extend AttackAPI.Encoder
 */
AttackAPI.Encoder['::URL'] = AttackAPI.Encoder.extend({
	/*
	 * @name AttackAPI.Encoder['::URL'].prototype.encode
	 * @desc encode a string
	 * @param String input a string to encode
	 */
	encode: function (input) {
		// TODO: platform independent implementation required
		return escape(input);
	},
	/*
	 * @name AttackAPI.Encoder['::URL'].prototype.encode
	 * @desc decode a string
	 * @param String input a string to decode
	 */
	decode: function (input) {
		// TODO: platform independent implementation required
		return unescape(input);
	}
});

/**
 * @name AttackAPI.Encoder['::JSON']
 * @desc JSON encode/decode util
 * @extend AttackAPI.Encoder
 */
AttackAPI.Encoder['::JSON'] = AttackAPI.Encoder.extend({
	/*
	 * @name AttackAPI.Encoder['::JSON'].prototype.escapeS
	 * @desc escape string
	 * @param String str the string to escape
	 */
	escapeS: function (str) {
		return ('"' + str.replace(/(["\\])/g, '\\$1') + '"')
			.replace(/[\f]/g, "\\f")
			.replace(/[\b]/g, "\\b")
			.replace(/[\n]/g, "\\n")
			.replace(/[\t]/g, "\\t")
			.replace(/[\r]/g, "\\r");
	},
	/*
	 * @name AttackAPI.Encoder['::JSON'].prototype.encode
	 * @desc encode an object
	 * @param Object o an object to encode
	 */
	encode: function (o) {
		var type = typeof(o);
		
		if (typeof(o.toJSON) == 'function')
			return o.toJSON();
		else if (type == 'string')
			return this.escapeS(o);
		else if (o instanceof Array) {
			var a = [];
			
			for (i = 0; i < o.length; i ++)
				a.push(this.encode(o[i]));
			
			return '[' + a.join(',') + ']';
		} else if (type == 'object') {
			var a = [];
			
			for (var i in o)
				a.push(this.escapeS(i) + ':' + this.encode(o[i]));
			
			return '{' + a.join(',') + '}';
		} else
			return o.toString();
	},
	/*
	 * @name AttackAPI.Encoder['::JSON'].prototype.encode
	 * @desc decode a string
	 * @param String input a string to decode
	 */
	decode: function (input) {
		// TODO: implement this function
	}
});