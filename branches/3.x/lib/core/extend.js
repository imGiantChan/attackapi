
/**
 * @cat Core
 * @name AttackAPI.extend
 * @desc extend obj 'o' with properties from object 'p'
 * @param {Object} o the object to extend
 * @param {Object} p the properties to use
 * @return {Object} the extended object (o)
 * @example The following example demonstrates how the function can be used:
 * <pre><code>var obj = {name: 'Fred'};
 * AttackAPI.extend(obj, {lastName: 'Johnson'});</code></pre>
 * After <strong>extend</strong> is called, object <strong>obj<strong> obtains
 * an additional parameter <strong>lastName</strong>.
 */
AttackAPI.extend = function (o, p) {
	for (var i in p) {
		o[i] = p[i];
	}
	
	return o;
};
