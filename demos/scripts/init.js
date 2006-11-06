var demos = [
	'Index',
	'Client',
	'Server',
	'AuthorizationForcer',
	'ExtensionScanner',
	'HistoryDumper',
	'NetworkSweeper',
	'PortScanner',
	'NetworkCalculator',
	'JavaScriptShell',
	'RequestBuilder',
	'UsernameScanner',
	'URLScanner',
	'URLFetcher',
	'Base64Encoder',
	'GoogleSearch',
	'KeyLogger',
	'CookieManager',
	'Zombie',
	'ZombieMaster'];

$(document).ready(function() {
	var pathname = document.location.pathname;
	var navigation = $('#navigation');
	var title = null;
	
	for (var index = 0; index < demos.length; index++) {
		var li = document.createElement('li');
		var a = document.createElement('a');
		
		li.appendChild(a);
		a.innerHTML = demos[index];
		a.href = demos[index] + '.htm';
		
		navigation.append(li);
		navigation.append(document.createTextNode(' '));
		
		if (pathname.substring(pathname.length - demos[index].length - 4) == demos[index] + '.htm') {
			title = demos[index];
			$(li).addClass('selected');
		}
	}
	
	if (!title)
		title = 'AttackAPI';
	
	$('#header').html(title);
	document.title = title;
});
