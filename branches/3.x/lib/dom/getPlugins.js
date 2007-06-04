
/**
 * @cat DOM
 * @name AttackAPI.getPlugins
 * @desc retrieve available browser plugins
 * @return {Array} array of plugin names
 */
AttackAPI.getPlugins = function () {
	var plugins = new Array();
	
	for (var i = 0; i < navigator.plugins.length; i++) {
		plugins.push(navigator.plugins[i].name);
	}
	
	return plugins;
};