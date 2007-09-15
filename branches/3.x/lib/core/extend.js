
/**
 * @cat Core
 * @name AttackAPI.extend
 * @desc extend obj 'o' with properties from object 'p'
 * @param {Object} o the object to extend
 * @param {Object} p the properties to use
 * @return {Object} the extended object (o)
 */
AttackAPI.extend = function (o, p) {
	for (var i in p) {
		o[i] = p[i];
	}
	
	return o;
};
