
/**
 * @name AttackAPI.utils.buildDomain
 * @desc build a domain string from domain object
 * @param {Object} obj the domain object to be used
 * @return {String} domain string
 */
AttackAPI.utils.buildDomain = function (obj) {
	var domain = (obj.subdomain?obj.subdomain:'') + (obj.name?'.' + obj.name:'') + (obj.tld?'.' + obj.tld:'');
	
	if (domain[0] == '.') {
		domain = domain.substring(1);
	}
		
	return domain;
};