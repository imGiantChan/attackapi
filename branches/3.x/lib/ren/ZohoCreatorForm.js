function ZohoCreatorForm(author, id) {
	this.author = author;
	this.id = id;

	this.proxy = new YahooPipeXmlProxy();
}
ZohoCreatorForm.prototype.add = function (callback, fields) {
	var base = 'http://creator.zoho.com/addrecord.do?formid=' + escape(this.id) + '&sharedBy=' + escape(this.author);
	return this.proxy.proxy(callback, base + '&' + this.proxy.pipe.requester.buildQuery(fields));
};
ZohoCreatorForm.prototype.del = function (callback, id) {
	var base = 'http://creator.zoho.com/deleterecordaction.do?formid=' + escape(this.id) + '&sharedBy=' + escape(this.author) + '&tableName=t_' + escape(this.id);
	return this.proxy.proxy(callback, base + '&deletegroup=' + escape(id));
};
ZohoCreatorForm.prototype.list = function (callback, view) {
	var base = 'http://creator.zoho.com/' + escape(this.author) + '/json/' + escape(view) + '/callback={callback}';
	return (new JsonRequest(base)).request(callback);
};
