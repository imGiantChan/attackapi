
/**
 * @name AttackAPI.utils.buildJSON
 * @param {Object} o the object to be used
 * @return {String} JSON encoded object
 */
AttackAPI.utils.buildJSON = function (o) {
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
			a.push(AttackAPI.utils.buildJSON(o[i]));
		}
		
		return '[' + a.join(',') + ']';
	} else if (type == 'object') {
		var a = [];
		
		for (var i in o) {
			a.push(escapeS(i) + ':' + AttackAPI.utils.buildJSON(o[i]));
		}
		
		return '{' + a.join(',') + '}';
	} else {
		return o.toString();
	}
};