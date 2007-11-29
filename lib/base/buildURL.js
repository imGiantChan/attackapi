
/**
 * @cat Base
 * @name AttackAPI.buildURL
 * @desc build an url from an url object. The url object may contain the following properties: host, hostname, hash, password, pathname,
 * port, protocol, search, username, search. Keep in mind that all properties can be omitted, apart from host or hostname.
 * @param {Object} o the object to be used
 * @return {String} url string
 * @examples <pre><code>var u = AttackAPI.buildURL({hostname: 'gnucitizen.org'})</code></pre>
 * <p>will result into string <strong>'http://gnucitizen.org'</strong>.</p>
 */
AttackAPI.buildURL = function (o) {
	var host = o.host ? o.host : (o.hostname ? o.hostname : null);

	if (!host) {
		return '';
	}

	var protocol = o.protocol ? (o.protocol.match(/http|https|ftp|file|chrome/) ? o.protocol + '://' : o.protocol) : 'http://';

	var username = o.username ? o.username : '';
	var password = o.password ? o.password : '';
	var creds = (username || password) ? username + ':' + password + '@' : '';

	var port = o.port ? ':' + o.port : '';

	var pathname = o.pathname ? (o.pathname[0] == '/' ? o.pathname : '/' + o.pathname) : '/';
	var search = o.search ? (o.search[0] == '?' ? o.search : '?' + o.search) : '';
	var hash = o.hash ? (o.hash[0] == '#' ? o.hash : '#' + o.hash) : '';

	return protocol + creds + host + (port != ':80' ? port : '') + pathname + (search != '?' ? search : '') + (hash != '#' ? hash : '');
};
