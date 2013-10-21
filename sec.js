function acceso (){
	var cookie = document.cookie;
	var mostrar = false;
	cookie = cookie.split(";");
	for (var i = 0; i < cookie.length; i++){
		if (cookie[i].indexOf("boleta") != -1){
			cookie = cookie[i].split("=");
			if (location.pathname.indexOf(cookie[1]) != -1){
				mostrar = true;
				break;
			}
		}
	}
	if (!mostrar){
		alert(chrome.i18n.getMessage("bad_schedule"));
		while(1);
	}
}
acceso();