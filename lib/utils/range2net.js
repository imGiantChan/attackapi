
AttackAPI.utils.range2net = function (range) {
	return AttackAPI.utils.number2ip(range.start) + '-' + AttackAPI.utils.number2ip(range.stop);
};
