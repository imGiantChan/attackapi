
/**
 * @name AttackAPI.utils.range2net
 * @desc convert range to network
 * @param {Object} range the range to convert
 * @return {String} converted range
 */
AttackAPI.utils.range2net = function (range) {
	return AttackAPI.utils.number2ip(range.start) + '-' + AttackAPI.utils.number2ip(range.stop);
};