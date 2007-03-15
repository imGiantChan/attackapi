
AttackAPI.dom.getPlugins = function () {
	var plugins = new Array();
	
	for (var index = 0; index < navigator.plugins.length; index++)
		plugins.push(navigator.plugins[index].name);
	
	return plugins;
};
