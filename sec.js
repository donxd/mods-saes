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
		alert("No es tu horario, recarga tus pesta\u00F1as del saes, menos esta.");
		while(1);
	}
}
acceso();