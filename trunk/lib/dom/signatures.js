
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

AttackAPI.dom.signatures.files = [
	{name: 'LC5', url: 'res://c:\\program%20files\\@stake\\LC5\\lc5.exe/#2/#102', size: '30'},
	{name: 'LC5', url = "res://c:\\program%20files\\@stake\\LC5\\lc5.exe/#2/#102", size: '30'},{name: 'acrobat7', url = "res://c:\\program%20files\\adobe\\acrobat%207.0\\acrobat\\acrobat.dll/#2/#210" ,
	{name: 'nero6e', url = "res://c:\\program%20files\\ahead\\nero\\nero.exe/#2/NEROSESPLASH", size: '30'},
	{name: 'azureus', url = "res://c:\\program%20files\\azureus\\uninstall.exe/#2/#110", size: '30'},
	{name: 'cain', url = "res://c:\\program%20files\\cain\\uninstal.exe/#2/#106", size: '30'},
	{name: 'citrix', url = "res://c:\\program%20files\\Citrix\\icaweb32\\mfc30.dll/#2/#30989", size: '30'},
	{name: 'pgpdesktop', url = "res://c:\\program%20files\\PGP%20Corporation\\PGP%20Desktop\\PGPdesk.exe/#2/#600", size: '30'},
	{name: 'googletoolbar', url = "res://c:\\program%20files\\google\\googleToolbar1.dll/#2/#120", size: '30'},
	{name: 'flashmx', url = "res://c:\\program%20files\\Macromedia\\Flash%20mx%202004\\flash.exe/#2/#4395", size: '30'},
	{name: 'msnmessenger', url = "res://c:\\program%20files\\Messenger\\msmsgs.exe/#2/#607", size: '30'},
	{name: 'livemeeting7', url = "res://c:\\program%20files\\microsoft%20office\\live%20meeting%207\\console\\7.5.2302.14\\pwresources_zh_tt.dll/#2/#9006", size: '30'},
	{name: 'excel2003', url = "res://c:\\program%20files\\microsoft%20office\\Office11\\excel.exe/#34/#904", size: '30'},
	{name: 'office2003', url = "res://c:\\program%20files\\microsoft%20office\\Office11\\1033\\MSOhelp.exe/#2/201", size: '30'},
	{name: 'visualstudio2005', url = "res://c:\\program%20files\\microsoft%20visual%20studio%208\\common7\\ide\\devenv.exe/#2/#6606", size: '30'},
	{name: 'msmoviemaker', url = "res://c:\\program%20files\\movie%20maker\\moviemk.exe/RT_JPG/sample1", size: '30'},
	{name: 'picasa2', url = "res://c:\\program%20files\\picasa2\\picasa2.exe/#2/#138", size: '30'},
	{name: 'quicktime', url = "res://c:\\program%20files\\quicktime\\quicktimeplayer.exe/#2/#403", size: '30'},
	{name: 'realvnc4', url = "res://c:\\program%20files\\RealVNC\\VNC4\\vncviewer.exe/#2/#120", size: '30'},
	{name: 'oleview', url = "res://c:\\program%20files\\resource%20Kit\\oleview.exe/#2/#2", size: '30'},
	{name: 'securecrt', url = "res://c:\\program%20files\\SecureCRT\\SecureCRT.exe/#2/#224", size: '30'},
	{name: 'symantecantivirus', url = "res://c:\\program%20files\\symantec_client_security\\symantec%20antivirus\\vpc32.exe/#2/#157", size: '30'},
	{name: 'ultramon', url = "res://c:\\program%20files\\ultramon\\ultramondesktop.exe/#2/#108", size: '30'},
	{name: 'vmware', url = "res://c:\\program%20files\\vmware\\vmware%20workstation\\vmware.exe/#2/#508", size: '30'},
	{name: 'winamp', url = "res://c:\\program%20files\\winamp\\winamp.exe/#2/#109", size: '30'},
	{name: 'windowsmediaplayer', url = "res://c:\\program%20files\\windows%20media%20player\\wmsetsdk.exe/#2/#249", size: '30'}]
