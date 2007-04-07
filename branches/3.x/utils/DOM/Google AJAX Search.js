
/**
 * @name AttackAPI.Util['::DOM::Google AJAX Search']
 * @desc perform search via Google AJAX Search API
 * @extend AttackAPI.Util['::DOM']
 */
AttackAPI.Util['::DOM::Google AJAX Search'] = AttackAPI.Util['::DOM'].extend({
	/**
	 * @name AttackAPI.Util['::DOM::Google AJAX Search'].prototype.search
	 * @desc perform the search
	 * @param Object r the request object to be used
	 */
	search: function (r) {
		return this.requestJSON({
			url: 'http://www.google.com/uds/GwebSearch',
			query: {
				context: (r.context != undefined)?r.context:0,
				key: (r.key != undefined)?r.key:'internal-documentation',
				lstkp: 0,
				rsz: 'large',
				hl: 'en',
				v: '0.1',
				q: r.query
			},
			oncallback: r.callback
		});
	}
});