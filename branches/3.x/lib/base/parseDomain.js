
/**
 * @cat Base
 * @name AttackAPI.parseDomain
 * @desc parse domain into object
 * @param {String} d domain to parse
 * @return {Object} parsed domain object
 */
AttackAPI.parseDomain = function (d) {
	var t = d.split('.').reverse();
	return {domain: d, tld: t[0], name: t[1], subdomain: t.slice(2).reverse().join('.')};
};
