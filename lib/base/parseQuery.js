
/**
 * @cat Base
 * @name AttackAPI.parseQuery
 * @desc parse Query into an object. This function is the revers of buildQuery.
 * @param {String} query the query to parse
 * @return {Object} parsed string object
 * @examples <pre><code>var o = AttackAPI.parseQuery('name=Fred&lastName=Johnson')</code></pre>
 * <p>will result into an object <strong>o</strong> with properties <strong>name</strong> and
 * <strong>lastName</strong>.</p>
 */
AttackAPI.parseQuery = function (q) {
	var o = {};
	var t = q.split('&');

	for (var i = 0; i < t.length; i++) {
		var p = t[i].split('=');
		o[this.decodeURL(p[0])] = this.decodeURL(p[1]);
	}

	return o;
};
