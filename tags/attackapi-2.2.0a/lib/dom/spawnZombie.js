
AttackAPI.dom.spawnZombie = function (zombie) {
	var zombie = AttackAPI.dom.spawnChannel(zombie);
	
	zombie.timer = null;
	zombie.interval = (zombie.interval != undefined)?zombie.interval:2000;
	
	zombie.start = function () {
			zombie.stop();
			zombie.timer = window.setInterval(zombie.pull, zombie.interval);
	};
	
	zombie.stop = function () {
			window.clearInterval(zombie.timer);			
	};
	
	return zombie;
};
