function GoogleGroup(name) {
	this.name = name;
	this.proxy = new YahooPipeRssProxy();
}
GoogleGroup.prototype.fetch = function (callback) {
	var base = 'http://groups.google.com/group/' + escape(this.name) + '/feed/atom_v1_0_msgs.xml';
	return this.proxy.proxy(callback, base);
};
