function YahooPipeCsvProxy() {
	this.pipe = new YahooPipe('Vg0edwYy3BGvHDSHl7okhQ');
}
YahooPipeCsvProxy.prototype.proxy = function (callback, url) {
	return this.pipe.run(callback, {url: url});
};
