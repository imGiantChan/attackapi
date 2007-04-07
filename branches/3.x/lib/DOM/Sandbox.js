
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