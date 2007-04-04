
AttackAPI.utils.net2range = function (net) {
	var start = stop = 0;
	
	if (net.indexOf('/') != -1) {
		var tokens = net.split('/');
		
		start = AttackAPI.utils.ip2number(tokens[0]);
		stop = Math.pow(2, 32 - tokens[1]) + start - 1;
	} else if (net.indexOf('-') != -1) {
		var tokens = net.split('-');
		
		start = AttackAPI.utils.ip2number(tokens[0].replace(/^\s+/g, '').replace(/\s+$/g, ''));
		stop = AttackAPI.utils.ip2number(tokens[1].replace(/^\s+/g, '').replace(/\s+$/g, ''));
	} else
		start = stop = 0;
	
	return {start: start, stop: stop};
};
