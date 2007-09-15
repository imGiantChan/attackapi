function MailinatorInbox(id) {
	this.id = id;
	this.rssProxy = new YahooPipeRssProxy();
}
MailinatorInbox.prototype.fetch = function (callback) {
	var base = 'http://www.mailinator.com/rss.jsp?email=' + escape(this.id);
	return this.rssProxy.proxy(callback, base);
};
