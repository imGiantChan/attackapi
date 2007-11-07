
/**
 * @cat Base
 * @name AttackAPI.buildQuery
 * @desc build a query string from an object. This function is suitable for easily serializing JavaScript objects.
 * @param {Object} o the object to be used
 * @return {String} query string
 * @examples <pre><code>var q = AttackAPI.buildQuery({name: 'Fred', lastName: 'Johnson'});</code></pre>
 * <p>The variable <strong>q</strong> will contain the value of <strong>name=Fred&amp;lastName=Johnson</strong>
 * after <strong>AttackAPI.buildQuery</strong> is called.</p>
 */
AttackAPI.buildQuery = function (o) {
	var t = [];

	for (var i in o) {
		t.push(AttackAPI.encodeURL(i) + '=' + ((o[i] != undefined && o[i] != null) ? AttackAPI.encodeURL(o[i]) : ''));
	}
	
	return t.join('&');
};
