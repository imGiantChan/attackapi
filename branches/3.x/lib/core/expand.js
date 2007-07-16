
/**
 * @cat Core
 * @name AttackAPI.expand
 * @desc expand obj with properties
 * @param {Object} o the object to extend
 * @param {Object} p the properties to use
 * @return {Object} the expand object (o)
 */
AttackAPI.expand = function (o, p) {
	var _o = AttackAPI.clone(o);

	for (var i in p) {
		_o[i] = p[i];
	}
	
	return _o;
};
