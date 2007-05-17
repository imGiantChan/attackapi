
/**
 * @name AttackAPI.utils.number2ip
 * @desc convert number to IP
 * @param {Number} num the number to convert
 * @return {String} converted number
 */
AttackAPI.utils.number2ip = function (num) {
	return Math.floor(num/16777216)%256 + '.' + Math.floor(num/65536)%256 + '.' + Math.floor(num/256)%256 + '.' + Math.floor(num)%256;	
};