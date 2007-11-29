function parse(f) {
	var c = [], bm, m;
	var blockMatch = /\/\*\*\s*((.|\n)*?)\s*\*\//g;
	var paramMatch = /\@(\S+) *((.|\n)*?)(?=\n\@|!!!)/m;

	while (bm = blockMatch.exec(f)) {
		block = bm[1].replace(/^\s*\* ?/mg,"") + "!!!";
		var ret = {params: [], examples: []};

		while (m = paramMatch.exec(block)) {
			block = block.replace(paramMatch, '');

			var n = m[1];
			var v = m[2]
				.replace(/\s*$/g, '')
				.replace(/^\s*/g, '')
				.replace(/&/g, '&amp;')
				.replace(/</g, '&lt;')
				.replace(/>/g, '&gt;')
				//.replace(/\n/g, '<br/>')
				/*.replace(/(\s\s+)/g, function(a){
					var ret = '';
					for ( var i = 0; i < a.length; i++ )
						ret += "&nbsp;";
					return ret;
				})*/ || 1;

			if (n == 'return') {
				var args = v.split(/\s+/);
				v = args.slice(1, args.length);
				v = {type: args[0], desc: v.join(' ')};
				n = 'return';
			} else if (n == 'param' || n == 'option') {
				var args = v.split(/\s+/);
				v = args.slice( 2, args.length );
				v = {type: args[0], name: args[1], desc: v.join(' ')};
				n = n + "s";
			} else if (n == 'test') {
				n = 'tests';
			}

			if (ret[n]) {
				if (ret[n].constructor == Array) {
					ret[n].push(v);
				} else {
					ret[n] = [ret[n], v];
				}
			} else if (ret[n + 's']) {
				if (ret[n + 's'].constructor == Array) {
					ret[n + 's'].push(v);
				} else {
					ret[n + 's'] = [ret[n + 's'], v];
				}
			} else {
				ret[n] = v;
			}
		}

		var m = /^((.|\n)*?(\.|$))/.exec(ret.desc);

		if (m) {
			ret['short'] = m[1];
		}
	
		if (ret.name) c.push(ret);
	}

	return c;
}
