
/**
 * @cat Core
 * @name AttackAPI.core.extend
 * @desc extend obj with properties
 * @param {Object} obj
 * @param {Object} properties
 * @return {Object} the extended object
 */
AttackAPI.core.extend = function (obj, properties) {
	for (var item in properties) {
		obj[item] = properties[item];
	}
	
	return obj;
};