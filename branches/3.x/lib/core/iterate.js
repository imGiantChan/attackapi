
/**
 * @cat Core
 * @name AttackAPI.iterate
 * @desc construct simple iterator for object 'o'. The returned object contains method next() which is used to retrieve the next item in sequence.
 * @param {Object} o the object to iterate on
 * @return {Object} iterator
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
