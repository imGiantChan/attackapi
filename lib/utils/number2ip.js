
AttackAPI.utils.number2ip = function (num) {
	return Math.floor(num/16777216)%256 + '.' + Math.floor(num/65536)%256 + '.' + Math.floor(num/256)%256 + '.' + Math.floor(num)%256;	
};
