AttackAPI.NetworkCalculator = {};
AttackAPI.NetworkCalculator.IPToNumber = function (ip) {
	var octets = ip.split('.');
	return (16777216 * octets[0]) + (65536 * octets[1]) + (256 * octets[2]) + Number(octets[3]);
};
AttackAPI.NetworkCalculator.numberToIP = function (number) {
	return Math.floor(number/16777216)%256 + '.' +
	       Math.floor(number/65536)%256 + '.' +
		   Math.floor(number/256)%256 + '.' +
		   Math.floor(number)%256;
};
AttackAPI.NetworkCalculator.CIDRToRange = function (cidr) {
	var tokens = cidr.split('/');
	var start = AttackAPI.NetworkCalculator.IPToNumber(tokens[0]);
	var stop = Math.pow(2, 32 - tokens[1]) + start - 1;
	return {start: start, stop: stop};
};
AttackAPI.NetworkCalculator.RANGEToRange = function (range) {
	var tokens = range.split('-');
	var start = AttackAPI.NetworkCalculator.IPToNumber(tokens[0].replace(/^\s+/g, '').replace(/\s+$/g, ''));
	var stop = AttackAPI.NetworkCalculator.IPToNumber(tokens[1].replace(/^\s+/g, '').replace(/\s+$/g, ''));
	return {start: start, stop: stop};
};
AttackAPI.NetworkCalculator.generateIPs = function (range) {
	var IPs = [];
	
	if (range.indexOf('/') != -1) var range = AttackAPI.NetworkCalculator.CIDRToRange(range);
	else var range = AttackAPI.NetworkCalculator.RANGEToRange(range);
	
	for (index = range.start; index <= range.stop; index++)
		IPs.push(AttackAPI.NetworkCalculator.numberToIP(index));
		
	return IPs;
};
