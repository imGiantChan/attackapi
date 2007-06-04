
AttackAPI.dom.sweepPorts = function (sweep) {
	var range = AttackAPI.utils.net2range(sweep.network);
	var length = range.stop - range.start;
	var count = 0;
	
	for (var i = range.start; i <= range.stop; i++)
		AttackAPI.dom.scanPorts({target: AttackAPI.utils.number2ip(i), ports: sweep.ports, timeout: sweep.timeout,
			onfound: function (port, scan) {
				if (typeof(sweep.onfound) == 'function')
					sweep.onfound({ip: scan.target, port: port}, sweep);
			},
			ontimeout: function (port) {
				if (typeof(sweep.ontimeout) == 'function')
					sweep.ontimeout({ip: scan.target, port: port}, sweep);
			},
			oncomplete: function () {
				count += 1;
				
				if (count == length && typeof(sweep.oncomplete) == 'function')
					sweep.oncomplete(sweep);
			}
		});
};