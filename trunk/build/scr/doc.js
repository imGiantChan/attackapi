load('build/lib/json.js', 'build/lib/xml.js', 'build/lib/fileio.js', 'build/lib/parse.js');

var dir = arguments[1];
var file = arguments[0];

var c = parse(read(file));
output(c, 'doc');

function output(c, n) {
	var json = Object.toJSON(c);
	writeFile(dir + '/data/' + n + '.json', json);

	Object.toXML.force = {desc: 1, code: 1, before: 1, result: 1};
	
	var xml = Object.toXML(n == 'docs' ? { method: c } : c, 'entry');
	writeFile(dir + '/data/' + n + '.xml', '<?xml version="1.0" encoding="ISO-8859-1"?>\n<docs>\n' + xml + '</docs>');
}
