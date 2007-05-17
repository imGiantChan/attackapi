
/**
 * @name AttackAPI.utils.parseDomain
 * @desc parse domain into object
 * @param {String} domain
 * @return {Object} parsed domain object
 */
AttackAPI.utils.parseDomain = function (domain) {
	var tokens = domain.split('.').reverse();
	return {domain: domain, tld: tokens[0], name: tokens[1], subdomain: tokens.slice(2).reverse().join('.')};
};