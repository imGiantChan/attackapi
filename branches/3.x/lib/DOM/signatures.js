
AttackAPI.dom.signatures = new Object();

AttackAPI.dom.signatures.ports = [
	21, 22, 23, 25, 53, 80, 110, 118, 137, 139, 143, 161, 389, 443, 445, 547, 8000, 8008, 8080, 8888];

AttackAPI.dom.signatures.sites = [
	'http://www.yahoo.com/',
	'http://www.google.com/',
	'http://www.myspace.com/',
	'http://www.msn.com/',
	'http://www.ebay.com/',
	'http://www.youtube.com/',
	'http://www.facebook.com/',
	'http://www.wikipedia.org/',
	'http://www.craigslist.org/',
	'http://www.amazon.com/',
	'http://www.live.com/',
	'http://www.blogger.com/',
	'http://www.aol.com/',
	'http://www.cnn.com/',
	'http://www.go.com/',
	'http://www.microsoft.com/',
	'http://www.comcast.net/',
	'http://www.imdb.com/',
	'http://www.weather.com/',
	'http://www.digg.com/'];

AttackAPI.dom.signatures.extensions = [
	{name: 'Adblock Plus', url: 'chrome://adblockplus/skin/adblockplus.png'},
	{name: 'Customize Google', url: 'chrome://customizegoogle/skin/32x32.png'},
	{name: 'DownThemAll!', url: 'chrome://dta/content/immagini/icon.png'},
	{name: 'Faster Fox', url: 'chrome://fasterfox/skin/icon.png'},
	{name: 'Flash Block', url: 'chrome://flashblock/skin/flash-on-24.png'},
	{name: 'FlashGot', url: 'chrome://flashgot/skin/icon32.png'},
	{name: 'Google Toolbar', url: 'chrome://google-toolbar/skin/icon.png'},
	{name: 'Greasemonkey', url: 'chrome://greasemonkey/content/status_on.gif'},
	{name: 'IE Tab', url: 'chrome://ietab/skin/ietab-button-ie16.png'},
	{name: 'IE View', url: 'chrome://ieview/skin/ieview-icon.png'},
	{name: 'JS View', url: 'chrome://jsview/skin/jsview.gif'},
	{name: 'Live HTTP Headers', url: 'chrome://livehttpheaders/skin/img/Logo.png'},
	{name: 'SEO For Firefox', url: 'chrome://seo4firefox/content/icon32.png'},
	{name: 'Search Status', url: 'chrome://searchstatus/skin/cax10.png'},
	{name: 'Server Switcher', url: 'chrome://switcher/skin/icon.png'},
	{name: 'StumbleUpon', url: 'chrome://stumbleupon/content/skin/logo32.png'},
	{name: 'Torrent-Search Toolbar', url: 'chrome://torrent-search/skin/v.png'},
	{name: 'User Agent Switcher', url: 'chrome://useragentswitcher/content/logo.png'},
	{name: 'View Source With', url: 'chrome://viewsourcewith/skin/ff/tb16.png'},
	{name: 'Web Developer', url: 'chrome://webdeveloper/content/images/logo.png'}];

AttackAPI.dom.signatures.states = [
	{name: 'Google Logged In User', url: 'https://www.google.com/accounts/ManageAccount', message: 'XML tag name mismatch', line: 91},
	{name: 'GMail Logged In User', url: 'http://mail.google.com/mail/', message: 'XML tag name mismatch', line: 8},
	{name: 'MSN Logged In User', url: 'http://my.msn.com/', message: 'missing } in XML expression', line: 1},
	{name: 'Hotmail Logged In User', url: 'http://www.hotmail.com/', message: 'missing } in XML expression', line: 1},
	{name: 'Yahoo Mail Logged In User', url: 'http://mail.yahoo.com/', message: 'missing } in XML expression', line: 12},
	{name: 'Flickr Logged In User', url: 'http://www.flickr.com/account', message: 'syntax error', line: 1}];
