
AttackAPI.requestLCL = function (url) {
	var data = null;
	
	var destination = new java.net.URL(url);
	var buffer = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, 65536);
	var stream = destination.getContent();
	
	while (true) {
		var count = stream.read(buffer);
		
		if (count <= 0)
			break;
			
		var str = new java.lang.String(buffer, 0, count);
		data += str;
	}
	
	stream.close();
	
	return data;
};