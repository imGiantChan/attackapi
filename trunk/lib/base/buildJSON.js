
/**
 * @cat Base
 * @name AttackAPI.buildJSON
 * @desc builds a JSON string from an object. The function can be used to sarialize any object into a JSON string.
 * @param {Object} o the object to be used
 * @return {String} JSON encoded object
 * @examples <pre><code>var j = AttackAPI.buildJSON({name: 'Fred', lastName: 'Johnson'})</code></pre>
 * <p>will serialize the JavaScript object into a JSON string.</p>
 */
AttackAPI.buildJSON = function (o) {
	function escapeS(str) {
		return ('"' + str.replace(/(["\\])/g, '\\$1') + '"')
			.replace(/[\f]/g, "\\f")
			.replace(/[\b]/g, "\\b")
			.replace(/[\n]/g, "\\n")
			.replace(/[\t]/g, "\\t")
			.replace(/[\r]/g, "\\r");
	}

	var type = typeof(o);

	if (o == undefined) {
		return 'undefined'
	} else if (typeof(o.toJSON) == 'function') {
		return o.toJSON();
	} else if (type == 'string') {
		return escapeS(o);
	} else if (o instanceof Array) {
		var a = [];

		for (i = 0; i < o.length; i ++) {
			a.push(AttackAPI.buildJSON(o[i]));
		}

		return '[' + a.join(',') + ']';
	} else if (type == 'object') {
		var a = [];

		for (var i in o) {
			a.push(escapeS(i) + ':' + AttackAPI.buildJSON(o[i]));
		}

		return '{' + a.join(',') + '}';
	} else {
		return o.toString();
	}
};
