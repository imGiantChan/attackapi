
/**
 * @cat Core
 * @name AttackAPI.clone
 * @desc clone object
 * @param {Object} o the object to clone
 * @return {Object} cloned object
 */
AttackAPI.clone = function (o) {
	function c(o) {
		for (var i in o) {
			this[i] = o[i];
		}
	}

	return new c(o);
};
