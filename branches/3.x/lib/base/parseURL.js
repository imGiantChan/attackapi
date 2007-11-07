
/**
 * @cat Base
 * @name AttackAPI.parseURL
 * @desc parse URL into a object.
 * @param {String} url the url to parse
 * @return {Object} parsed url object
 * @todo this function is a mess, someone needs to fix it
 * @examples <pre><code>var o = AttackAPI.parseURL('http://gnucitizen.org')</code></pre>
 * <p>results in a URL object which have the following list of properties: href, username,
 * password, port, protocol, host, hostname, pathname, search, hash.</p>
 */
AttackAPI.parseURL = function (url) {
	var REGEX = /^((\w+):\/\/)?((\w+):?(\w+)?@)?([^\/\?:]+):?(\d+)?(\/?[^\?#]+)?\??([^#]+)?#?(\w*)/;
	
	var fields = {'href': 0, 'username' : 4, 'password' : 5, 'port' : 7, 'protocol' : 2, 'host' : 6, 'hostname' : 6, 'pathname' : 8, 'search' : 9, 'hash' : 10};
	var result = new Object();
	var r = REGEX.exec(url);
	
	for (var field in fields) {
		result[field] = r[fields[field]];
	}
	
	result.hash = result.hash?'#' + result.hash:'#';
	result.username = result.username?result.username:'';
	result.password = result.password?result.password:'';
	result.search = result.search?'?' + result.search:'?';
	result.pathname = result.pathname?result.pathname:'/';
	
	if (result.port == undefined) {
		switch (result.protocol) {
			case 'http':
				result.port = 80;
				break;
			case 'https':
				result.port = 443;
				break;
			case 'ftp':
				result.port = 21;
				break;
			default:
				result.port = '';
				break;
		}
	}
	
	return result;
};
