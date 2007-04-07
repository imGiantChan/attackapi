
/**
 * @name AttackAPI.Class
 * @desc base class utilities
 * @implement __anonymous_
 */
AttackAPI.Class.implement({
	/**
	 * @name AttackAPI.Class.prototype.extend
	 * @desc extend target object with source
	 * @param Object t the target object to extend
	 * @param Object s the source
	 */
	extend: function (t, s) {
		for (var i in s) {
			t[i] = s[i];
		}
	}
});

/**
 * @name AttackAPI.Util
 * @desc base util class, father of all utils
 * @extend AttackAPI.Class 
 */
AttackAPI.Util = AttackAPI.Class.extend({
	/* empty */
});

/**
 * @name AttackAPI.Exploit
 * @desc base exploit class, father of all exploits
 * @extend AttackAPI.Class
 */
AttackAPI.Exploit = AttackAPI.Class.extend({
	/**
	 * @name AttackAPI.Exploit.prototype.run
	 * @desc start the exploit
	 */
	run: function () {
		throw 'not implemented error';
	},
	/**
	 * @name AttackAPI.Exploit.prototype.check
	 * @desc check whether the target is vulnerable
	 */
	check: function () {
		throw 'not implemented error';
	}
});

/**
 * @name AttackAPI.Parser
 * @desc the parser base class, father of all parsers
 * @extend AttackAPI.Class
 */
AttackAPI.Parser = AttackAPI.Class.extend({
	/**
	 * @name AttackAPI.Parser.prototype.parse
	 * @desc parse
	 */
	parse: function () {
		throw 'not implemented error';
	},
	/**
	 * @name AttackAPI.Parser.prototype.build
	 * @desc build
	 */
	build: function () {
		throw 'not implemented error';
	}
});

/**
 * @name AttackAPI.Encoder
 * @desc the encoder base class, father of all encoders
 * @extend AttackAPI.Class
 */
AttackAPI.Encoder = AttackAPI.Class.extend({
	/**
	 * @name AttackAPI.Encoder.prototype.encode
	 * @desc encode
	 */
	encode: function () {
		throw 'not implemented error';
	},
	/**
	 * @name AttackAPI.Encoder.prototype.decode
	 * @desc decode
	 */
	decode: function () {
		throw 'not implemented error';
	}
});