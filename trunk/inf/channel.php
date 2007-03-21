<?php
#
# VERSION: 2.2.0a
# AUTHOR: Petko Petkov | pdp (architect)
# HOMEPAGE: http://www.gnucitizen.org
#

#
# DEFAULT CONFIGURATION
#

$SESSION_NAME = 'SESSIONID';
$SESSION_BACKEND = 'FileSystemBackend';
$SESSION_CONFIG = array('session_folder' => '.htsessions', 'session_expiry' => 60);

#
# REGISTERED GLOBALS
#

$PARAMS = null;
$BACKEND = null;
$REFERRER = null;

#
# UNIFY PARAMETERS
#

foreach ($_GET as $key => $val)
	$PARAMS[trim($key)] = $val;

foreach ($_POST as $key => $val)
	$PARAMS[trim($key)] = $val;

#
# RETRIEVE THE REFERRER
#

if (isset($PARAMS['referrer']))
	$REFERRER = $PARAMS['referrer'];
else
	if (isset($_SERVER['HTTP_REFERRER']))
		$REFERRER = $_SERVER['HTTP_REFERRER'];
	else
		$REFERRER = '_';

#
# SEND DEFAULT CONTENT TYPE HEADER
#

header('Content-Type: text/javascript');

#
# LOAD EXTERNAL CONFIGURATION
#

if (file_exists(dirname(__FILE__).'/config.php'))
	require_once dirname(__FILE__).'/config.php';

#
# LOAD EXTERNAL BACKEND
#

if (!class_exists($SESSION_BACKEND))
	require_once $SESSION_BACKEND.'.php';

#
# INITIALIZE THE BACKEND
#

$BACKEND = new $SESSION_BACKEND();
$BACKEND->configure($SESSION_CONFIG);

#
# INITIALIZE THE SESSION
#

session_set_save_handler(
	array(&$BACKEND, '__open'),
	array(&$BACKEND, '__close'),
	array(&$BACKEND, '__read'),
	array(&$BACKEND, '__write'),
	array(&$BACKEND, '__destroy'),
	array(&$BACKEND, '__trash')); 

session_name($SESSION_NAME);
session_start();

#
# GET CLIENT DETAILS
#

if (!isset($_SESSION['_client_agent']))
	$_SESSION['_client_agent'] = $_SERVER['HTTP_USER_AGENT'];

if (!isset($_SESSION['_client_ip']))
	$_SESSION['_client_ip'] = $_SERVER['REMOTE_ADDR'];

#
# INITIALIZE THE MESSAGE QUEUE
#

if (!isset($_SESSION['_message_queue']) || !is_array($_SESSION['_message_queue']))
	$_SESSION['_message_queue'] = array();

if (isset($REFERRER) && !isset($_SESSION['_message_queue'][$REFERRER]))
	$_SESSION['_message_queue'][$REFERRER] = array();

#
# DISPATCH
#

if (isset($PARAMS['action']) && function_exists('action_'.$PARAMS['action']))
	echo call_user_func('action_'.$PARAMS['action']);
else
	echo action_pull();

#
# FINISH
#

session_write_close();

#
# HELPERS
#

function is_assoc($php_val) {
	return is_array($php_val) && array_keys($php_val) !== range(0, sizeof($php_val) - 1);
}

function is_session_id($php_val) {
	return strlen($php_val) == strlen(session_id());
}

function array_trim($php_val) {
	$result = array();

	foreach ($php_val as $val)
		$result[] = trim($val);

	return $result;
}

