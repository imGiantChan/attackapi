function DodgitInbox(inbox) {
	this.inbox = inbox;
	this.proxy = new YahooPipeRssProxy();
}
DodgitInbox.prototype.fetch = function (callback) {
	var base = 'http://dodgit.com/run/rss?mailbox=' + escape(this.inbox);
	return this.proxy.proxy(callback, base);
};
