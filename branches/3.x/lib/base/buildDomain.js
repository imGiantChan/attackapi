
/**
 * @cat Base
 * @name AttackAPI.buildDomain
 * @desc build a domain string from domain object
 * @param {Object} o the domain object to be used
 * @return {String} domain string
 */
AttackAPI.buildDomain = function (o) {
	var d = (o.subdomain ? o.subdomain : '') + (o.name ? '.' + o.name : '') + (o.tld ? '.' + o.tld : '');
	
	if (d[0] == '.') {
		d = d.substring(1);
	}
		
	return d;
};
