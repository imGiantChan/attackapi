<?php
#
# VERSION: 1.1a
# AUTHOR: Petko Petkov | pdp (architect)
# HOMEPAGE: http://www.gnucitizen.org
#

#
# CONFIG
#
$SESSION_NAME = 'SESSIONID';
$SESSION_EXPIRY = 60; // seconds
$SESSION_FOLDER = '.htsessions';

#
# INIT
#
ini_set('session.gc_maxlifetime', $SESSION_EXPIRY);

session_set_save_handler('_session_open', '_session_close', '_session_read', '_session_write', '_session_destroy', '_session_gc');
session_save_path($SESSION_FOLDER);
session_name($SESSION_NAME);
session_start();

#
# ENUMERATE
#
$_SESSION['client_agent'] = $_SERVER['HTTP_USER_AGENT'];
$_SESSION['client_address'] = $_SERVER['REMOTE_ADDR'];

if (!is_array($_SESSION['client_queue']))
	$_SESSION['client_queue'] = array();

if (isset($_SERVER['HTTP_REFERRER']) && !isset($_SESSION['client_queue'][$_SERVER['HTTP_REFERRER']]))
	$_SESSION['client_queue'][$_SERVER['HTTP_REFERRER']] = array();

#
# DISPATCH
#
if (isset($_GET['action']) && function_exists('action_'.$_GET['action']))
	call_user_func('action_'.$_GET['action']);
else
	action_pull();

#
# FINISH
#
session_write_close();

#
# SESSION_MANAGEMENT
#
function _session_open($path, $session_name) {
	$_path = dirname(__FILE__).'/'.$path;

	if (!is_dir($_path))
		mkdir($_path);

	return true;
}

function _session_close() {
	_session_gc(time());
	
	return true;
}

function _session_read($session_id) {
	global $SESSION_FOLDER;

	$path = dirname(__FILE__).'/'.$SESSION_FOLDER.'/'.$session_id;

	if (is_file($path))
		return file_get_contents($path);

	return '';
}

function _session_write($session_id, $session_data) {
	global $SESSION_FOLDER;

	$fd = fopen(dirname(__FILE__).'/'.$SESSION_FOLDER.'/'.$session_id, 'w');

	if (!$fd)
		return false;

	if (flock($fd, LOCK_EX)) {
		fwrite($fd, $session_data);
		flock($fd, LOCK_UN);
	}

	fclose($fd);
}

function _session_destroy($session_id) {
	global $SESSION_FOLDER;

	$path = dirname(__FILE__).'/'.$SESSION_FOLDER.'/'.$session_id;

	if (is_file($path))
		unlink($path);
}

function _session_gc($session_expiry) {
	global $SESSION_EXPIRY;
	global $SESSION_FOLDER;

	foreach (glob(dirname(__FILE__).'/'.$SESSION_FOLDER.'/*') as $file) {
		if (!is_file($file))
			continue;

		if (filemtime($file) + $SESSION_EXPIRY < $session_expiry)
			unlink($file);
	}
}

#
# HELPERS
#
function is_assoc($php_val) {
	return is_array($php_val) && array_keys($php_val) !== range(0, sizeof($php_val) - 1);
}

function export_to_json($php_val) {
	if (is_assoc($php_val)) {
		$tmp = '{';

		foreach ($php_val as $key => $val)
			$tmp .= $key.': '.export_to_json($val).', ';

		if (sizeof($php_val) > 0)
			$tmp = substr($tmp, 0, -2);

		return $tmp.'}';
	} else if (is_array($php_val)) {
		$tmp = '[';

		foreach ($php_val as $val)
			$tmp .= export_to_json($val).', ';

		if (sizeof($php_val) > 0)
			$tmp = substr($tmp, 0, -2);

		return $tmp.']';
	} else
		return "'".str_replace("'", "\'", stripslashes($php_val))."'";
}

#
# ACTIONS
#
function action_push() {
	global $SESSION_FOLDER;

	if (!isset($_GET['client']) || !isset($_GET['message']))
		return;

	$path = realpath(dirname(__FILE__).'/'.$SESSION_FOLDER.'/'.$_GET['client']);

	if (!is_file($path))
		return;

	$current_session = $_SESSION;
	$_SESSION = array();

	session_decode(file_get_contents($path));

	if (isset($_SERVER['HTTP_REFERRER']))
		$_SESSION['client_queue'][$_SERVER['HTTP_REFERRER']][] = $_GET['message'];
	else
		$_SESSION['client_queue']['_'][] = $_GET['message'];

	$fd = fopen($path, 'w');

	if (flock($fd, LOCK_EX)) {
		fwrite($fd, session_encode());
		flock($fd, LOCK_UN);
	}

	fclose($fd);

	$_SESSION = $current_session;
}

function action_pull() {
	$php_val = '';

	if (isset($_SERVER['HTTP_REFERRER']) && sizeof($_SESSION['client_queue'][$_SERVER['HTTP_REFERRER']]) > 0)
		$php_val = array_shift($_SESSION['client_queue'][$_SERVER['HTTP_REFERRER']]);
	else if (sizeof($_SESSION['client_queue']['_']) > 0)
		$php_val = array_shift($_SESSION['client_queue']['_']);

	if (isset($_GET['callback']))
		echo $_GET['callback'].'('.export_to_json($php_val).');';
	else
		echo stripslashes($php_val);
}

function action_list() {
	global $SESSION_FOLDER;

	$sessions = array();

	foreach (glob(dirname(__FILE__).'/'.$SESSION_FOLDER.'/*') as $file) {
		$session_id = substr($file, strlen(dirname(__FILE__).'/'.$SESSION_FOLDER) + 1);

		if ($session_id != session_id())
			$sessions[] = $session_id;
	}

	if (sizeof($sessions) == 0)
		return;

	if (isset($_GET['callback']))
		echo $_GET['callback'].'('.export_to_json($sessions).');';
	else
		echo 'list('.export_to_json($sessions).');';
}

function action_view() {
	global $SESSION_FOLDER;

	if (!isset($_GET['client']))
		return;

	$path = realpath(dirname(__FILE__).'/'.$SESSION_FOLDER.'/'.$_GET['client']);

	if (!is_file($path))
		return;

	$current_session = $_SESSION;
	$_SESSION = array();

	session_decode(file_get_contents($path));

	if (isset($_GET['callback']))
		echo $_GET['callback'].'('.export_to_json($_GET['client']).', '.export_to_json($_SESSION).');';
	else
		echo 'view('.export_to_json($_GET['client']).', '.export_to_json($_SESSION).');';

	$_SESSION = $current_session;
}

function action_self() {
	if (isset($_GET['callback']))
		echo $_GET['callback']."('".session_id()."');";
	else
		echo "self('".session_id()."');";
}

function action_save() {
	global $SESSION_FOLDER;

	if (!isset($_GET['client']) || !isset($_GET['name']) || !isset($_GET['value']))
		return;

	$path = realpath(dirname(__FILE__).'/'.$SESSION_FOLDER.'/'.$_GET['client']);

	if (!is_file($path))
		return;

	if ($_GET['client'] == session_id()) {
		$_SESSION[$_GET['name']] = $_GET['value'];
		return;
	}

	$current_session = $_SESSION;
	$_SESSION = array();

	session_decode(file_get_contents($path));
	$_SESSION[$_GET['name']] = $_GET['value'];

	$fd = fopen($path, 'w');

	if (flock($fd, LOCK_EX)) {
		fwrite($fd, session_encode());
		flock($fd, LOCK_UN);
	}

	fclose($fd);

	$_SESSION = $current_session;
}
?>
