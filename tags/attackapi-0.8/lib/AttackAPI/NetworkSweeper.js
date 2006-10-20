AttackAPI.NetworkSweeper = {};
AttackAPI.NetworkSweeper.lazySweep = function (callback, targets, protocols) {
	var links = [];
	var protocols = (protocols == null)?['ftp', 'http', 'https']:protocols;

	for (index = 0; index < targets.length; index++) {
		for (zindex = 0; zindex < protocols.length; zindex++) {
			var link = new String(protocols[zindex] + '://' + targets[index]);
			link.target = targets[index];
			links.push(link);
		}
	}	
	
	AttackAPI.HistoryDumper.lazyDump(function (link, status) {
		callback(link.target, status);
	}, links);
};
