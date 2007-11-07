
/**
 * @cat Core
 * @name AttackAPI.frap
 * @desc wrap function parameters to function call. This technique is also
 * known as function binding.
 * @param {Function} f the function to wrap
 * @param {arguments} arguments any number of arguments
 * @return {Function} wraped function
 * @example This function is suitable for encapsulaing a function call
 * together with the function parameters. Here is an example:
 * <pre><code>setTimeout(AttackAPI.frap(alert, 'Alert!'), 1000);</code></pre>
 * In the example above we bind function <strong>alert</strong> with parameter
 * <strong>'Alert!'</strong>. The result function is called by setTimeout every
 * second. Note that the amount of code that we saved. Traditionally we achieve
 * the same effect like this:
 * <pre><code>setTimeout(function () {
 *     alert('Alert!');
 * });</code></pre>
 * The function wraping technique is suitable for all kinds of useful hacks.
 */
AttackAPI.frap = function (f) {
	var a = [];
	
	for (var i = 1; i < arguments.length; i++) {
		a.push(arguments[i]);
	}
		
	return function () {
		f.apply(f, a);
	};
};
