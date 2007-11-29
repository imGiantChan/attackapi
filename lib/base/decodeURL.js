
/**
 * @cat Base
 * @name AttackAPI.decodeURL
 * @desc decodes URL encodes strings.
 * @param {String} u the url to decode
 * @return {String} URL decoded string
 * @todo requires cross-platform inplementation
 * @examples <pre><code>var u = AttackAPI.decodeURL('gnucitizen.org%20rulez');</code></pre>
 * <p>results into string <strong>'gnucitizen.org rulez'</strong>.</p>
 */
AttackAPI.decodeURL = function (u) {
	return unescape(u);
};
