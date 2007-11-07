
/**
 * @cat Core
 * @name AttackAPI.iterate
 * @desc construct simple iterator for object 'o'. The returned object
 * contains method 'next()', which is used to retrieve the next item in
 * sequence. The function returns 'null' when there are no more elements in
 * the object.
 * @param {Object} o the object to iterate on
 * @return {Object} iterator
 * @example The function is suitable for iterating over Array like * objects
 * (i.e. the length object member is required). Here is an example:
 * <pre><code>var a = [1,2,3,4,5,6,7,8,9,0];
 * var iterator = AttackAPI.iterate(a);
 * setTimeout(function () {
 *     alert(iterator.next());
 * }, 1000);</code></pre>
 * Notice that we don't have to remember the array position. This operation is
 * handled automaticaly for us.
 */
AttackAPI.iterate = function (o) {
	var i = -1;

	var it = function() {
		return i < 0 ? null : i < o.length ? o[i] : null;
	};
	it.next = function() {
		return (i + 1) < o.length ? o[++i] : null;
	};

	return it;
};
