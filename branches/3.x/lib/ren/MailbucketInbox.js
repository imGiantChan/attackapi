function MailbucketInbox(inbox) {
	this.inbox = inbox;
	this.proxy = new YahooPipeRssProxy();
}
MailbucketInbox.prototype.fetch = function (callback) {
	var base = 'http://www.mailbucket.org/' + escape(this.inbox) + '.xml';
	return this.proxy.proxy(callback, base);
};
