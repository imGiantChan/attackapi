
/**
 * @cat Base
 * @name AttackAPI.range2net
 * @desc convert range to network
 * @param {Object} range the range to convert
 * @return {String} converted range
 */
AttackAPI.range2net = function (range) {
	return this.number2ip(range.start) + '-' + this.number2ip(range.stop);
};