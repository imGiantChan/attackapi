
AttackAPI.utils.ip2number = function (ip) {
	var octets = ip.split('.');
	return (16777216 * octets[0]) + (65536 * octets[1]) + (256 * octets[2]) + Number(octets[3]);	
};
