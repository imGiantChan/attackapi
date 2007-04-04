
AttackAPI.utils.buildURL = function (obj) {
	var host = obj.host?obj.host:(obj.hostname?obj.hostname:null);
	
	if (!host)
		return '';
	
	var hash = obj.hash?(obj.hash[0] == '#'?obj.hash:'#' + obj.hash):'';
	var password = obj.password?obj.password:'';
	var pathname = obj.pathname?(obj.pathname[0] == '/'?obj.pathname:'/' + obj.pathname):'/';
	var port = obj.port?':' + obj.port:'';
	var protocol = obj.protocol?obj.protocol + '://':'http://';
	var search = obj.search?(obj.search[0] == '?'?obj.search:'?' + obj.search):'';
	var username = obj.username?obj.username:'';
	var creds = (username || password)?username + ':' + password + '@':'';
	
	return protocol + creds + host + (port != ':80'?port:'') + pathname + (search != '?'?search:'') + (hash != '#'?hash:'');
};
