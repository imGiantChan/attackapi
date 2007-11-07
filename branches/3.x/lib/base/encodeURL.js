
/**
 * @cat Base
 * @name AttackAPI.encodeURL
 * @desc URL encode a string.
 * @param {String} u the url to encode
 * @return {String} url encoded string
 * @examples <pre><code>var s = AttackAPI.encodeURL('gnucitizen.org rulez')</code></pre>
 * <p>results into sting <strong>'gnucitizen%20rulez'</strong>.</p>
 * @todo cross-platform implementation required
 */
AttackAPI.encodeURL = function (u) {
	return escape(url);
};
