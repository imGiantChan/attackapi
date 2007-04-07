
/**
 * @name AttackAPI.Parser['::Query']
 * @desc parse/build queries
 * @extend AttackAPI.Parser
 */
AttackAPI.Parser['::Query'] = AttackAPI.Parser.extend({
	/**
	 * @name AttackAPI.Parser['::Query'].prototype.initialize
	 * @desc create urlEncoder
	 */
	initialize: function () {
		this.urlEncoder = new AttackAPI.Encoder['::URL'];
		arguments.callee.$.initialize.apply(this, arguments);
	},
	/**
	 * @name AttackAPI.Parser['::Query'].prototype.parse
	 * @desc parse query
	 * @param String q the query to parse
	 */
	parse: function (q) {
		var o = {};
		var t = q.split('&');
		
		for (var i = 0; i < t.length; i++) {
			var p = t[i].split('=');
			o[this.urlEncoder.decode(p[0])] = this.urlEncoder.decode(p[1]);
		}
		
		return q;
	},
	/**
	 * @name AttackAPI.Parser['::Query'].prototype.build
	 * @desc build query
	 * @param Object o the query to build
	 */
	build: function (o) {
		var t = [];
	
		for (var i in o)
			t.push(this.urlEncoder.encode(i) + '=' + ((o[i] != undefined && o[i] != null)?this.urlEncoder.encode(o[i]):''));
			
		return t.join('&');
	}
});