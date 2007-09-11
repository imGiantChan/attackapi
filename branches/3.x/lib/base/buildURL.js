
/**
 * @cat Base
 * @name AttackAPI.buildURL
 * @desc build url from url object
 * @param {Object} o the object to be used
 * @return {String} url string
 */
AttackAPI.buildURL = function (o) {
	var host = o.host ? o.host : (o.hostname ? o.hostname : null);
	
	if (!host) {
		return '';
	}
	
	var hash = o.hash ? (o.hash[0] == '#' ? o.hash : '#' + o.hash) : '';
	var password = o.password ? o.password : '';
	var pathname = o.pathname ? (o.pathname[0] == '/' ? o.pathname : '/' + o.pathname) : '/';
	var port = o.port ? ':' + o.port : '';
	var protocol = o.protocol ? o.protocol + '://' : 'http://';
	var search = o.search ? (o.search[0] == '?' ? o.search : '?' + o.search) : '';
	var username = o.username ? o.username : '';
	var creds = (username || password) ? username + ':' + password + '@' : '';
	
	return protocol + creds + host + (port != ':80' ? port : '') + pathname + (search != '?' ? search : '') + (hash != '#' ? hash : '');
};
