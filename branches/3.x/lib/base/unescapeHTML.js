
/**
 * @cat Base
 * @name AttackAPI.unescapeHTML
 * @desc unescapes strings. This function is the reverse of AttackAPI.escapeHTML.
 * @param {String} s the string to unescape
 * @return {String} unescaped string
 * @examples <pre><code>AttackAPI.unescapeHTML('&amp;lt;test&amp;gt;')</code></pre>
 * <p>results into a string '&lt;test&gt;'</p>
 * @todo add more entities
 */
AttackAPI.unescapeHTML = function (s) {
	return s.replace('&lt;', '<');
	        .replace('&gt;', '>');
};