function export_to_json($php_val) {
	if (is_assoc($php_val)) {
		$tmp = '{';

		foreach ($php_val as $key => $val)
			$tmp .= export_to_json($key).': '.export_to_json($val).', ';

		if (sizeof($php_val) > 0)
			$tmp = substr($tmp, 0, -2);

		return $tmp.'}';
	} else
		if (is_array($php_val)) {
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
	global $PARAMS;
	global $BACKEND;
	global $REFERRER;

	if (!isset($PARAMS['message']))
		return;

	if (!isset($PARAMS['client']))
		$PARAMS['client'] = 'GLOBAL';

	if (strtolower($PARAMS['client']) == 'global') {
		$current_session = $_SESSION;

		$current_session_id = session_id();

		$enum = $BACKEND->enum();
	
		foreach ($enum as $session_id) {
			if ($session_id == $current_session_id)
				continue;

			$_SESSION = array();

			session_decode($BACKEND->read($session_id));

			if (isset($REFERRER))
				$_SESSION['_message_queue'][$REFERRER][] = $PARAMS['message'];
			else
				$_SESSION['_message_queue']['_'][] = $PARAMS['message'];

			$BACKEND->write($session_id, session_encode());
		}

		$_SESSION = $current_session;

		return;
	}

	if (strtolower($PARAMS['client']) == 'self')
		$PARAMS['client'] = session_id();

	$current_session = $_SESSION;

	foreach (array_trim(explode(',', $PARAMS['client'])) as $client) {
		$_SESSION = array();

		session_decode($BACKEND->read($client));

		if (isset($REFERRER))
			$_SESSION['_message_queue'][$REFERRER][] = $PARAMS['message'];
		else
			$_SESSION['_message_queue']['_'][] = $PARAMS['message'];

		$BACKEND->write($client, session_encode());
	}

	$_SESSION = $current_session;
}

function action_pull() {
	global $PARAMS;
	global $REFERRER;

	$php_val = '';

	if (isset($REFERRER) && sizeof($_SESSION['_message_queue'][$REFERRER]) > 0)
		$php_val = array_shift($_SESSION['_message_queue'][$REFERRER]);
	else
		if (sizeof($_SESSION['_message_queue']['_']) > 0)
			$php_val = array_shift($_SESSION['_message_queue']['_']);

	if (isset($PARAMS['callback']))
		return $PARAMS['callback'].'('.export_to_json($php_val).');';

	return stripslashes($php_val);
}

function action_list() {
	global $PARAMS;
	global $BACKEND;
	
	$current_session_id = session_id();
	
	$enum = $BACKEND->enum();
	$clients = array();
	
	foreach ($enum as $session_id)
		if ($session_id != $current_session_id)
			$clients[] = $session_id;
	
	if (isset($PARAMS['callback']))
		return $PARAMS['callback'].'('.export_to_json($clients).');';

	return export_to_json($clients);
}

function action_enum() {
	global $PARAMS;
	global $BACKEND;

	$current_session = $_SESSION;

	$sessions = array();

	$current_session_id = session_id();
	
	$enum = $BACKEND->enum();
	$clients = array();
	
	foreach ($enum as $session_id)
		if ($session_id != $current_session_id)
			$clients[] = $session_id;
			
	foreach ($clients as $session_id) {
		$_SESSION = array();

		session_decode($BACKEND->read($session_id));

		$sessions[$session_id] = $_SESSION;
	}

	$_SESSION = $current_session;

	if (isset($PARAMS['callback']))
		return $PARAMS['callback'].'('.export_to_json($sessions).');';

	return export_to_json($sessions);
}

function action_view() {
	global $PARAMS;
	global $BACKEND;

	if (!isset($PARAMS['client']) || strtolower($PARAMS['client']) == 'self')
		$PARAMS['client'] = session_id();

	$current_session = $_SESSION;

	$sessions = array();

	foreach (array_trim(explode(',', $PARAMS['client'])) as $client) {
		$_SESSION = array();

		session_decode($BACKEND->read($client));

		$sessions[$client] = $_SESSION;
	}

	$_SESSION = $current_session;

	if (isset($PARAMS['callback']))
		return $PARAMS['callback'].'('.export_to_json($sessions).');';

	return export_to_json($sessions);
}

function action_save() {
	global $PARAMS;
	global $BACKEND;

	if (!isset($PARAMS['name']) || !isset($PARAMS['value']))
		return;

	if ($PARAMS['name']{0} == '_')
		return;

	if (!isset($PARAMS['client']))
		$PARAMS['client'] = 'GLOBAL';

	if (strtolower($PARAMS['client']) == 'global') {
		$current_session = $_SESSION;

		$current_session_id = session_id();

		$enum = $BACKEND->enum();
	
		foreach ($enum as $session_id) {
			if ($session_id == $current_session_id)
				continue;

			$_SESSION = array();

			session_decode($BACKEND->read($session_id));

			$_SESSION[$PARAMS['name']] = $PARAMS['value'];

			$BACKEND->write($session_id, session_encode());
		}

		$_SESSION = $current_session;

		return;
	}

	if (strtolower($PARAMS['client']) == 'self') {
		$_SESSION[$PARAMS['name']] = $PARAMS['value'];

		return;
	}

	$current_session = $_SESSION;

	foreach (array_trim(explode(',', $PARAMS['client'])) as $client) {
		$_SESSION = array();

		session_decode($BACKEND->read($client));

		$_SESSION[$PARAMS['name']] = $PARAMS['value'];

		$BACKEND->write($client, session_encode());
	}

	$_SESSION = $current_session;
}

function action_init() {
	extract($GLOBALS);

	if (file_exists(dirname(__FILE__).'/client.php'))
		include dirname(__FILE__).'/client.php';
}

#
# BACKEND CLASS
#

class Backend {
	function configure($config) {
		$this->config = $config;
	}
	
	function open()                              { return true; }
	function close()                             { return true; }

	function enum()                              { return true; }

	function read($session_id)                   { return true; }
	function write($session_id, $session_data)   { return true; }

	function destroy($session_id)                { return true; }
	function trash($session_expiry)              { return true; }

	function __open($path, $session_name)        { return $this->open(); }
	function __close()                           { return $this->close(); }
	function __read($session_id)                 { return $this->read($session_id); }
	function __write($session_id, $session_data) { return $this->write($session_id, $session_data); }
	function __destroy($session_id)              { return $this->destroy($session_id); }
	function __trash($session_expiry)            { return $this->trash($session_expiry); }
}

#
# DEFAULT BACKEND
#

class FileSystemBackend extends Backend {
	function open() {
		$path = dirname(__FILE__).'/'.$this->config['session_folder'];

		if (!is_dir($path))
			mkdir($path);

		return true;
	}

	function close() {
		$this->trash(time());
	
		return true;
	}

	function enum() {
		$sessions = array();

		foreach (glob(dirname(__FILE__).'/'.$this->config['session_folder'].'/*') as $file)
			$sessions[] = substr($file, strlen(dirname(__FILE__).'/'.$this->config['session_folder']) + 1);

		return $sessions;
	}

	function read($session_id) {
		$path = realpath(dirname(__FILE__).'/'.$this->config['session_folder'].'/'.$session_id);

		if (!is_file($path))
			return '';

		if (is_file($path))
			return file_get_contents($path);

		return '';
	}

	function write($session_id, $session_data) {
		if (!is_session_id($session_id) && $session_id != 'GLOBAL')
			return;

		$path = dirname(__FILE__).'/'.$this->config['session_folder'].'/'.str_replace('.', '/', $session_id);

		$fd = fopen($path, 'w');

		if (!$fd)
			return false;

		if (flock($fd, LOCK_EX)) {
			fwrite($fd, $session_data);
			flock($fd, LOCK_UN);
		}

		fclose($fd);
	}

	function destroy($session_id) {
		$path = dirname(__FILE__).'/'.$this->config['session_folder'].'/'.$session_id;

		if (is_file($path))
			unlink($path);
	}

	function trash($session_expiry) {
		foreach (glob(dirname(__FILE__).'/'.$this->config['session_folder'].'/*') as $file) {
			if (!is_file($file))
				continue;

			if (filemtime($file) + $this->config['session_expiry'] < $session_expiry)
				unlink($file);
		}
	}
}
?>
