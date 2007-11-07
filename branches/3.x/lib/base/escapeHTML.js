
/**
 * @cat Base
 * @name AttackAPI.escapeHTML
 * @desc converts HTML meta chars into HTML entities.
 * @param {String} s the text to escape
 * @return {String} escaped string
 * @examples <pre><code>AttackAPI.escapeHTML('&lt;test&gt;');</code></pre>
 * <p>results into string '&amp;lt;test&amp;gt;'</p>
 * @todo add more entities
 */
AttackAPI.escapeHTML = function (s) {
	return s.replace('<', '&lt;')
	        .replace('>', '&gt;');
};
