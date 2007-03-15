
AttackAPI.utils.buildDomain = function (obj) {
	var domain = (obj.subdomain?obj.subdomain:'') + (obj.name?'.' + obj.name:'') + (obj.tld?'.' + obj.tld:'');
	
	if (domain[0] == '.')
		domain = domain.substring(1);
		
	return domain;
};
