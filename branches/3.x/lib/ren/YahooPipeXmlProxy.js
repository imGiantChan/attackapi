function YahooPipeXmlProxy() {
	this.pipe = new YahooPipe('MOA14Osy3BGrnbHwCB2yXQ');
}
YahooPipeXmlProxy.prototype.proxy = function (callback, url) {
	return this.pipe.run(callback, {url: url});
};
