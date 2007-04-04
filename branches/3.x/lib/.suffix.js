
/* hook on $A */
if ($A == undefined) {	
	var $A = {};
	
	for (var item in AttackAPI) {
		if (item == 'version' || item == 'author' || item == 'homepage' || item == 'projecthome')
			continue;
			
		AttackAPI.core.extend($A, AttackAPI[item]);
	}
}