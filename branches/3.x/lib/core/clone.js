
/**
 * @cat Core
 * @name AttackAPI.clone
 * @desc clone object. The function simply hard copies an object into another.
 * @param {Object} o the object to clone
 * @return {Object} cloned object
 * @example Here is a simple example how the clone function works:
 * <pre><code>var clonedObject = AttackAPI.clone(objectToClone);</code></pre>
 * From the code listing above, 'objectToClone' is cloned into 'clonedObject'.
 */
AttackAPI.clone = function (o) {
	function c(o) {
		for (var i in o) {
			this[i] = o[i];
		}
	}

	return new c(o);
};
