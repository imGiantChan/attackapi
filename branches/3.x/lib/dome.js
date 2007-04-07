


/**
 * @name AttackAPI.Util['::DOM::Sandbox']
 * @desc create a sendbox
 * @extend AttackAPI.Util
 */
AttackAPI.Util['::DOM::Sandbox'] = AttackAPI.Util.extend({
	/**
	 * @name AttackAPI.Util['::DOM::Sandbox'].prototype.initialize
	 * @desc initialize a new sandbox
	 */
	initialize: function () {
		this.queue = [];
		this.loaded = false;
		
		this.ifr = window.document.createElement('iframe');
		this.ifr.style.visibility = 'hidden';
		this.ifr.style.width = this.ifr.style.height = 0;
		
		window.document.body.appendChild(this.ifr);
		
		var self = this;
		
		this.ifr.onload = function () {
			self.loaded = true;
			
			while (self.queue)
				self.evaluate(self.queue.pop());
		};
		
		arguments.callee.$.initialize.apply(this, arguments);
	},
	/**
	 * @name AttackAPI.Util['::DOM::Sandbox'].prototype.evaluate
	 * @desc evaluate expression in the sandbox
	 * @param String s the expression to be evaluated
	 */
	evaluate: function (s) {
		if (!this.loaded) {
			this.queue.push(s);
		} else {
			this.ifr.contentWindow.location = 'javascript:' + escape(s) + ';void(0);';
		}
	},
	/**
	 * @name AttackAPI.Util['::DOM::Sandbox'].prototype.terminate
	 * @desc terminate the sandbox
	 */
	terminate: function () {
		document.body.removeChild(this.ifr);
	}
});

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

/**
 * @name AttackAPI.Util['::DOM::CSS History Scanner']
 * @desc perform search via Google AJAX Search API
 * @extend AttackAPI.Util['::DOM']
 */
AttackAPI.Util['::DOM::CSS History Scanner'] = AttackAPI.Util['::DOM'].extend({
	/**
	 * @name AttackAPI.Util['::DOM::Google AJAX Search'].prototype.scan
	 * @desc perform the scan
	 * @param Object r the request object to be used
	 */
	scan: function (r) {
		var ifr = document.createElement('iframe');
		ifr.style.visibility = 'hidden';
		ifr.style.width = ifr.style.height = 0;
		
		document.body.appendChild(ifr);
		
		var doc = this.getDoc(ifr);
		doc.open();
		doc.write('<style>a:visited{display: none}</style>');
		doc.close();
		
		for (var i = 0; i < r.urls.length; i++) {
			var a = doc.createElement('a');
			a.href = r.urls[i];
			
			doc.body.appendChild(a);
			
			if (a.currentStyle)
				var display = a.currentStyle['display'];
			else
				var display = doc.defaultView.getComputedStyle(a, null).getPropertyValue('display')
				
			if (display == 'none' && typeof(r.onfound) == 'function')
				r.onfound(r.urls[i], r);
		}
		
		document.body.removeChild(ifr);
		
		if (typeof(r.oncomplete) == 'function')
			r.oncomplete(r);
	}
});

/**
 * @name AttackAPI.Util['::DOM::State Scanner']
 * @desc detect state of a resource
 * @extend AttackAPI.Util['::DOM']
 */
AttackAPI.Util['::DOM::State Scanner'] = AttackAPI.Util['::DOM'].extend({
	/**
	 * @name AttackAPI.Util['::DOM::State Scanner'].prototype.scan
	 * @desc perform the scan
	 * @param Object r the request object to be used
	 */
	scan: function (r) {
	}
});