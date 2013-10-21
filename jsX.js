function log (mensaje){
	console.log (mensaje);
}
var indiceTabulador;
function ajustarDisenio (){
	var subMenu = document.getElementById("ctl00_subMenu");
	if (subMenu){
		subMenu.style.width = "auto";
		var disenio = document.createElement("style");
		disenio.setAttribute("type","text/css");
		disenio.innerHTML 	= "#subnav .item {	padding : 0px 7px;	border: none; display:inline-block;width:150px;}";
		var elementosMenu 	= document.getElementsByClassName("item ctl00_subMenu_4");
		for (var i = 0; i < elementosMenu.length; i++){
			if (elementosMenu[i].children.length == 2){
				elementosMenu[i].children[1].style.paddingLeft="20px";
			}
		}
		var espaciosImagenes = document.getElementById("ctl00_subMenu").getElementsByTagName("br");
		while(espaciosImagenes.length != 0){
			espaciosImagenes[0].parentNode.removeChild(espaciosImagenes[0]);
		}
		
		var espaciosImagenes = document.getElementById("ctl00_subMenu").getElementsByTagName("img");
		while(espaciosImagenes.length != 0){
			espaciosImagenes[0].parentNode.removeChild(espaciosImagenes[0]);
		}

		document.getElementById("subnav").insertBefore(disenio, document.getElementById("ctl00_subMenu").nextSibling);
	}
	var links = document.getElementsByTagName("a");

	for (var i = 0; i < links.length; i++){
		if (links[i].getAttribute("href") != null && links[i].getAttribute("href").length > 0){
			//~ Academica/agenda_escolar.aspx
			//~ Academica/horarios.aspx
			//~ /Academica/Ocupabilidad_grupos.aspx
			//~ Academica/calendario_ets.aspx
			//if (links[i].getAttribute("href").indexOf("horarios.aspx")!=-1&&links[i].parentNode.tagName=="LI"){

			// if (links[i].getAttribute("href").indexOf("agenda_escolar.aspx")!=-1&&links[i].parentNode.tagName=="LI"){
			// 	links[i].tabIndex=indiceTabulador;
			// 	links[i].innerHTML+=" <span style='background-color:black;color:white;display:none;' name='atajo'>"+(indiceTabulador-1)+"</span>";
			// 	links[i+1].tabIndex=indiceTabulador+1;
			// 	links[i+1].innerHTML+=" <span style='background-color:black;color:white;display:none;' name='atajo'>"+indiceTabulador+"</span>";
			// 	links[i+2].tabIndex=indiceTabulador+3;
			// 	links[i+2].innerHTML+=" <span style='background-color:black;color:white;display:none;' name='atajo'>"+(indiceTabulador+2)+"</span>";

			// 	var elementoLista = document.createElement("li");
			// 	elementoLista.innerHTML="<a href='/Academica/Ocupabilidad_grupos.aspx' title='Muestra en n&uacute;mero de inscritos por materia.' tabIndex='"+(indiceTabulador+2)+"'>»Ocupabilidad de Horarios <span style='background-color:black;color:white;display:none;' name='atajo'>"+(indiceTabulador+1)+"</span></a>";
			// 	links[i+1].parentNode.parentNode.insertBefore(elementoLista, links[i+1].parentNode.nextSibling);
			// 	i=links.length;
			// 	break;
			// }
			switch (links[i].getAttribute("href")){
				// case "/default.aspx":
				// case "/Alumnos/default.aspx":
				// case "/Academica/default.aspx":
				// case "/Ayuda/Ayuda.aspx":
				// 	if (links[i].parentNode.parentNode.getAttribute("id")!="ctl00_smPath"){
				// 		links[i].tabIndex=indiceTabulador;
				// 		links[i].innerHTML+=" <span style='background-color:black;color:white;display:none;' name='atajo'>"+(indiceTabulador-1)+"</span>";
				// 		indiceTabulador++;
				// 		tabAsignado=true;
				// 	}
				// 	break;
				case "/Alumnos/ETS/default.aspx":
					links[i].setAttribute("href","#");
					break;
				case "/Reglamento/Default.aspx":
					links[i].setAttribute("href",chrome.i18n.getMessage("bylaw"));
					links[i].setAttribute("target","_blank");
					// links[i].tabIndex=indiceTabulador;
					// links[i].innerHTML+=" <span style='background-color:black;color:white;display:none;' name='atajo'>"+(indiceTabulador-1)+"</span>";
					// indiceTabulador++;
					// tabAsignado=true;
					break;
			}
			// if (!tabAsignado){
			// 	links[i].tabIndex=-1;
			// }
		}
	}
	document.getElementById("contentwrapper").style.display	= "table";

	document.getElementById("floatwrapper").style.display	= "table-cell";
	document.getElementById("floatwrapper").style.float		= "none";

	document.getElementById("rightcolumn").style.display	= "table-cell";
	document.getElementById("rightcolumn").style.float		= "none";

	document.getElementById("footer").style.display			= "table-row";

	var configuracion = document.createElement("div");
	configuracion.setAttribute("style","position : fixed; top : 2px; left :"+(window.innerWidth-123)+"px; text-align : right; width : 120px; background-color : rgba(132, 132, 132, 0.9);");
	var imagenConfiguracion = document.createElement("img");
	imagenConfiguracion.src = chrome.extension.getURL("/css/conf.png");
	imagenConfiguracion.style.cursor = "pointer";
	imagenConfiguracion.addEventListener("click",mostrarContacto,true);
	var informacionContacto = document.createElement("div");
	informacionContacto.innerHTML = chrome.i18n.getMessage("contact")+" : <br/><a target='_blank' style='color : #AEE8F3; ' href='"+chrome.i18n.getMessage("url_facebook")+"'>Complemento SAES</a><br/><a href='#' style='color : #AEE8F3;'>"+chrome.i18n.getMessage("email")+"</a>";
	informacionContacto.setAttribute("style","display : none; color : #FFF; ");
	informacionContacto.setAttribute("id","informacion_contacto");
	configuracion.appendChild(imagenConfiguracion);
	configuracion.appendChild(informacionContacto);
	document.body.appendChild(configuracion);
}
function mostrarContacto (){
	var informacion_contacto = document.getElementById("informacion_contacto");
	if (informacion_contacto.style.display == "none"){
		informacion_contacto.style.display = "";
	} else {
		informacion_contacto.style.display = "none";
	}	
}
function pedir (tipo){
	// tipo 
	// 	1 maestro
	// 	2 tutor
	var opcion = prompt(chrome.i18n.getMessage("options_score"),"");
	switch (opcion){
		case "1": 	califica(5,1,2,1,tipo);
			break;
		case "2": 	califica(5,5,2,2,tipo);
			break;
		case "3": 	califica(5,3,2,1,tipo);
			break;
		case "4": 	califica(3,1,2,1,tipo);
			break;
		case "5": 	califica(1,1,1,1,tipo);
			break;
	}
}
function califica (maximo, minimo, recomendar1, recomendar2, tipo){
	// tipo 
	// 	1 maestro
	// 	2 tutor
	switch (tipo){
		case 1:
			var combos = document.getElementsByTagName("select");
			for (var i = 0; ( i < combos.length ) && ( i < 19 ); i++){
				combos[i].value = Math.floor( Math.random() * ( maximo - minimo + 1 ) ) + minimo;
			}
			combos[i].value = Math.floor( Math.random() * (recomendar1 - recomendar2 + 1 ) ) + recomendar2;
			break;
		case 2:
			// var numero;
			// var validacionEstrellas = document.createElement("script");
			// validacionEstrellas.setAttribute("type","text/javascript");
			// validacionEstrellas.innerHTML = 'var callBackFrameUrl="/WebResource.axd?d=9o7IamVuuHzao6tllXFvu4XwREce-0AXucAY14qTG0_OY_yTPR7g6pJcD5uAHWVPyRlF9iywIHYRRxbDrNCQlai4S8A1&t=635042738786803908";\nWebForm_InitCallback();\nSys.Application.initialize();';
			
			// var validacionEstrellas2 = validacionEstrellas.cloneNode(true);

			var preguntas = document.getElementById("ctl00_mainCopy_GV_Preguntas");
			var valores = preguntas.getElementsByTagName("input");
			for (var i = 0; i < valores.length; i++){
				// log(valores[i].getAttribute("id"));
				// numero = (i + 2) < 10 ? "0"+(i+2) : (i+2);
				valores[i].value = Math.floor( Math.random() * ( maximo - minimo + 1 ) ) + minimo;
				var estrellas = valores[i].parentNode.children[1].children; 
				var calificacion = valores[i].value;
				// log("-> "+calificacion+"/"+estrellas.length);
				for (var j = 0; j < calificacion && j < estrellas.length; j++) estrellas[j].className = "ratingItem smileypng";
				// valores[i].focus();
				// valores[i].setAttribute("id","ctl00_mainCopy_GV_Preguntas_ctl"+numero+"_Rtn_Estrellas_RatingExtender2_ClientState");

				// validacionEstrellas.innerHTML += 'Sys.Application.remove_init(function() {\n $create(AjaxControlToolkit.RatingBehavior, {\n "AutoPostBack":false,\n "CallbackID":"ctl00$mainCopy$GV_Preguntas$ctl'+numero+'$Rtn_Estrellas",\n "ClientStateFieldID":"ctl00_mainCopy_GV_Preguntas_ctl'+numero+'_Rtn_Estrellas_RatingExtender_ClientState",\n "EmptyStarCssClass":"emptypng",\n "FilledStarCssClass":"smileypng",\n "StarCssClass":"ratingItem",\n "WaitingStarCssClass":"donesmileypng",\n "id":"ctl00_mainCopy_GV_Preguntas_ctl'+numero+'_Rtn_Estrellas_RatingExtender"\n }, null, null, \n $get("ctl00_mainCopy_GV_Preguntas_ctl'+numero+'_Rtn_Estrellas"));\n });';
				// validacionEstrellas2.innerHTML += 'Sys.Application.add_init(function() {\n $create(AjaxControlToolkit.RatingBehavior, {\n "AutoPostBack":false,\n "CallbackID":"ctl00$mainCopy$GV_Preguntas$ctl'+numero+'$Rtn_Estrellas",\n "ClientStateFieldID":"ctl00_mainCopy_GV_Preguntas_ctl'+numero+'_Rtn_Estrellas_RatingExtender_ClientState",\n "EmptyStarCssClass":"emptypng",\n "FilledStarCssClass":"smileypng",\n "Rating":'+valores[i].value+',\n "StarCssClass":"ratingItem",\n "WaitingStarCssClass":"donesmileypng",\n "id":"ctl00_mainCopy_GV_Preguntas_ctl'+numero+'_Rtn_Estrellas_RatingExtender2"\n }, null, null, \n $get("ctl00_mainCopy_GV_Preguntas_ctl'+numero+'_Rtn_Estrellas"));\n });';
			}

			
			
			// Sys.Application.remove_init(function() {\n
			// 	$create(AjaxControlToolkit.RatingBehavior, {\n
			// 		"AutoPostBack":false,\n
			// 		"CallbackID":"ctl00$mainCopy$GV_Preguntas$ctl'+numero+'$Rtn_Estrellas",\n
			// 		"ClientStateFieldID":"ctl00_mainCopy_GV_Preguntas_ctl'+numero+'_Rtn_Estrellas_RatingExtender_ClientState",\n
			// 		"EmptyStarCssClass":"emptypng",\n
			// 		"FilledStarCssClass":"smileypng",\n
			// 		"StarCssClass":"ratingItem",\n
			// 		"WaitingStarCssClass":"donesmileypng",\n
			// 		"id":"ctl00_mainCopy_GV_Preguntas_ctl'+numero+'_Rtn_Estrellas_RatingExtender"\n
			// 	}, null, null, \n
			// 	$get("ctl00_mainCopy_GV_Preguntas_ctl'+numero+'_Rtn_Estrellas"));\n
			// });\n
			// Sys.Application.add_init(function() {\n
			// 	$create(AjaxControlToolkit.RatingBehavior, {\n
			// 		"AutoPostBack":false,\n
			// 		"CallbackID":"ctl00$mainCopy$GV_Preguntas$ctl'+numero+'$Rtn_Estrellas",\n
			// 		"ClientStateFieldID":"ctl00_mainCopy_GV_Preguntas_ctl'+numero+'_Rtn_Estrellas_RatingExtender_ClientState",\n
			// 		"EmptyStarCssClass":"emptypng",\n
			// 		"FilledStarCssClass":"smileypng",\n
			// 		"Rating":'+valores[i].value+',\n
			// 		"StarCssClass":"ratingItem",\n
			// 		"WaitingStarCssClass":"donesmileypng",\n
			// 		"id":"ctl00_mainCopy_GV_Preguntas_ctl'+numero+'_Rtn_Estrellas_RatingExtender2"\n
			// 	}, null, null, \n
			// 	$get("ctl00_mainCopy_GV_Preguntas_ctl'+numero+'_Rtn_Estrellas"));\n
			// });
			// document.forms[0].appendChild(validacionEstrellas);
			// log("OK");
			// document.forms[0].appendChild(validacionEstrellas2);
			// log("OK");
			break;
	}
}
function ajustaPeriodos (){
	var numeroPeriodos = document.getElementById("ctl00_mainCopy_Lbl_Kardex").getElementsByTagName("table").length;
	if (numeroPeriodos > 0){
		for (var i = 0; i < numeroPeriodos; i++){
			var periodos = document.getElementById("ctl00_mainCopy_Lbl_Kardex").getElementsByTagName("table");
			var periodosAnidados = periodos[i].getElementsByTagName("table");
			var celda;
			var acomodar;
			for (; periodosAnidados.length > 0 ;){
				if (periodosAnidados[0].parentNode.tagName == "CENTER" && periodosAnidados[0].parentNode.children.length == 2){
					celda = periodosAnidados[0].parentNode.parentNode;
					acomodar = periodosAnidados[0].parentNode.cloneNode(true);
					periodosAnidados[0].parentNode.parentNode.removeChild(periodosAnidados[0].parentNode);
				} else {
					celda = periodosAnidados[0].parentNode;
					var periodo 	= periodosAnidados[0].cloneNode(true);
					acomodar 	= document.createElement("center");
					var espacio 	= document.createElement("br");
					acomodar.appendChild(periodo);
					acomodar.appendChild(espacio);
					periodosAnidados[0].parentNode.removeChild(periodosAnidados[0]);
				}
				document.getElementById("ctl00_mainCopy_Lbl_Kardex").appendChild(acomodar);	
			}
			while (celda.getElementsByTagName("br").length > 0){
				celda.getElementsByTagName("br")[0].parentNode.removeChild(celda.getElementsByTagName("br")[0]);
			}
			if (periodos[i].parentNode.tagName == "CENTER" && periodos[i].parentNode.children.length < 2){
				var espacio = document.createElement("br");
				periodos[i].parentNode.appendChild(espacio);
			}
		}
	}
}
//##############<-buscador
function modificaciones (){
	if (this.value.length < 1){
    	verTodo();
	}
}
var estadoSeleccion = true;
function seleccion (){
	if (estadoSeleccion){
		// if (this.firstChild.localName!=null){
		// 	buscador.value=this.firstChild.innerHTML;	
		// }else {
		//   	buscador.value=this.innerHTML;
		//   	//alert(this.parentNode.numero);
		// }	
		buscador.value = this.innerText;	
		buscarTexto(this.innerText,this.cellIndex);
	}
}
function enumerarRegistros (datos,inicio){
  	var visibles = new Array();
	var numero = inicio;
	for (var i = inicio; i <= datos.length-1; i++, numero++){
		datos[i].setAttribute("class","visible");
		datos[i].numero = numero;
		visibles.push(numero);
		for (var j = 0; j < totalColumnas; j++){
      		datos[i].cells[j].addEventListener("click",seleccion,false);
		}
	}
  	document.body.datosVisibles.push(visibles);
  	contar();
}
function verOcultar (datos,inicio,opc){
	var tipo = "oculto";
	if (opc != 0){
		tipo = "visible";
	}	
	var numeroRegistros = datos.length;
	for (var i = inicio; i < numeroRegistros; i++){
		datos[i].setAttribute("class",tipo);
	}
	contar();
}
function contar (){
	document.getElementById("contador").innerHTML = document.body.datosVisibles[document.body.datosVisibles.length-1].length+" / "+totalRegistros;
}	
function verTodo (){
	buscador.value = "";
  	verOcultar(document.getElementById("regs").rows,1,1);//ver
  	//document.body.datosVisibles = new Array();
  	while(document.body.datosVisibles.length > 1) document.body.datosVisibles.pop();
  	//document.body.datosOcultos = new Array();
  	contar();
  	ultimaBusqueda = "";
}
function buscarDentro (palabra, fragmento){
  	var encontrado = false;
  	if (palabra.length >= fragmento.length){
    	var i = palabra.indexOf(fragmento.charAt(0));
    	var limite = palabra.lastIndexOf(fragmento.charAt(fragmento.length-1));
    	if (i != -1 && limite != -1){
      		if (fragmento.length < 2){
        		encontrado = true;
          	} else {
            	while (i < limite){
	              	if ((i+fragmento.length-1) < palabra.length){
	                	if (palabra.charAt(i+fragmento.length-1) == fragmento.charAt(fragmento.length-1)){
	                  		if (palabra.substring(i,i+fragmento.length) == fragmento){
	                    		encontrado = true;
	                    		//i=limite;
	                    		break;
	                  		}
	                	}
	              	}
              		i++;
            	}
          	}
    	}
 	}
  	return encontrado;
}
function buscarTexto (textoBuscado,columna){
	var limite 		= totalColumnas;
	var ocultos 	= new Array();
	var visibles 	= new Array();
	var encontrado;
	if (columna != 0){
		limite = columna+1;
   	}
   	var registrosVisibles = document.body.datosVisibles[document.body.datosVisibles.length-1];
	var registros = document.getElementById("regs").rows;
	//alert("l "+visibles.length);
	for (var i = 0; i < registrosVisibles.length; i++){
		encontrado = false;
		for (var j = columna; j < limite; j++){
          	// if (buscarDentro(registros[registrosVisibles[i]].cells[j].innerHTML.toUpperCase(),textoBuscado.toUpperCase())){
          	if (buscarDentro(registros[registrosVisibles[i]].cells[j].innerText.toUpperCase(),textoBuscado.toUpperCase())){
            	//registros[registrosVisibles[i]].cells[j].style.backgroundColor="blue";
            	encontrado = true;
            	j = limite;	
            	visibles.push(registros[registrosVisibles[i]].numero);
          	}
        }
        if (!encontrado) ocultos.push(registros[registrosVisibles[i]].numero);
    }
    for (var j = 0; j < ocultos.length; j++){
    	registros[ocultos[j]].setAttribute("class","oculto");
    }
    document.body.datosVisibles.push(visibles);
    //document.body.datosOcultos.push(ocultos);
    contar();
}	
function buscar (lanzador){
	var evento = lanzador || window.event;
	var codigoTecla = evento.charCode || evento.keyCode;
	var textoBuscado = document.getElementById("buscar").value;
	switch (codigoTecla){
		case 8:	/*del*/		case 46: //supr
			ultimaBusqueda = textoBuscado;
			if (textoBuscado.length > 0){
	            var registros = document.getElementById("regs").rows;
	            document.body.datosVisibles.pop();
	            var visibles = document.body.datosVisibles[document.body.datosVisibles.length-1];
	            for (var i = 0; i < visibles.length; i++){
	             	registros[visibles[i]].setAttribute("class","visible");
	            }
	            contar();
				//buscarTexto(textoBuscado, 	.columna);
				//alert("buscar");//buscarTexto
			} else verTodo();
			break;
		case 13: //enter
			if (textoBuscado.length > 0){
				buscarTexto(textoBuscado, this.columna);
				//alert("buscarEnter");//buscarTexto
			}
			break;
		case 27: //escape
  			buscador.value = "";
  			verTodo();
			break;
		//~ case 0: //altg*
		//~ case 16: //shitf-izq*
		//~ case 17: //ctrl*
		//~ case 18: //alt*
		//~ case 20: //mayus*
		//~ case 35: //fin*
		//~ case 36: //inicio*
		//~ case 37: //flecha <*
		//~ case 39: //flecha >*
		//~ case 45: //insert*
		//~ case 91: //super*
		//~ case 93: //menu*
			//~ break;
		default:
			if (ultimaBusqueda != textoBuscado){
				ultimaBusqueda = textoBuscado;
				if (textoBuscado.length > 0){
					buscarTexto(textoBuscado, this.columna);
				}
			}
	}
}
var buscador;
var totalRegistros;
var totalColumnas;
var ultimaBusqueda;
var contador;
function inicializar (){
	buscador = document.getElementById("buscar");
	buscador.columna = 0;
	buscador.addEventListener("keyup",buscar,true);
  	document.getElementById("ver").addEventListener("click",verTodo,true);
	buscador.addEventListener("click",modificaciones,true);
	inicializaDatos();
}
function inicializaDatos (){
	document.body.datosVisibles = new Array();
  	//document.body.datosOcultos = new Array();
  	var registros  	= document.getElementById("regs").rows;
  	totalRegistros 	= (registros.length-1);
  	totalColumnas 	= registros[0].cells.length;
  	enumerarRegistros(registros,1);
  	contador = document.getElementById("contador");
  	buscador.focus();
}
function agregaBuscador (opc){
	var controlesBuscador = document.createElement("div");
	controlesBuscador.innerHTML = '<input type="search" placeholder="'+chrome.i18n.getMessage("search_input")+'" id="buscar"/><input type="button" id="ver" value="'+chrome.i18n.getMessage("show_all_button")+'"><span id="contador"></span>';
	var tipo;
	switch (opc){
		case 1: //ocupabilidad
			tipo = "ctl00_mainCopy_GrvOcupabilidad";
			// var boton = document.createElement("input");
			// boton.setAttribute("type","button");
			// boton.setAttribute("value","Recargar");
			// boton.addEventListener("click",actualizaOcupabilidad,true);
			// controlesBuscador.appendChild(boton);
			break;
		case 2: //horarios
			tipo = "ctl00_mainCopy_dbgHorarios";
			controlesBuscador.innerHTML += "<input type = 'button' id = 'expImp' value = '"+chrome.i18n.getMessage("exp_imp_button")+"'> <div id = 'exportar' style = 'display : none;'>"+chrome.i18n.getMessage("instructions_exp_imp")+"<input id = 'exportarSeleccion' type = 'text' size = '5'/></div>"; 
			break;
	}
	document.getElementById(tipo).parentNode.insertBefore(controlesBuscador, document.getElementById(tipo));
	if (tipo == "ctl00_mainCopy_dbgHorarios"){
		document.getElementById("expImp").addEventListener("click",expImp,true);
		document.getElementById("exportarSeleccion").addEventListener("change",importar,true);
		document.getElementById("exportarSeleccion").addEventListener("focus",seleccionarContenido,true);
		if (localStorage.horarioMaterias != null && localStorage.horarioMaterias != "" && localStorage.horarioMaterias != "null" ){ 
			document.getElementById("exportarSeleccion").value = localStorage.horarioMaterias;
		}
	}
	document.getElementById(tipo).setAttribute("id","regs");
	inicializar();
}
//##############<-buscador

// function actualizaOcupabilidad(){
// 	valida(3);
// }
var READY_STATE_COMPLETE = 4;
var peticion_http = null;
function inicializa_xhr (){
	if (window.XMLHttpRequest){
		return new XMLHttpRequest();
	}
	else if (window.ActiveXObject){
		return new ActiveXObject("Microsoft.XMLHTTP");
	}
}
var tipoConsulta;
function valida (opc){
	peticion_http = inicializa_xhr();
	if (peticion_http) {
		tipoConsulta = opc;
		switch (opc){
			case 1 : //actualizacion
				peticion_http.onreadystatechange = procesaRespuesta;
				peticion_http.open("GET", chrome.i18n.getMessage("update"), true);
				peticion_http.send("");
				break;
			case 2 :
				var elementos 		= document.forms[0].elements;
				// var parm = "";
				// var parm2 = "";
				// var parametros2 	= "";
				var parametros 		= "";
				var agregar 		= "";
				var ultimo 			= "";
				for (var i = 0; i < elementos.length; i++){
					//quitando los del buscador
					if (elementos[i].getAttribute("name") != null && elementos[i].getAttribute("name") != ultimo){
						// parm += elementos[i].getAttribute("name")+"\t("+elementos[i].value.length+")\n";
						switch (elementos[i].getAttribute("name")){
							case "__EVENTTARGET" :
							case "__EVENTARGUMENT" :
							case "__LASTFOCUS" :
							case "__VIEWSTATE" :
							case "__VIEWSTATEENCRYPTED" :
							case "__EVENTVALIDATION" :
							case "ctl00$mainCopy$rblEsquema" :  				//periodo ocupa    				->ctl00$mainCopy$rblEsquema$0,ctl00$mainCopy$rblEsquema$1
							case "ctl00$mainCopy$dpdPeriodoEscolarHist" :  		//lista historico periodos    	->ctl00$mainCopy$dpdPeriodoEscolarHist
							case "ctl00$mainCopy$dpdcarrera" : 					//lista carreras
							case "ctl00$mainCopy$dpdplan" : 					//lista Plan de Estudios
							case "ctl00$mainCopy$txtCarrera" : 					//texto Carrera
							case "ctl00$mainCopy$txtplan" : 					//texto Plan de Estudios

							// case "ctl00$mainCopy$Chkespecialidad" : 			//especialidad					->ctl00_mainCopy_Chkespecialidad
							// case "ctl00$mainCopy$ChkSemestre":  				//semestre    					->ctl00$mainCopy$ChkSemestre
							// case "ctl00$mainCopy$Chkgrupo":  				//grupo    						->ctl00$mainCopy$Chkgrupo
							// case "ctl00$mainCopy$Chkmateria":  				//materia    					->ctl00$mainCopy$Chkmateria

							// case "ctl00$mainCopy$dpdespecialidad":  			//lista especialidad    		->ctl00$mainCopy$dpdespecialidad
							// case "ctl00$mainCopy$dpdsemestre":  				//lista semestre    			->ctl00$mainCopy$dpdsemestre
							// case "ctl00$mainCopy$dpdgrupo":  				//lista grupos    				->ctl00$mainCopy$dpdgrupo
							// case "ctl00$mainCopy$dpdmateria":  				//lista grupos    				->ctl00$mainCopy$dpdmateria
							// 		break;

							// // $-case "__EVENTTARGET":
							// // case "__EVENTARGUMENT":
							// // case "__LASTFOCUS":
							// // case "__EVENTVALIDATION":  //*
							// // case "__VIEWSTATE": //*
							// // case "__VIEWSTATEENCRYPTED": //*
							// // case "ctl00$mainCopy$rblEsquema": //*  periodo ocupabilidad
							// // case "ctl00$mainCopy$dpdcarrera": //*
							// // case "ctl00$mainCopy$dpdplan": //* -$
							// default:
							// // case "ctl00$mainCopy$dpdPeriodoEscolarHist": //* 
							// case "ctl00$mainCopy$GroupPeriodoEscolar": // periodo horarios
							// case "ctl00$mainCopy$Filtro$lsNoPeriodos": // # periodo horarios
							// case "ctl00$mainCopy$lsSecuencias":  //grupo
								parametros += agregar+encodeURIComponent(elementos[i].getAttribute("name"))+"="+encodeURIComponent(elementos[i].value);
								// parm2 += "\n"+encodeURIComponent(elementos[i].getAttribute("name"))+"="+encodeURIComponent(elementos[i].value);
								//parametros2 +=elementos[i].getAttribute("name")+"="+elementos[i].value+"\n";
								// parametros2 += elementos[i].getAttribute("name")+"("+elementos[i].value.length+")\n";
								if (elementos[i].getAttribute("type") != "radio"){
									ultimo = elementos[i].getAttribute("name");
								} else {
									if (elementos[i].checked){
										ultimo = elementos[i].getAttribute("name");
									}
								}
								break;
						}
						if (i < 1) agregar = "&";
					}
				}
				// alert(parm);
				// alert(parametros2);
				// log("parame\n"+parm);
				// log("parametros2\n"+parametros2);
				// log("paramet\n"+parm2);
				// log("paramet\n"+parametros);
				//if (confirm("Desea continuar?")){
					peticion_http.onreadystatechange = procesaRespuesta;
					peticion_http.open("POST", location.protocol+"//"+location.host+"/Academica/Ocupabilidad_grupos.aspx", true);
					peticion_http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");
					peticion_http.send(parametros);
				//}
				
				
				
				
				// var mensaje = document.createElement("div");
				// mensaje.setAttribute("style","width:"+window.window.innerWidth+"px;height:"+window.innerHeight+"px;position:fixed;top:50px;left:50px;");
				//~ mensaje.innerHTML=url;
				// document.body.appendChild(mensaje);
				
				//peticion_http.send(null);
				//encodeURIComponent(fecha.value)

				//~ (eventTarget, eventArgument) { 
					//~ 
				//~ theForm.__EVENTTARGET.value = eventTarget;
				//~ theForm.__EVENTARGUMENT.value = eventArgument;
				break;
			case 3 :
				var elementos 		= document.forms[0].elements;
				var parametros 		= "";
				var parametros2 	= "";
				var agregar 		= "";
				var ultimo 			= "";
				for (var i = 0; i < elementos.length; i++){
					//quitando los del buscador
					if (elementos[i].getAttribute("name") != null && elementos[i].getAttribute("name") != ultimo){
						parametros2 += elementos[i].getAttribute("name")+"("+elementos[i].value.length+")\n";
						switch (elementos[i].getAttribute("name")){
							case "__EVENTTARGET" :
							case "__EVENTARGUMENT" :
							case "__LASTFOCUS" :
							case "__VIEWSTATE" :
							case "__VIEWSTATEENCRYPTED" :
							case "__EVENTVALIDATION" :
							case "ctl00$mainCopy$rblEsquema" :  				//periodo ocupa    				->ctl00$mainCopy$rblEsquema$0,ctl00$mainCopy$rblEsquema$1
							case "ctl00$mainCopy$dpdPeriodoEscolarHist" :  		//lista historico periodos    	->ctl00$mainCopy$dpdPeriodoEscolarHist
							case "ctl00$mainCopy$dpdcarrera" : 					//lista carreras
							case "ctl00$mainCopy$dpdplan" : 					//lista Plan de Estudios
							case "ctl00$mainCopy$txtCarrera" : 					//texto Carrera
							case "ctl00$mainCopy$txtplan" : 					//texto Plan de Estudios
								parametros += agregar+encodeURIComponent(elementos[i].getAttribute("name"))+"="+encodeURIComponent(elementos[i].value);
								if (elementos[i].getAttribute("type") != "radio"){
									ultimo = elementos[i].getAttribute("name");
								} else {
									if (elementos[i].checked){
										ultimo = elementos[i].getAttribute("name");
									}
								}
								break;
						}
						if (i < 1) agregar = "&";
					}
				}
				// log("parametros2\n"+parametros2);
				peticion_http.onreadystatechange = procesaRespuesta;
				peticion_http.open("POST", location.protocol+"//"+location.host+"/Academica/Ocupabilidad_grupos.aspx", true);
				peticion_http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");
				peticion_http.send(parametros);
				break;
			case 4 :
				peticion_http.onreadystatechange = procesaRespuesta;
				peticion_http.open("GET", location.protocol+"//"+location.host+"/Alumnos/Reinscripciones/Reporte_Horario.aspx", true);
				peticion_http.send("");
				break;
		}
	}
}
function procesaRespuesta () {
	if (peticion_http.readyState == READY_STATE_COMPLETE) {
		if (peticion_http.status == 200) {
			// var variable = localStorage['tipoConsulta'];
			var variable = tipoConsulta;
			// log("----> "+variable);
			switch (variable){
				case 1:
					var respuestaXML = peticion_http.responseXML;					
					var raiz = respuestaXML.getElementsByTagName("gupdate");
					chrome.extension.sendMessage( { command : "getVersion"}, function(respuesta){
						if (respuesta.version < raiz[0].getElementsByTagName("app")[0].getElementsByTagName("updatecheck")[0].getAttribute("version")){
							generaAdvertenciaActualizacion();
						}	
					});
					break;
				case 2:
					var respuesta = peticion_http.responseText;

					var mensaje = document.createElement("div");
					// mensaje.setAttribute("style","width:"+window.window.innerWidth+"px;height:"+window.innerHeight+"px;position:fixed;top:50px;left:50px; overflow-y:yes;");
					mensaje.setAttribute("style","position : fixed; top : 50px; left : 50px; background-color : gray; opacity : 0.95;");
					// // mensaje.innerHTML="<textarea>"+respuesta+"</textarea>";


					var inicio 	= respuesta.indexOf("ctl00_mainCopy_GrvOcupabilidad");
					respuesta 	= respuesta.substring(inicio);
					inicio 		= respuesta.indexOf(">");
					respuesta 	= respuesta.substring(inicio+1);
					var fin 	= respuesta.indexOf("leftcolumn");
					respuesta 	= respuesta.substring(0,fin);
					fin 		= respuesta.indexOf("</table>");
					respuesta 	= respuesta.substring(0,fin);

					mensaje.innerHTML = "<div style='height : 600px; overflow-y : auto;'><table>"+respuesta+"</table></div>";
					document.body.appendChild(mensaje);

					if (false){
						//-->final
					 	var registros = document.getElementById("regs");
					 	registros.innerHTML = respuesta;
					 	marcaOcupados();
					 	inicializaDatos();
						if (buscador.value.length != 0) buscarTexto(buscador.value, 0);
						//-->
					}

					// var datos = respuesta.getElementById("ctl00_mainCopy_GrvOcupabilidad");
					// datos.setAttribute("id","regs");
					// registros.parentNode.replaceChild(datos,registros);
					// inicializaDatos();
					// marcaOcupados();
					
					//~ //localStorage['resultados'] = respuesta;
					break;
				case 3:
					// var respuesta = peticion_http.responseText;
					// var mensaje = document.createElement("div");
					// mensaje.setAttribute("style","position : fixed; top : 50px; left : 50px; background-color : gray; opacity : 0.95;");

					// var inicio 	= respuesta.indexOf("ctl00_mainCopy_GrvOcupabilidad");
					// respuesta 	= respuesta.substring(inicio);
					// inicio 		= respuesta.indexOf(">");
					// respuesta 	= respuesta.substring(inicio+1);
					// var fin 	= respuesta.indexOf("leftcolumn");
					// respuesta 	= respuesta.substring(0,fin);
					// fin 		= respuesta.indexOf("</table>");
					// respuesta 	= respuesta.substring(0,fin);

					// mensaje.innerHTML="<div style='height : 600px; overflow-y : auto;'><table>"+respuesta+"</table></div>";
					// document.body.appendChild(mensaje);

					var respuesta = peticion_http.responseText;

					var posicion = respuesta.indexOf('__VIEWSTATE" value');
					var viewState, eventValidation;
					if (posicion != -1){
						posicion        += 20;
						respuesta       = respuesta.substring(posicion);
						posicion        = respuesta.indexOf('"');
						viewState       = respuesta.substring(0,posicion);
						respuesta       = respuesta.substring(posicion);
						posicion        = respuesta.indexOf('__EVENTVALIDATION" value');
						posicion        += 26;
						respuesta       = respuesta.substring(posicion);
						posicion        = respuesta.indexOf('"');
						eventValidation = respuesta.substring(0,posicion);

						// log("->\nv : "+viewState.length+"\ne : "+eventValidation.length);
						// log("->\nv : "+viewState.length+"\n"+viewState+"\ne : "+eventValidation.length+"\n"+eventValidation);
						document.getElementById("__VIEWSTATE").value = viewState;
						document.getElementById("__EVENTVALIDATION").value = eventValidation;
						valida(2);
					}
					// var elementos = respuesta.getElementsByTagName("input");

					// for (var i = 0; i < elementos.length; i++) {
					// 	switch (elementos[i].getAttribute("name")){
					// 		case "__VIEWSTATE":
					// 		case "__EVENTVALIDATION":
					// 			document.getElementById(elementos[i].getAttribute("name")).value = elementos[i].getAttribute("value");
					// 			break;
					// 	}
					// }
					// valida(2);
					break;
				case 4:
					log("->Hecho");
					break;
			}
			// peticion_http = null;
		} else {
			if (peticion_http.status == 500) {
				var respuesta = peticion_http.responseText;

				var mensaje = document.createElement("div");
				// mensaje.setAttribute("style","width:"+window.window.innerWidth+"px;height:"+window.innerHeight+"px;position:fixed;top:50px;left:50px; overflow-y:yes;");
				mensaje.setAttribute("style","position : fixed; top : 50px; left : 50px; background-color : gray; opacity : 0.95;");	
				mensaje.innerHTML = respuesta;

				document.body.appendChild(mensaje);
			}
		}
	}
}
function generaAdvertenciaActualizacion (){
	var mensaje = document.createElement("div");
	mensaje.setAttribute("style"," background-color : #800000; width :"+window.innerWidth+"px; height : 18px; position : fixed; top :"+(window.innerHeight-18)+"px; left : 0px;");
	mensaje.innerHTML = "<a id='actualizacionLink' style='color:white;'>"+chrome.i18n.getMessage("update_message")+"</a>";
	document.body.appendChild(mensaje);
	document.getElementById("actualizacionLink").addEventListener("click",actualizar,true);
	var info 	= document.createElement("div");
	info.id 	= "informacion";
	info.setAttribute("style"," display : none; position : fixed; background-color : maroon; color : white; top : 6%; left : 50%; z-index : 1; font-size : 17px; margin : 0px 0px 0px -525px; -moz-box-shadow : 0 0 5px 5px #888; -webkit-box-shadow : 0 0 21px 5px#000; box-shadow : 0 0 20px 5px #000; width : 1050px; ");
	info.innerHTML = "<div style='background-color:black; color:white; opacity: 0.85;'>"+chrome.i18n.getMessage("close_div")+"</div><div overflow-y:auto; max-height: 450px;'><table style = ' margin : 0 auto; '><tr><td style = ' text-align : justify; width : 151px; font-size : 21px; padding-right : 35px; '>"+chrome.i18n.getMessage("update_instructions")+"</td><td><img src='"+chrome.extension.getURL("/css/1.jpg")+"'/><br><br><img src='"+chrome.extension.getURL("/css/2.jpg")+"'/></td></tr></table></div>";
	document.body.appendChild(info);
}
function actualizar (){
	document.getElementById("informacion").style.display = "";
}
var identificado = false;
function creaFlujo (){
	if (document.getElementById("ctl00_leftColumn_LoginViewSession_LoginStatusSession") != null){
		var salir = document.getElementById("ctl00_leftColumn_LoginViewSession_LoginStatusSession");
		salir.tabIndex 	= 1;
		// salir.innerHTML+=" <span style='background-color:black;color:white;display:none;' name='atajo'>"+0+"</span>";
		indiceTabulador = 2;
		identificado 	= true;
	} else {
		var boleta = document.getElementById("ctl00_leftColumn_LoginViewSession_LoginSession_UserName");
		boleta.tabIndex = 1;
		//boleta.focus();
		// var atajo=document.createElement("span");
		// atajo.setAttribute("style","background-color:black;color:white;display:none;");
		// atajo.setAttribute("name","atajo");
		// atajo.innerHTML=0;
		// boleta.parentNode.insertBefore(atajo,boleta.nextSibling);
		var password = document.getElementById("ctl00_leftColumn_LoginViewSession_LoginSession_Password");
		password.tabIndex 	= 2;
		indiceTabulador 	= 4;
	}
	// var mensaje = document.createElement("div");
	// mensaje.setAttribute("style","background-color:#800000;height:18px;position:fixed;top:"+(window.innerHeight-18)+"px;left:0px;color:white;display:none;");
	// mensaje.setAttribute("id","mensajeAtajos");
	// mensaje.innerHTML="Atajos»presionar el # deseado.";
	// document.body.appendChild(mensaje);

	// var listaAtajos = document.createElement("div");
	// listaAtajos.innerHTML = ""
}
var atajos = false;
function atajosEjecucion (lanzador){
	var evento = lanzador || window.event;
	var codigoTecla = evento.charCode || evento.keyCode;
	switch (codigoTecla){
		case 18: 	desActivaAtajos();
			break;
		case 27: 	//esc
			if (document.getElementById("asignaturas") != null) ocultarHorario();
			if (document.getElementById("informacion") != null) ocultarInfo();
			// if (atajoHorarios) ocultarHorario();
			break;
		default:
			if ((codigoTecla > 47 && codigoTecla < 58) || (codigoTecla > 64 && codigoTecla < 91)){
				teclasAtajos(codigoTecla);
			}
			break;
		// case 48: case 49: case 50: case 51: case 52: case 53: case 54: case 55: case 56: case 57:
		// 	break;
	}
}
function teclasAtajos(codigoTecla){
	if (atajos){
		var posicion;
		if (codigoTecla > 64){
			posicion = codigoTecla-55;
		} else {
			posicion = parseInt(String.fromCharCode(codigoTecla));
		}
		if (posicion < ultimoAtajo){
			switch (accesosAtajos[posicion]){
				case "login":
					if (document.getElementById("ctl00_leftColumn_LoginViewSession_LoginSession_UserName") != null){
						document.getElementById("ctl00_leftColumn_LoginViewSession_LoginSession_UserName").focus();
					} else {
						document.getElementById("__EVENTTARGET").value = "ctl00$leftColumn$LoginViewSession$LoginStatusSession$ctl00";
						document.forms[0].submit();
					}
					break;
				default:
					location.assign(location.protocol+"//"+location.host+accesosAtajos[posicion]);
					break;
			}
		}
		desActivaAtajos();
	}
}
// function quitaAtajos(){
// 	var atajos = document.getElementsByName("atajo");
// 	for (var i=0;i<atajos.length;i++){
// 		atajos[i].style.display = "none";
// 	}
// 	document.getElementById("mensajeAtajos").style.display = "none";
// }
// function muestraAtajos(){
// 	var atajos = document.getElementsByName("atajo");
// 	for (var i=0;i<atajos.length;i++){
// 		atajos[i].style.display = "";
// 	}
// 	document.getElementById("mensajeAtajos").style.display = "";
// }
function desActivaAtajos (){
	if (atajos){
		atajos = false;
		document.getElementById("seccionAtajos").style.display = "none";
		// quitaAtajos();
	} else {
		atajos = true;
		document.getElementById("seccionAtajos").style.display = "";
		// muestraAtajos();
	}
}
function recordar (){
	if (this.checked){
		if (!identificado){
			var boleta 	= document.getElementById("ctl00_leftColumn_LoginViewSession_LoginSession_UserName").value;
			var pass 	= document.getElementById("ctl00_leftColumn_LoginViewSession_LoginSession_Password").value;
			if (boleta.length > 0 && pass.length > 0){
				chrome.extension.sendMessage( { command : "setDatos", escuela:location.host, boleta : boleta, pass: pass, identificar: true }, identificar);
			} else {
				alert(chrome.i18n.getMessage("error_data_login"));
				this.checked = false;
			}
		}
	} else {
		chrome.extension.sendMessage( { command : "setDatos", identificar: false }, identificar);
		if (identificado){
			document.getElementById("recordar").parentNode.style.display = "none";
		}
	}
	document.getElementById("cambiosIdentificar").style.display = "";
}
function cambioUsuario (){
	if (this.id == "ctl00_leftColumn_LoginViewSession_LoginSession_UserName"){
		document.getElementById("ctl00_leftColumn_LoginViewSession_LoginSession_Password").value = "";
	}
	document.getElementById("recordar").checked = false;
}
function identificar (respuesta){
	switch (respuesta.command){
		case "getDatos":
			var recmen;
			var identificar = document.createElement("span");
			identificar.innerHTML = chrome.i18n.getMessage("autologin")+" <input type='checkbox' id='recordar' tabIndex='3' "+((respuesta.identificar && location.host == respuesta.escuela)?"checked":"")+"/><br/><span id='cambiosIdentificar'></span>";
			if (location.pathname == "/" && !identificado){
				if (location.host == respuesta.escuela){
					document.getElementById("ctl00_leftColumn_LoginViewSession_LoginSession_UserName").value = respuesta.boleta;
					document.getElementById("ctl00_leftColumn_LoginViewSession_LoginSession_Password").value = respuesta.pass;
					document.getElementById("__EVENTTARGET").value 		= "ctl00$leftColumn$LoginViewSession$LoginSession$LoginButton";
					document.getElementById("__EVENTARGUMENT").value 	= "";
					if (respuesta.identificar){	
						// identificado = true;
						document.forms[0].submit();
					}
				} else {
					document.querySelector("#ctl00_leftColumn_LoginViewSession_LoginSession_UserName").focus();
				}
				recmen = document.getElementById("ctl00_leftColumn_LoginViewSession_LoginSession_PasswordRequired");
			} else {
				var boleta = document.querySelector("#ctl00_leftColumn_LoginViewSession_LoginNameSession").innerHTML;
				if (boleta == respuesta.boleta && respuesta.identificar && location.host == respuesta.escuela){	
					recmen = document.getElementById("ctl00_leftColumn_LoginViewSession_LoginNameSession");
				} else {
					identificar.innerHTML = "";
				}
			}
			if (identificar.innerHTML.length > 0){
				recmen.parentNode.insertBefore(identificar, recmen.nextSibling);
				document.getElementById("recordar").addEventListener("click",recordar,true);
			}
			break;
		case "setDatos":
			var cambios = document.getElementById("cambiosIdentificar");
			cambios.style.color = "green";
			if (respuesta.identificar){
				cambios.innerHTML = chrome.i18n.getMessage("data_save");
			} else {
				cambios.innerHTML = chrome.i18n.getMessage("data_delete");
			}
			setTimeout(ocultarCambios,2000);
			break;
	}
}
function ocultarCambios (){
	document.getElementById("cambiosIdentificar").setAttribute("style","display:none;");
}
function reaccion (respuesta){
	if (document.getElementById("ctl00_leftColumn_LoginViewSession_LoginStatusSession") == null){
		var errorIdentificacion = false;
		var spans = document.getElementsByTagName("span");
		for (var i = 0; !errorIdentificacion && (i < spans.length); i++){
			if (spans[i].innerText == chrome.i18n.getMessage("data_save")) errorIdentificacion = true;
		}
		var identificar = document.createElement("span");
		identificar.innerHTML = chrome.i18n.getMessage("autologin")+" <input type='checkbox' id='recordar' tabIndex='3' /><br/><span id='cambiosIdentificar'></span>";

		var recmen = document.getElementById("ctl00_leftColumn_LoginViewSession_LoginSession_PasswordRequired");
		recmen.parentNode.insertBefore(identificar, recmen.nextSibling);
		document.getElementById("recordar").addEventListener("click",recordar,true);

		if (respuesta.command == "getDatos"){
			if (location.host == respuesta.escuela){
				document.getElementById("ctl00_leftColumn_LoginViewSession_LoginSession_UserName").value = respuesta.boleta;
				document.getElementById("ctl00_leftColumn_LoginViewSession_LoginSession_Password").value = respuesta.pass;
				document.getElementById("__EVENTTARGET").value 		= "ctl00$leftColumn$LoginViewSession$LoginSession$LoginButton";
				document.getElementById("__EVENTARGUMENT").value 	= "";
				document.getElementById("ctl00_leftColumn_LoginViewSession_LoginSession_UserName").addEventListener("change",cambioUsuario,true);
				document.getElementById("ctl00_leftColumn_LoginViewSession_LoginSession_Password").addEventListener("change",cambioUsuario,true);
				if (respuesta.identificar){			
					if (errorIdentificacion){
						alert(chrome.i18n.getMessage("message_error_login"));
					} else {
						document.getElementById("recordar").checked = true;
					}
				}
			}
		}
		document.querySelector("#ctl00_leftColumn_LoginViewSession_LoginSession_UserName").focus();
	}
}
var destinoConexion = "";
function conexionDiccionario (){
	var escuela = location.host.substring(9,location.host.lastIndexOf(".ipn"));
	switch (escuela){
		case "cecyt1":
		case "cecyt2":
		case "cecyt3":
		case "cecyt4":
		case "cecyt5":
		case "cecyt6":
		case "cecyt7":
		case "cecyt8":
		case "cecyt9":
		case "cecyt10":
		case "cecyt11":
		case "cecyt12":
		case "cecyt13":
		case "cecyt14":
		case "cecyt15":
		case "cet1":
		case "esimeazc":
		case "esimecu":
		case "esimetic":
		case "esimez":
		case "esiatec":
		case "esiatic":
		case "esiaz":
		case "cicsma":
		case "cicsst":
		case "escasto":
		case "escatep":
		case "encb":
		case "enmh":
		case "eseo":
		case "esm":
		case "ese":
		case "est":
		case "upibi":
		case "upiita":
		case "escom":
		case "esfm":
		case "esiqie":
		case "esit":
		case "upiig":
			destinoConexion = "http://"+escuela+".tusprofes.tk/";
			break;
		case "upiicsa":
			destinoConexion = "http://foroupiicsa.net/web/";
			break;
		default:
			alert(chrome.i18n.getMessage("campus_not_found"));
			break;
	}
}
function comentarioRapido (){
	if (destinoConexion != ""){
		var formularioEnlace 	= document.createElement("form");
		formularioEnlace.action = destinoConexion;
		formularioEnlace.target = "_blank";
		formularioEnlace.method = "POST";
		formularioEnlace.setAttribute("id","formularioEnlace");
		formularioEnlace.innerHTML = "<input type='hidden' name='profesor'><input type='hidden' name='materia'>";
		document.body.appendChild(formularioEnlace);

		var enlaces = document.getElementById("regs");
		var posicion = enlaces.rows[0].cells.length;

		enlaces.rows[0].insertCell(posicion);
		enlaces.rows[0].cells[posicion].innerHTML = chrome.i18n.getMessage("comment");
		for (var i = 1; i < enlaces.rows.length; i++){
			enlaces.rows[i].insertCell(posicion);
			if (enlaces.rows[i].cells[2].innerHTML != "" && enlaces.rows[i].cells[2].innerHTML != "&nbsp;"){
				enlaces.rows[i].cells[posicion].innerHTML = "<a href='#' name='diccionario'>#</a>";
			}
		}
		var nenlaces = document.getElementsByName("diccionario");
		for (var i = 0; i < nenlaces.length; i++){
			nenlaces[i].addEventListener("click",enlaceComentar,true);
		}
	}
}
function verComentarios (){
	if (destinoConexion != ""){
		var formularioEnlace 	= document.createElement("form");
		formularioEnlace.action = destinoConexion;
		formularioEnlace.setAttribute("id","formularioEnlace");
		formularioEnlace.target = "_blank";
		formularioEnlace.method = "POST";
		formularioEnlace.innerHTML = "<input type='hidden' name='sec' value='buscar'/><input type='hidden' name='n'/>";
		document.body.appendChild(formularioEnlace);

		var enlaces = document.getElementById("regs");
		for (var i = 1; i < enlaces.rows.length; i++){
			enlaces.rows[i].cells[1].innerHTML = "<a href='#' name='diccionario'>"+enlaces.rows[i].cells[1].innerHTML+"</a>";
			enlaces.rows[i].cells[2].innerHTML = "<a href='#' name='diccionario'>"+enlaces.rows[i].cells[2].innerHTML+"</a>";
			// cuidado con los sin asignar y donde hay dos maestros en la misma materia
		}
		var nenlaces = document.getElementsByName("diccionario");
		for (var i = 0; i < nenlaces.length; i++){
			nenlaces[i].addEventListener("click",enlaceVerComentarios,false);
		}
	}
}
function enlaceVerComentarios (){
	document.getElementsByName("n")[0].value = this.innerHTML;
	document.getElementById("formularioEnlace").submit();
	estadoSeleccion = false;
	setTimeout("estadoSeleccion = true;",1000);
}
function enlaceComentar (){
	var posicion = this.parentNode.parentNode.rowIndex;
	var registro = document.getElementById("regs").rows[posicion];
	document.getElementsByName("profesor")[0].value = registro.cells[2].innerHTML;
	document.getElementsByName("materia")[0].value 	= registro.cells[1].innerHTML;
	// alert("P->"+registro.cells[2].innerHTML+"\nM->"+registro.cells[1].innerHTML);
	// document.forms[0].target = "_blank";
	// document.forms[0].submit();
	document.getElementById("formularioEnlace").submit();
}
function expandirHorarios1 (){
	var horariosDisponibles = document.getElementById("ctl00_mainCopy_Panel2");
	horariosDisponibles.style.height 	= "";
	horariosDisponibles.style.width 	= "900px";
	horariosDisponibles.style.overflow 	= "";
	document.getElementById("ctl00_mainCopy_GV_Horario2").style.width = "900px";
}
function expandirHorarios2 (){
	var horarioNuevo = document.getElementById("ctl00_mainCopy_Panel1");
	horarioNuevo.style.height 	= "";
	horarioNuevo.style.width 	= "";
	horarioNuevo.style.overflow = "";
	document.getElementById("ctl00_mainCopy_GV_Horario").style.width = "900px";
	cuentaMateriasInscripcion();
}
function cuentaMateriasInscripcion (){
	//obteniendo valor
	var materiasPorInscribir = document.getElementById("ctl00_mainCopy_GV_Horario");
	var numeroMaterias = materiasPorInscribir.rows.length - 1;
	if (numeroMaterias == 1 && materiasPorInscribir.rows[1].cells[1].innerHTML == "&nbsp;"){
		numeroMaterias = 0;
	}
	//mostrando
	var contadorInscripcion = document.getElementById("contadorInscripcion");
	if (contadorInscripcion == null) {
		//insertando
		contadorInscripcion = document.createElement("div");
		contadorInscripcion.setAttribute("id","contadorInscripcion");
		contadorInscripcion.style.float = "right";
		contadorInscripcion.innerHTML = "<br/>"+numeroMaterias;
		materiasPorInscribir.parentNode.appendChild(contadorInscripcion);
	} else {
		//actualizando
		contadorInscripcion.innerHTML = "<br/>"+numeroMaterias;
	}
}
function tiempoHorarios2 (){
	setTimeout("expandirHorarios2()",500);
}
function tiempoHorarios1 (){
	setTimeout("expandirHorarios1()",500);
}
function informacionExtra (){
	var informacion = { maestros : [] , materias : [] };
	var registros = document.getElementById("regs");
	var prof, mate, encontrado;
	for (var i = 1; i < registros.rows.length; i++){
		if (destinoConexion != ""){
			mate = registros.rows[i].cells[1].firstChild.innerHTML;
			prof = registros.rows[i].cells[2].firstChild.innerHTML;
		} else {
			mate = registros.rows[i].cells[1].innerHTML;
			prof = registros.rows[i].cells[2].innerHTML;
		}

		encontrado = false;
		for (var j = 0; !encontrado && j < informacion.materias.length; j++){
			if (mate == informacion.materias[j]) encontrado = true;
		}
		if (!encontrado){
			informacion.materias.push(mate);
		}

		encontrado = false;
		for (var j = 0; !encontrado && j < informacion.maestros.length; j++){
			if (prof == informacion.maestros[j]) encontrado = true;
		}
		if (!encontrado){
			informacion.maestros.push(prof);
		}
	}
	log("informacionExtra******\n"+JSON.stringify(informacion));
}
function informacionPlanes (){
	var registros = document.getElementById("ctl00_mainCopy_GridView1");
	var informacion = { materias : [] };
	if (registros != null){
		var mate;
		for (var i = 1; i < registros.rows.length; i++){
			mate = registros.rows[i].cells[2].innerHTML;
			informacion.materias.push(mate);
		}
	}
	log("informacionPlanes******\n"+JSON.stringify(informacion));
}
function detectaPantalla (){
	switch (location.pathname){
		// case "/":
		// 	chrome.extension.sendMessage( { command : "getDatos"}, identificar);
		// 	break;
		// case "/Default.aspx":
		// 	chrome.extension.sendMessage( { command : "getDatos"}, reaccion);
		// 	break;
		case "/alumnos/default.aspx":
			var boleta = document.getElementById("ctl00_leftColumn_LoginViewSession_LoginNameSession").innerHTML;
			document.cookie = "boleta="+boleta+";path=/";
			break;
		case "/Academica/Equivalencias.aspx":
			document.querySelector("div#ctl00_mainCopy_UP").addEventListener("DOMSubtreeModified",ajustaEquivalencias,true);
			break;
		// case "/Alumnos/Evaluacion_docente/califica_profe.aspx":
		case "/Alumnos/Evaluacion_docente/evaluacion_profesor.aspx":
		case "/Alumnos/Evaluacion_Docente/evaluacion_profesor.aspx":
			if (confirm(chrome.i18n.getMessage("question_score_teacher"))){
				pedir(1);
			}
			break;
		case "/Academica/mapa_curricular.aspx":
			// informacionPlanes();
			break;
		case "/Academica/Ocupabilidad_grupos.aspx":
			var periodo = document.getElementsByName("ctl00$mainCopy$rblEsquema");
			if (periodo[0].checked != true && periodo[1].checked != true){
				document.getElementById("ctl00_mainCopy_Chkespecialidad").disabled 	= true;
				document.getElementById("ctl00_mainCopy_ChkSemestre").disabled 		= true;
				document.getElementById("ctl00_mainCopy_Chkgrupo").disabled 		= true;
				document.getElementById("ctl00_mainCopy_Chkmateria").disabled 		= true;
			}
			if (document.getElementById("ctl00_mainCopy_GrvOcupabilidad") != null){
				if (document.getElementById("ctl00_mainCopy_GrvOcupabilidad").tBodies.length > 0 && document.getElementById("ctl00_mainCopy_GrvOcupabilidad").tBodies[0].rows.length > 1){
					marcaOcupados();
					agregaBuscador(1);
				}
			}
			break;
		case "/Academica/horarios.aspx":
			if (document.getElementById("ctl00_mainCopy_dbgHorarios") != null){
				if (document.getElementById("ctl00_mainCopy_dbgHorarios").tBodies.length > 0 && document.getElementById("ctl00_mainCopy_dbgHorarios").tBodies[0].rows.length > 0){
					document.getElementById("ctl00_mainCopy_Panel1").setAttribute("style","");
					agregaBuscador(2);
					retiraSabados();
					conexionDiccionario();
					seleccionMaterias();
					cargarMateriasHorario();
					verComentarios();
					cargarHorariosGenerados();
					// informacionExtra();
				}
			}
			break;
		case "/Academica/Calendario.aspx":
			var tipo = document.getElementsByName("ctl00$mainCopy$rdlconsulta");
			if (tipo[0].checked != true && tipo[0].checked != true){
				document.getElementsByName("ctl00$mainCopy$dpdnombrecaptura")[0].disabled = true;
			}
			break;
		case "/Alumnos/Reinscripciones/Comprobante_Horario.aspx":
			horarioDirecto();
		case "/Alumnos/Informacion_semestral/Horario_Alumno.aspx":
			document.getElementById("wrapper").style.width 			= "1200px";
			document.getElementById("contentwrapper").style.width 	= "900px";
			document.getElementById("floatwrapper").style.width 	= "900px";
			document.getElementById("centercolumn").style.width 	= "900px";
			document.getElementById("ctl00_mainCopy_PnlDatos").removeAttribute("style");
			document.getElementById("ctl00_mainCopy_PnlDatos").style = "width:820px;";
			document.getElementById("ctl00_mainCopy_GV_Horario").setAttribute("id","regs");
			retiraSabados();
			conexionDiccionario();
			comentarioRapido();
			break;
		case "/Alumnos/Reinscripciones/reinscribir.aspx":

			document.getElementById("wrapper").style.width 			= "1300px";
			document.getElementById("contentwrapper").style.width 	= "1000px";
			document.getElementById("floatwrapper").style.width 	= "1000px";
			document.getElementById("centercolumn").style.width 	= "1000px";
			document.getElementById("ctl00_mainCopy_div").style.width  = "";
			document.getElementById("ctl00_mainCopy_div").style.height = "";
			
			document.getElementById("ctl00_mainCopy_UpdatePanel2").addEventListener("DOMSubtreeModified",tiempoHorarios2,true);
			document.getElementById("ctl00_mainCopy_UpdatePanel1").addEventListener("DOMSubtreeModified",tiempoHorarios1,true);
			expandirHorarios2();
			expandirHorarios1();
			cuentaMateriasInscripcion();

			break;
		case "/Alumnos/boleta/kardex.aspx":
			document.getElementById("ctl00_mainCopy_Panel1").removeAttribute("style");

			if (document.getElementById("contentwrapper").children.length < 3){
				var parteIzquierda = document.getElementById("rightcolumn").cloneNode(true);
				document.getElementById("rightcolumn").parentNode.removeChild(document.getElementById("rightcolumn"));
				document.getElementById("contentwrapper").appendChild(parteIzquierda);
				
				var piePagina = document.getElementById("footer").cloneNode(true);
				document.getElementById("footer").parentNode.removeChild(document.getElementById("footer"));
				document.getElementById("contentwrapper").appendChild(piePagina);
				
				var parteDerecha = document.getElementById("leftcolumn").cloneNode(true);
				document.getElementById("leftcolumn").parentNode.removeChild(document.getElementById("leftcolumn"));
				document.getElementById("floatwrapper").appendChild(parteDerecha);
				
				ajustaPeriodos();
				// informacionHistorico();
			}
			break;
		case "/Alumnos/tutores/Evaluacion_Tutores.aspx":
			var evaluacionTutores = document.getElementById("ctl00_mainCopy_Pnl_Evaluacion");
			if (evaluacionTutores){
				// log("-> evaluando");
				document.getElementById("ctl00_mainCopy_Pnl_Cuestionario").setAttribute("style","");
				// var formulario = document.forms[0];
				// var scripts = formulario.getElementsByTagName("script");
				// // while (scripts.length > 0 ){

				// 	scripts[8].parentNode.removeChild(scripts[8]);
				// 	// scripts[7].parentNode.removeChild(scripts[7]);
				// 	// scripts[6].parentNode.removeChild(scripts[6]);
				// 	// scripts[5].parentNode.removeChild(scripts[5]);
				// 	// scripts[4].parentNode.removeChild(scripts[4]);
				// 	// scripts[2].parentNode.removeChild(scripts[2]);
				// 	// scripts[3].parentNode.removeChild(scripts[3]);
				// 	// scripts[0].parentNode.removeChild(scripts[0]);
				// // }
				// // var scripts = formulario.getElementsByTagName("script");
				// // for (var i = 0; i < scripts.length; i++){
				// // 	log(scripts[8]);
				// // }
				

				// var nuevoFormulario = formulario.cloneNode(true);
				// // nuevoFormulario.setAttribute("onsubmit","alert('Fu'); return false;");
				// document.getElementsByTagName("body")[0].replaceChild(nuevoFormulario,formulario);
				// setTimeout("calificaTutor()",1500);
			}
			break;
	}
}
function ajustaEquivalencias (){
	var equivalencias = document.querySelector("table#ctl00_mainCopy_GV_EquivalenciasA");
	equivalencias.style.width = "auto";
	var contenedor = document.querySelector("div#ctl00_mainCopy_PnlDatos");
	contenedor.removeAttribute("style");
	contenedor.parentNode.removeAttribute("style");
}
function informacionHistorico (){
	var historial = document.getElementById("ctl00_mainCopy_Lbl_Kardex").getElementsByTagName("table");
	var salidaInformacionHistorico = "clave,materia,fecha,periodo,feval,calif\n";
	for (var i = 0; i < historial.length; i++){
		if (historial[i].rows[0].cells[0].getAttribute("colspan") == 6){
			for (var j = 2; j < historial[i].rows.length; j++){
				//log("->i:"+i+"\tj:"+j);
				if (historial[i].rows[j].cells.length > 5) {
					salidaInformacionHistorico += "'"+historial[i].rows[j].cells[0].innerHTML+"','"+historial[i].rows[j].cells[1].innerHTML+"','"+historial[i].rows[j].cells[2].innerHTML+"','"+historial[i].rows[j].cells[3].innerHTML+"','"+historial[i].rows[j].cells[4].innerHTML+"','"+historial[i].rows[j].cells[5].innerHTML+"'\n";
				} else {
					salidaInformacionHistorico += "'"+historial[i].rows[j].cells[0].innerHTML+"','"+historial[i].rows[j].cells[1].innerHTML+"','"+historial[i].rows[j].cells[2].innerHTML+"','"+historial[i].rows[j].cells[3].innerHTML+"','"+historial[i].rows[j].cells[4].innerHTML+"'\n";
				}
			}
		}
	}
	log("->"+salidaInformacionHistorico);
}
function calificaTutor (){
	if (confirm(chrome.i18n.getMessage("question_score_tutor"))){
		pedir(2);
	}
}
function seleccionMaterias (){
	//document.body.innerHTML+="<div id='asignaturas' style='display:none;'></div>";
	var tabla = document.getElementById("regs");
	var posicion = tabla.rows[0].cells.length;
	tabla.rows[0].insertCell(posicion);
	tabla.rows[0].cells[posicion].innerHTML = "#";
	var cuadros  	= document.createElement("input");
	cuadros.type 	= "checkbox";
	cuadros.title 	= chrome.i18n.getMessage("add_subject");
	for (var i = 1; i < tabla.rows.length; i++){
		tabla.rows[i].insertCell(posicion);
		//cuadro.value="Agregar";
		// cuadro.setAttribute("numero",i);
		var cuadro 		= cuadros.cloneNode(true);
		cuadro.numero 	= i;
		cuadro.addEventListener("click",agregarMateria,true);
		tabla.rows[i].cells[posicion].appendChild(cuadro);
	}
	var materiasSeleccionadas 	= document.createElement("div");
	materiasSeleccionadas.id 	= "asignaturas";
	materiasSeleccionadas.setAttribute("style","display:none; min-height:80px; min-width:250px; position: fixed; background-color: maroon; color: white; top: 6%; left: 50%; opacity: 0.85; z-index: 1; font-size: 17px; margin:0px 0px 0px -525px; -moz-box-shadow: 0 0 5px 5px #888; -webkit-box-shadow: 0 0 20px 5px#000; box-shadow: 0 0 20px 5px #000; width: 1050px; ");
	
	// materiasSeleccionadas.innerHTML = "<div style='background-color:black; color:white;'>[Cerrar con Escape]</div> <div id = 'resultadoHorarios' style='display:none; overflow-y:auto; max-height: 450px;'></div> <div id = 'asignaturasSeleccionadas' style='overflow-y:auto; max-height: 450px;'> <table id = 'tablaAsignaturas' style='width:100%;'> <tr style = 'background-color:#FF9900; color:white;'> <td>Grupo</td> <td>Materia</td> <td>Profesor</td> <td>Lun</td> <td>Mar</td> <td>Mi&eacute;</td> <td>Jue</td> <td>Vie</td> <td style=' display : none; '>S&aacute;b</td> <td>Quitar</td> <td>Incluir</td> </tr> </table> </div><div id = 'controlesHorarios'> <input type='button' id='borrarMateriasHorario' value='Borrar Todo'> <input type = 'button' id = 'generarMateriasHorario' value='Generar'> <input type = 'button' id = 'expImp' value = 'Exportar/Importar'> <span id ='totalSeleccion' style = ' float:right; padding-right : 30px; '>0</span> </div>  <div id = 'exportar' style = 'display : none;'>Copia el texto y guardalo en un archivo, o pega y da enter.<input id = 'exportarSeleccion' type = 'text' size = '5'/></div> <div id='informacionHorarios'></div>";
	materiasSeleccionadas.innerHTML = "<div style='background-color:black; color:white;'>"+chrome.i18n.getMessage("close_div")+"</div> <div id = 'resultadoHorarios' style='display:none; overflow-y:auto; max-height: 450px;'></div> <div id = 'asignaturasSeleccionadas' style='overflow-y:auto; max-height: 450px;'> <table id = 'tablaAsignaturas' style='width:100%;'> <tr style = 'background-color:#FF9900; color:white;'> <td>"+chrome.i18n.getMessage("group")+"</td> <td>"+chrome.i18n.getMessage("subject")+"</td> <td>"+chrome.i18n.getMessage("teacher")+"</td> <td>"+chrome.i18n.getMessage("monday")+"</td> <td>"+chrome.i18n.getMessage("tuesday")+"</td> <td>"+chrome.i18n.getMessage("wednesday")+"</td> <td>"+chrome.i18n.getMessage("thursday")+"</td> <td>"+chrome.i18n.getMessage("friday")+"</td> <td style=' display : none; '>"+chrome.i18n.getMessage("saturday")+"</td> <td>"+chrome.i18n.getMessage("delete_subject")+"</td> <td>"+chrome.i18n.getMessage("include_subject")+"</td> </tr> </table> </div><div id = 'controlesHorarios'> <input type='button' id='borrarMateriasHorario' value='"+chrome.i18n.getMessage("delete_all_button")+"'> <input type = 'button' id = 'generarMateriasHorario' value='"+chrome.i18n.getMessage("generate_button")+"'> <span id ='totalSeleccion' style = ' float:right; padding-right : 30px; '>0</span> </div>  <div id='informacionHorarios'></div>";
	var mostrarMateriasHorario 	 	= document.createElement("input");
	mostrarMateriasHorario.type  	= "button";
	mostrarMateriasHorario.value 	= chrome.i18n.getMessage("show_schedule");
	mostrarMateriasHorario.setAttribute("id","mostrarMateriasHorario");
	mostrarMateriasHorario.addEventListener("click",mostrarHorario,true);

	document.getElementById("contador").parentNode.appendChild(mostrarMateriasHorario);	
	//tabla.parentNode.innerHTML+="<div id='asignaturas' style='display:none;'></div>";
	tabla.parentNode.appendChild(materiasSeleccionadas);
	document.getElementById("borrarMateriasHorario").addEventListener("click",borrarMateriasHorario,true);
	document.getElementById("generarMateriasHorario").addEventListener("click",generarHorarios,true);
	// document.getElementById("expImp").addEventListener("click",expImp,true);
	// document.getElementById("exportarSeleccion").addEventListener("change",importar,true);
	// document.getElementById("exportarSeleccion").addEventListener("focus",seleccionarContenido,true);
	// if (localStorage.horarioMaterias!=null && localStorage.horarioMaterias!="" && localStorage.horarioMaterias!="null" ){ 
	// 	document.getElementById("exportarSeleccion").value = localStorage.horarioMaterias;
	// }
}
function seleccionarContenido (){
	this.select();
}
function importar (){
	if (this.value != localStorage.horarioMaterias){
		try {
			materiasHorario = JSON.parse(this.value);
			guardarMateriasHorario();
			alert(chrome.i18n.getMessage("reload_page"));
			// location.reload();
			document.forms[0].submit();
		} catch (msj){
			alert(chrome.i18n.getMessage("error_imp"));
			this.value = localStorage.horarioMaterias;
		}
		
	}
}
function expImp (){
	if (document.getElementById("exportar").style.display == ""){
		document.getElementById("exportar").style.display = "none";
	} else {
		document.getElementById("exportar").style.display = "";
		document.getElementById("exportarSeleccion").focus();
	}
}
function generarHorarios (){
	// log("-> Generando horarios....1");
	cargarMateriasHorarioGuardadas();
	if (materiasHorario.materias.length != 0){
		// log("-> Generando horarios....1.1");
		var materiasCombinar 	= materiasHorario;
		var grupoMaterias 		= { materias : [] };
		while (materiasCombinar.materias.length != 0){
			// log("-> Generando horarios....1.1.1");
			var agrupado = false;
			var materiaOrdenar = materiasCombinar.materias.pop();
			if (materiaOrdenar.estado){
				for (var i = 0; i < grupoMaterias.materias.length; i++){
					if (materiaOrdenar.materia == grupoMaterias.materias[i].materia){
						var grupo = { grupo : materiaOrdenar.grupo, horas : materiaOrdenar.horas, profe : materiaOrdenar.profe };
						grupoMaterias.materias[i].grupos.push(grupo);
						agrupado = true;
						break;
					}
				}
				if (!agrupado){
					var materia = { materia : materiaOrdenar.materia, grupos : [] };
					var grupo 	= { grupo : materiaOrdenar.grupo, horas : materiaOrdenar.horas, profe : materiaOrdenar.profe };
					materia.grupos.push(grupo);
					grupoMaterias.materias.push(materia);
				}
			}
		}
		//localStorage.armado = JSON.stringify(grupoMaterias);
		var gruposOrdenados = {materias : []};
		while (grupoMaterias.materias.length != 0){
			var materia = grupoMaterias.materias.shift();
			var i;
			for (i = 0; i < gruposOrdenados.materias.length; i++){
				if (materia.grupos.length <= gruposOrdenados.materias[i].grupos.length){
					break;
				}
			}
			gruposOrdenados.materias.splice(i,0,materia);
		}
		// localStorage.armadoOrdenado = "";
		localStorage.armadoOrdenado 	= JSON.stringify(gruposOrdenados);
		var horariosPosiblesAnteriores 	= { combinacion : [] };
		var combinacionesDisponibles 	= true;

		// alert("Numero de materias "+gruposOrdenados.materias.length);
		// log("-> Generando horarios....1.2");
		if (gruposOrdenados.materias.length != 0){
			// Inicializando las combinaciones
			// log("-> Generando horarios....1.2.1");
			for (var i = 0; i < gruposOrdenados.materias[0].grupos.length; i++){
				var combinacion = { secuencia : [i], horas : gruposOrdenados.materias[0].grupos[i].horas };
				horariosPosiblesAnteriores.combinacion.push(combinacion);
			}
			// Recorriendo los combinaciones anteriores
			// alert(JSON.stringify(horariosPosiblesAnteriores));
			for (var i = 1; combinacionesDisponibles && i < gruposOrdenados.materias.length; i++){
				//alert(i);
				var horariosPosibles = { combinacion : [] };
				//Combinando a partir de las combinaciones anteriores
				// alert("->"+horariosPosiblesAnteriores.combinacion.length);
				for (var j = 0; j < horariosPosiblesAnteriores.combinacion.length; j++){
					//alert("->"+j);
					// alert("- ->"+gruposOrdenados.materias[i].grupos.length);
					
					var combinacion = { secuencia : horariosPosiblesAnteriores.combinacion[j].secuencia, horas : horariosPosiblesAnteriores.combinacion[j].horas };
					for (var n = 0; n < gruposOrdenados.materias[i].grupos.length; n++){
						//alert("-->"+n);
						var encontrado = false;
						// combinacion.horas = horariosPosiblesAnteriores.combinacion[j].horas;
						// combinacion.secuencia = horariosPosiblesAnteriores.combinacion[j].secuencia;
						
						// alert(combinacion.horas+"###"+gruposOrdenados.materias[i].grupos[n].horas);
						// alert(i+" , "+n);
						for (var k = 0; !encontrado && k < gruposOrdenados.materias[i].grupos[n].horas.length; k++){
							if (buscarArregloOrdenado(combinacion.horas,gruposOrdenados.materias[i].grupos[n].horas[k]) != -1){
								encontrado = true;
							}
						}
						if (!encontrado){
							//alert("Agregado");
							var nuevaCombinacion = { secuencia : [], horas : combinacion.horas };
							nuevaCombinacion.horas = nuevaCombinacion.horas.concat(gruposOrdenados.materias[i].grupos[n].horas);
							nuevaCombinacion.horas = ordenar(nuevaCombinacion.horas);
							nuevaCombinacion.secuencia = nuevaCombinacion.secuencia.concat(combinacion.secuencia);
							// nuevaCombinacion.secuencia.push(n);
							nuevaCombinacion.secuencia[i] = n;
							//alert("secuencia  "+nuevaCombinacion.secuencia+" - "+nuevaCombinacion.secuencia.length);
							horariosPosibles.combinacion.push(nuevaCombinacion);
							// alert(n+" - "+nuevaCombinacion.secuencia+" # "+JSON.stringify(horariosPosibles.combinacion));
						}
					}
					// alert("opciones anteriores  "+j+"/"+horariosPosiblesAnteriores.combinacion.length);
				}
				if (horariosPosibles.combinacion.length != 0) horariosPosiblesAnteriores = horariosPosibles;
				else combinacionesDisponibles = false;
				// alert("opciones anteriores  "+horariosPosiblesAnteriores.combinacion.length+" #"+JSON.stringify(horariosPosiblesAnteriores.combinacion));
			}
		}
		// alert("Listo");
		// log("-> Generando horarios....1.3");
		if (combinacionesDisponibles && horariosPosiblesAnteriores.combinacion.length > 0){
			// log("-> Generando horarios....1.3.1");
			localStorage.resultados = JSON.stringify(horariosPosiblesAnteriores);
			presentarHorariosGenerados(horariosPosiblesAnteriores,gruposOrdenados);
		} else {
			// log("-> Generando horarios....1.3.2");
			document.getElementById("informacionHorarios").innerHTML = chrome.i18n.getMessage("no_results");
			cargarMateriasHorarioGuardadas();
		}
		horariosPosiblesAnteriores = null;
	}
	// log("-> Generando horarios....2");
}
function cargarHorariosGenerados (){
	if (localStorage.resultados != null && localStorage.resultados != "" && localStorage.resultados != "null" && 
		localStorage.armadoOrdenado != null && localStorage.armadoOrdenado != "" && localStorage.armadoOrdenado != "null" ){
		var gruposOrdenados = JSON.parse(localStorage.armadoOrdenado);
		var horariosPosiblesAnteriores = JSON.parse(localStorage.resultados);
		presentarHorariosGenerados(horariosPosiblesAnteriores,gruposOrdenados);
	}
}
function seleccionarHorario (){
	if (this.value != "" && this.value.length > 0){
		switch (parseInt(this.value)){
			case 0:
				mostrarSeleccionMaterias();
				break;
			default:
				mostrarHorarioGenerado(this.value);
				break;
		}
	}
}
var totalHorarios = 0;
function presentarHorariosGenerados (horariosPosiblesAnteriores, gruposOrdenados){
	var nResultados = horariosPosiblesAnteriores.combinacion.length;
	var informacion = document.getElementById("informacionHorarios");
	informacion.setAttribute("style","text-align:center;");
	// informacion.style = "text-aling:center;";
	// informacion.innerHTML 	= "Hay "+nResultados+" resultados: ";

	totalHorarios 				= parseInt(nResultados);
	var seleccionHorarios 		= document.createElement("table");
	seleccionHorarios.innerHTML = "<tr><td>"+chrome.i18n.getMessage("results_1")+nResultados+chrome.i18n.getMessage("results_2")+":</td><td><input id='seleccionHorarios' type='number' min='0' max='"+nResultados+"' value='0' size='4'/></td><td>"+chrome.i18n.getMessage("results_3")+"</td></tr>";
	seleccionHorarios.setAttribute("style","margin:0px auto;");
	informacion.innerHTML = "";
	informacion.appendChild(seleccionHorarios);
	horarioSeleccionado = 0;
	seleccionHorarios 	= document.getElementById("seleccionHorarios");
	seleccionHorarios.setAttribute("style","text-align:center;");
	seleccionHorarios.addEventListener("keyup",seleccionarHorario,true);

	// var seleccionMaterias 	= document.createElement("input");
	// seleccionMaterias.type 	= "button";
	// seleccionMaterias.value = "Inicio";
	// seleccionMaterias.addEventListener("click",mostrarSeleccionMaterias,true);
	// informacion.appendChild(seleccionMaterias);
	
	var tablaInformacion 			= document.createElement("table");
	tablaInformacion.style.display 	= "none";
	tablaInformacion.style.width 	= "100%";
	tablaInformacion.innerHTML 		= "<tr style='background-color:#FF9900; color:white;'><td>"+chrome.i18n.getMessage("group")+"</td> <td>"+chrome.i18n.getMessage("subject")+"</td> <td>"+chrome.i18n.getMessage("teacher")+"</td> <td>"+chrome.i18n.getMessage("monday")+"</td> <td>"+chrome.i18n.getMessage("tuesday")+"</td> <td>"+chrome.i18n.getMessage("wednesday")+"</td> <td>"+chrome.i18n.getMessage("thursday")+"</td> <td>"+chrome.i18n.getMessage("friday")+"</td> <td>"+chrome.i18n.getMessage("saturday")+"</td> </tr>";

	for (var i = 0; i < horariosPosiblesAnteriores.combinacion[0].secuencia.length; i++){
		tablaInformacion.insertRow(i+1);
		for (var k = 0; k < 9; k++) tablaInformacion.rows[i+1].insertCell(k);
		tablaInformacion.rows[i+1].cells[1].innerHTML = gruposOrdenados.materias[i].materia;
	}

	cargarMateriasHorarioGuardadas();
	var resultadoHorarios = document.getElementById("resultadoHorarios");
	resultadoHorarios.innerHTML = "";
	for (var n = 0; n < nResultados; n++){
		// var boton 	= document.createElement("input");
		// boton.type 	= "button";
		// boton.value = (n+1);
		// boton.addEventListener("click",mostrarHorarioGenerado,true);
		// informacion.appendChild(boton);
		var mostrarSabado = false;
		var tablaInformacionN = tablaInformacion.cloneNode(true);
		for (var i = 0; i < horariosPosiblesAnteriores.combinacion[n].secuencia.length; i++){
			tablaInformacionN.rows[i+1].cells[0].innerHTML = gruposOrdenados.materias[i].grupos[horariosPosiblesAnteriores.combinacion[n].secuencia[i]].grupo;
			if (destinoConexion != ""){
				var enlaceDiccionario = document.createElement("a");
				enlaceDiccionario.href = "#";
				enlaceDiccionario.setAttribute("style","color : #F90;");
				enlaceDiccionario.innerHTML = gruposOrdenados.materias[i].grupos[horariosPosiblesAnteriores.combinacion[n].secuencia[i]].profe;
				enlaceDiccionario.addEventListener("click",enlaceVerComentarios,false);
				tablaInformacionN.rows[i+1].cells[2].appendChild(enlaceDiccionario);
			} else {
				tablaInformacionN.rows[i+1].cells[2].innerHTML = gruposOrdenados.materias[i].grupos[horariosPosiblesAnteriores.combinacion[n].secuencia[i]].profe;
			}
			var j;
			// alert("t "+materiasHorario.materias.length);
			for (j = 0; j < materiasHorario.materias.length; j++){
				// alert(tablaInformacionN.rows[i+1].cells[0].innerHTML+"/"+materiasHorario.materias[j].grupo);
				if (tablaInformacionN.rows[i+1].cells[0].innerHTML == materiasHorario.materias[j].grupo &&  tablaInformacionN.rows[i+1].cells[1].innerHTML == materiasHorario.materias[j].materia){
					break;
				}
			}
			// alert(j);
			for (var k = 3; k < 9; k++) {
				tablaInformacionN.rows[i+1].cells[k].innerHTML = materiasHorario.materias[j].dias[k-3];
			}
			if (!mostrarSabado && materiasHorario.materias[j].dias[5] != "&nbsp;") mostrarSabado = true;
		}
		if (!mostrarSabado) {
			// log("horariosGenerados - ocultando sábado");
			for (var k = 0; k < tablaInformacionN.rows.length; k++){
				tablaInformacionN.rows[k].cells[8].style.display = "none";
			}
		}
		tablaInformacionN.setAttribute("id","horarioGenerado"+(n+1));
		tablaInformacionN.setAttribute("name","horariosGenerados");
		resultadoHorarios.appendChild(tablaInformacionN);
	}
}
function mostrarSeleccionMaterias (){
	document.getElementById("asignaturasSeleccionadas").style.display = "";
	document.getElementById("controlesHorarios").style.display = "";
	document.getElementById("resultadoHorarios").style.display = "none";
}
function ocultarHorariosGenerados (){
	var horariosGenerados = document.getElementsByName("horariosGenerados");
	for (var i = 0; i < horariosGenerados.length; i++) horariosGenerados[i].style.display = "none";
}
function mostrarHorarioGenerado(numero){
	if (numero <= totalHorarios){
		ocultarHorariosGenerados();
		document.getElementById("horarioGenerado"+numero).style.display = "";
		document.getElementById("resultadoHorarios").style.display = "";
		document.getElementById("asignaturasSeleccionadas").style.display = "none";
		document.getElementById("controlesHorarios").style.display = "none";
		document.getElementById("exportar").style.display = "none";
	}
}
function buscarArregloOrdenado (arreglo, buscar){
	var k = parseInt(arreglo.length/2);
	var i = 0;
	var n = k;
	var l = arreglo.length;

	var encontrado = false;
	var pos = -1;
	while (k != 0){
		if (buscar != arreglo[n]){					
			k = parseInt((n-i)/2);
			if (buscar > arreglo[n]){
				if (k != 1){
					i = n;
					n += k ;
				} else {
					for (n++; n < l; n++){
						if (buscar == arreglo[n]){
							encontrado = true;
							pos = n;
							break;
						}
					}
					if (!encontrado){
						break;
					}
				}
			} else {
				if (k != 1){
					n -= k;
					l = n;
				} else {
					for (n--; n >= i; n--){
						if (buscar == arreglo[n]){
							encontrado = true;
							pos = n;
							break;
						}
					}
					if (!encontrado){
						break;
					}
				}
			}
		} else {
			//encontrado = true;
			pos = n;
			break;
		}
	}
	return pos;
}
function mostrarHorario (){
	if (atajoHorarios) document.getElementById("asignaturas").style.display = "";
	//this.removeEventListener("click",mostrarHorario,true);
	//this.addEventListener("click",ocultarHorario,true);
}
function ocultarHorario (){
	document.getElementById("asignaturas").style.display = "none";
	//this.removeEventListener("click",ocultarHorario,true);
	//this.addEventListener("click",mostrarHorario,true);
}
function ocultarInfo (){
	document.getElementById("informacion").style.display = "none";
}
var materiasHorario = { materias : [] };
function agregarMateria (){
	var tabla 		= document.getElementById("regs");
	var grupo 		= tabla.rows[this.numero].cells[0].innerHTML;
	var nombre 		= tabla.rows[this.numero].cells[1].innerText;
	var profesor 	= tabla.rows[this.numero].cells[2].innerText;
	// if (destinoConexion!=""){
	// 	nombre 		= tabla.rows[this.numero].cells[1].firstChild.innerHTML;
	// 	profesor 	= tabla.rows[this.numero].cells[2].firstChild.innerHTML;
	// }
	var i = 1;
		// //indicar la posición más arriba que sea del mismo grupo para seleccionar la misma materia del mismo grupo
		// for (i = this.numero-1; i > 0; i--){
		// 	// if (grupo!=tabla.rows[i].cells[0].innerHTML || nombre!=tabla.rows[i].cells[1].innerHTML){
		// 	if (grupo != tabla.rows[i].cells[0].innerHTML){
		// 		break;
		// 	}
		// }
		// i++;

	// var celdasRelleno = 6; //celdas que no son parte del horario
	// var numeroDias = tabla.rows[i].cells.length - celdasRelleno;
	var numeroDias = 6;
	
	if (this.checked != false){ //agregar

		var dias = ["&nbsp;","&nbsp;","&nbsp;","&nbsp;","&nbsp;","&nbsp;"]; //dias de la semana
		var horasSeguimiento = new Array(); //horas combinación
		
		var horas,rango;
		var j, n, celdaInicioHorario = 5, horaDeInicioHorario = 7;

		var posicion = tabla.rows[i].cells.length-1;
		//encontrar los elementos de la misma materia y secuencia
		// for (;i < tabla.rows.length && grupo == tabla.rows[i].cells[0].innerHTML; i++){
		for (;i < tabla.rows.length; i++){
			// if ((destinoConexion != "" && nombre == tabla.rows[i].cells[1].firstChild.innerHTML) || nombre == tabla.rows[i].cells[1].innerHTML){
			if (grupo == tabla.rows[i].cells[0].innerHTML && nombre == tabla.rows[i].cells[1].innerText){
				tabla.rows[i].cells[posicion].firstChild.checked = true;
				var cambioDia = 0;
				for (j = celdaInicioHorario; j < posicion; j++){
					//verificacion de si existe una hora asignada
					if (tabla.rows[i].cells[j].innerHTML != "&nbsp;"){
						horas = tabla.rows[i].cells[j].innerHTML;
						horas = horas.replace("/\s+/g","");
						horas = horas.replace(/:/g,".");
						rango = new Array();

						//generacion de los bloques apartir de la hora asignada
						rango = horas.split("-");
						for (n = 0; n < 2; n++){
							rango[n] = parseFloat(rango[n]);
							rango[n] += 0.2;
							if (rango[n]%0.5 != 0) rango[n] = parseInt(rango[n]);
							rango[n] -= horaDeInicioHorario;
						}
							// log("R1\nrango[0] : "+rango[0]+"\nrango[1] : "+rango[1]);
						rango[1] = ((rango[1]-rango[0])*2)-1+(rango[0]*2)+cambioDia;
						rango[0] = (rango[0]*2)+cambioDia;
							// log("R2\nrango[0] : "+rango[0]+"\nrango[1] : "+rango[1]);

						var encontrarInicio = false;

						//se buscan intersecciones entre los rangos de los bloques
						for (n = 0 ;n < horasSeguimiento.length; n++){
							if (rango[0] == horasSeguimiento[n]){
								// log("->CB-A : "+horasSeguimiento[n]);
								encontrarInicio = true;
								//busca los elementos continuos de la secuencia de los bloques
								for (n++; n < horasSeguimiento.length; n++){
									log("-"+(horasSeguimiento[n-1]+1)+"!="+horasSeguimiento[n]+"?");
									if ((horasSeguimiento[n-1]+1) != horasSeguimiento[n]){
										break;
									}
								}
								// log("+"+horasSeguimiento[n-1]+"!="+rango[1]+"?");
								if (horasSeguimiento[n-1] != rango[1]){
									if (horasSeguimiento[n-1] < rango[1]){
										// log("n = "+(horasSeguimiento[n-1]+1));
										for (n = horasSeguimiento[n-1]+1; n <= rango[1]; n++) horasSeguimiento.push(n);
										if (dias[j-celdaInicioHorario] != "&nbsp;"){
											// log("agregando la celda");
											dias[j-celdaInicioHorario] += ","+tabla.rows[i].cells[j].innerHTML;
										}
										else dias[j-celdaInicioHorario] = tabla.rows[i].cells[j].innerHTML;
									}
								}
							}
						}
						if (!encontrarInicio){
							// log("->CB-N");
							//guardando los rangos originales y bloques	
							for (n = rango[0]; n <= rango[1]; n++) horasSeguimiento.push(n);
							if (dias[j-celdaInicioHorario] != "&nbsp;") dias[j-celdaInicioHorario] += ","+tabla.rows[i].cells[j].innerHTML;
							else dias[j-celdaInicioHorario] = tabla.rows[i].cells[j].innerHTML;
						}
					}
					cambioDia += 30;
				}
			}
		}

		//guardando información recopilada
		horasSeguimiento 	= ordenar(horasSeguimiento);
		var asignaturaH 	= { materia : nombre, profe: profesor, grupo : grupo, horas : horasSeguimiento, dias : dias, estado : true };
		materiasHorario.materias.push(asignaturaH);
		
		//insertando en la lista de la selección
		var asignaturasTabla = document.getElementById("tablaAsignaturas");
		asignaturasTabla.insertRow(asignaturasTabla.rows.length);
		var materiaH = asignaturasTabla.rows[asignaturasTabla.rows.length-1];
		
		var cantidadCeldas = 11;
		for (j = 0; j < cantidadCeldas; j++) materiaH.insertCell(j);
		materiaH.cells[0].innerHTML = asignaturaH.grupo;
		materiaH.cells[1].innerHTML = asignaturaH.materia;
		var quitarMateria = document.createElement("img");
		quitarMateria.src = chrome.extension.getURL("/css/menos.png");
		quitarMateria.style.cursor = "pointer";
		quitarMateria.addEventListener("click",removerMateria,true);
		materiaH.cells[cantidadCeldas-2].appendChild(quitarMateria);
		var estadoMateria 	= document.createElement("input");
		estadoMateria.type 	= "checkbox";
		estadoMateria.title = chrome.i18n.getMessage("enable_disable");
		estadoMateria.name 	= "incluirMateria";
		estadoMateria.checked 	= true;
		estadoMateria.addEventListener("change",cambiarEstadoSeleccion,true);
		materiaH.cells[cantidadCeldas-1].appendChild(estadoMateria);
		// materiaH.cells[9].innerHTML="<input type='checkbox' title='Habilitar/Deshabilitar' name='incluirMateria' checked >";
		if (destinoConexion != ""){ 
			var enlaceDiccionario 	= document.createElement("a");
			enlaceDiccionario.href 	= "#";
			enlaceDiccionario.setAttribute("style","color : #F90;");
			enlaceDiccionario.innerHTML = asignaturaH.profe;
			enlaceDiccionario.addEventListener("click",enlaceVerComentarios,false);
			materiaH.cells[2].appendChild(enlaceDiccionario);
		} else {			
			materiaH.cells[2].innerHTML = asignaturaH.profe;
		}

		for (j = 0; j < numeroDias; j++) materiaH.cells[3+j].innerHTML = dias[j];
		
		//actualizando el contador de la selección
		actualizaTotalSeleccion(1);
		// document.getElementById("totalSeleccion").innerHTML = parseInt(document.getElementById("totalSeleccion").innerHTML)+1;

		//habilitando visualización de la lista de selección
		document.getElementById("asignaturasSeleccionadas").style.display = "";
		atajoHorarios = true;
		//respaldando selección
		guardarMateriasHorario();
	} else { //quitar
		eliminaMateriaSeleccion(grupo, nombre, i, 0);
	}
	if (numeroDias > 5) {
		//verificacion para la visualización de la columna sábado
		verificaSeleccionSabado();
	}
}
function verificaSeleccionSabado (){
	//verificando datos para ocultar
	var ocultarSabado = true;
	var asignaturasTabla = document.getElementById("tablaAsignaturas");
	for (var i = 1; i < asignaturasTabla.rows.length; i++){
		if (asignaturasTabla.rows[i].cells[8].innerHTML != "&nbsp;"){
			ocultarSabado = false;
			break;
		}
	}
	var opcion = ocultarSabado ? "none" : "";
	//aplicando el cambio (mostrar, ocultar)
	for (var i = 0; i < asignaturasTabla.rows.length; i++){
		asignaturasTabla.rows[i].cells[8].style.display = opcion;
	}
}
function cambiarEstadoSeleccion (){
	var grupo 	= this.parentNode.parentNode.cells[0].innerHTML;
	var materia = this.parentNode.parentNode.cells[1].innerHTML;
	var n = materiasHorario.materias.length;
	for (var i = 0; i < n; i++){
		if (materiasHorario.materias[i].grupo == grupo && materiasHorario.materias[i].materia == materia){
			materiasHorario.materias[i].estado = this.checked;
			guardarMateriasHorario();
			break;
		}
	}
}
function borrarMateriasHorario (){
	var i;
	var tabla = document.getElementById("regs");
	for (i = 1; i < tabla.rows.length; i++) tabla.rows[i].cells[10].firstChild.checked = false;
	tabla = document.getElementById("tablaAsignaturas");
	for (i = tabla.rows.length-1; tabla.rows.length != 1; i--) tabla.deleteRow(i);
	//document.getElementById("asignaturasSeleccionadas").style.display="none";
	ocultarHorario();
	atajoHorarios 	= false;
	materiasHorario = { materias : [] };
	localStorage.horarioMaterias 	= "";
	localStorage.armadoOrdenado 	= "";
	localStorage.resultados 		= "";
	mostrarSeleccionMaterias();
	document.getElementById("exportarSeleccion").value       = "";
	document.getElementById("resultadoHorarios").innerHTML   = "";
	document.getElementById("informacionHorarios").innerHTML = "";
	document.getElementById("totalSeleccion").innerHTML      = "0";
	document.getElementById("exportar").style.display        = "none";
}
function ordenar(datos){
	var limite = datos.length, k = parseInt(limite/2), i, j, temp;
	while (k > 0){
		for (i = k; i <= limite-1; i++){
			j = i;
			while (j-k >= 0){
				if (datos[j] < datos[j-k]){
					temp 		= datos[j];
					datos[j] 	= datos[j-k];
					datos[j-k] 	= temp;
					j -= k;
				}else break;
			}
		}
		k = parseInt(k/2);
	}
	return datos;
}
function guardarMateriasHorario (){
	// log("totalGuardadoFinal :"+materiasHorario.materias.length);
	if (materiasHorario.materias.length != 0){
		localStorage.horarioMaterias = JSON.stringify(materiasHorario);
		document.getElementById("exportarSeleccion").value = localStorage.horarioMaterias;
	}
}
var atajoHorarios = false;
function cargarMateriasHorarioGuardadas (){
	if (localStorage.horarioMaterias != null && localStorage.horarioMaterias != "" && localStorage.horarioMaterias != "null" ){
		materiasHorario = JSON.parse(localStorage.horarioMaterias);
	}	
}
function removerMateria (){
	if (confirm(chrome.i18n.getMessage("confirm_delete"))){
		var grupo 	= this.parentNode.parentNode.cells[0].innerHTML;
		var materia = this.parentNode.parentNode.cells[1].innerHTML;

		eliminaMateriaSeleccion(grupo, materia, this.parentNode.parentNode.rowIndex, 1);
	}
}
function eliminaMateriaSeleccion (grupo, materia, posicion, tipoAccion){
	// log("eliminaMateriaSeleccion\n"+grupo+", "+materia+", "+posicion+", "+tipoAccion);
	var asignaturasTabla = document.getElementById("tablaAsignaturas");
	var registros = document.getElementById("regs");
	var i = posicion;
	var posicionCheck = sabadoActivo ? 11 : 10;
	switch (tipoAccion){
		case 0: //registros
			//deseleccionando las materias del mismo grupo en los registros
			for (; i < registros.rows.length && grupo == registros.rows[i].cells[0].innerHTML; i++){
				// log("----"+materia+" | "+registros.rows[i].cells[1].innerText);
				if (materia == registros.rows[i].cells[1].innerText){
					registros.rows[i].cells[posicionCheck].firstChild.checked = false;
				}
			}
			//quitando de la lista de la selección
			for (i = 1; i < asignaturasTabla.rows.length; i++){
				if (asignaturasTabla.rows[i].cells[0].innerHTML == grupo && asignaturasTabla.rows[i].cells[1].innerHTML == materia){
					asignaturasTabla.deleteRow(i);
					break;
				}
			}
			break;
		case 1: //seleccion
			//quitando de la lista de la selección
			asignaturasTabla.deleteRow(posicion);
			
			//deseleccionando las materias del mismo grupo en los registros
			for (var i = 1; i < registros.rows.length; i++){
				// if (registros.rows[i].cells[0].innerHTML == grupo && (registros.rows[i].cells[1].innerHTML == materia || (destinoConexion != "" && registros.rows[i].cells[1].firstChild.innerHTML == materia) )){
				if (registros.rows[i].cells[0].innerHTML == grupo && registros.rows[i].cells[1].innerText == materia ){
					registros.rows[i].cells[posicionCheck].firstChild.checked = false;
				}
			}
			break;
	}
	//actualiza el total de materias seleccionadas
	actualizaTotalSeleccion(-1);
	//eliminar de la lista permanente
	borrarMateriaHorario(grupo, materia);
}
function actualizaTotalSeleccion (opcion){
	document.getElementById("totalSeleccion").innerHTML = parseInt(document.getElementById("totalSeleccion").innerHTML)+opcion;	
}
function borrarMateriaHorario (grupo, nombre){
	cargarMateriasHorarioGuardadas();
	// log("totalGuardado :"+materiasHorario.materias.length);
	if (materiasHorario.materias.length > 1){
		for (var i = 0; i < materiasHorario.materias.length; i++){
			if (materiasHorario.materias[i].grupo == grupo && materiasHorario.materias[i].materia == nombre){
				if (i > parseInt(materiasHorario.materias.length/2)){
					for (; i < ((materiasHorario.materias.length)-1); i++){
						materiasHorario.materias[i] = materiasHorario.materias[i+1];
					}	
					materiasHorario.materias.pop();
				} else {
					for (; i > 0; i--){
						materiasHorario.materias[i] = materiasHorario.materias[i-1];
					}
					materiasHorario.materias.shift();
				}
				break;
			}
		}
		guardarMateriasHorario();
	} else {
		borrarMateriasHorario();	
	}
}
function cargarMateriasHorario (){
	if (localStorage.horarioMaterias != null && localStorage.horarioMaterias != "" && localStorage.horarioMaterias != "null" ){
		materiasHorario = JSON.parse(localStorage.horarioMaterias);
		var tabla = document.getElementById("regs");
		var asignaturasTabla = document.getElementById("tablaAsignaturas");
		var materiaH;
		var i;
		var numeroDias     = 6;
		var cantidadCeldas = 11;
		var posicionCheck = sabadoActivo ? 11 : 10;

		var quitarMaterias   = document.createElement("img");
		quitarMaterias.src   = chrome.extension.getURL("/css/menos.png");
		quitarMaterias.title = chrome.i18n.getMessage("delete_subject");
		quitarMaterias.style.cursor = "pointer";
		
		var estadoMaterias 		= document.createElement("input");
		estadoMaterias.type 	= "checkbox";
		estadoMaterias.title 	= chrome.i18n.getMessage("enable_disable");
		estadoMaterias.name 	= "incluirMateria";
		
		var materiaSinEstado = false;
		for (i = 0; i < materiasHorario.materias.length; i++){
			asignaturasTabla.insertRow(asignaturasTabla.rows.length);
			materiaH = asignaturasTabla.rows[asignaturasTabla.rows.length-1];
			for (var j = 0; j < cantidadCeldas; j++) materiaH.insertCell(j);
			materiaH.cells[0].innerHTML = materiasHorario.materias[i].grupo;
			materiaH.cells[1].innerHTML = materiasHorario.materias[i].materia;
			if (destinoConexion != ""){
				materiaH.cells[2].innerHTML = "<a href='#' name='diccionario' style='color:#F90;'>"+materiasHorario.materias[i].profe+"</a>";
			} else {
				materiaH.cells[2].innerHTML = materiasHorario.materias[i].profe;
			}
			var quitarMateria = quitarMaterias.cloneNode(true);
			quitarMateria.addEventListener("click",removerMateria,true);
			materiaH.cells[cantidadCeldas-2].appendChild(quitarMateria);

			var estadoMateria = estadoMaterias.cloneNode(true);
			estadoMateria.addEventListener("change",cambiarEstadoSeleccion,true);

			if (materiasHorario.materias[i].estado == undefined || materiasHorario.materias[i].estado != false){
				estadoMateria.checked = true;
				if (materiasHorario.materias[i].estado == undefined){
					materiasHorario.materias[i] = { materia : materiasHorario.materias[i].materia, profe: materiasHorario.materias[i].profe, grupo : materiasHorario.materias[i].grupo, horas : materiasHorario.materias[i].horas, dias : materiasHorario.materias[i].dias, estado : true };
					materiaSinEstado = true;
				}
			}
			materiaH.cells[cantidadCeldas-1].appendChild(estadoMateria);
			for (var j = 0; j < numeroDias; j++) materiaH.cells[3+j].innerHTML = materiasHorario.materias[i].dias[j];
			//var horas = materiasHorario.materias[i].horas;
			// while(horas.length>0){	
			// 	var gruposHoras = new Array();
			// 	for (var j=0;j<5;j++){
			// 		gruposHoras.push(new Array());
			// 	}
			// 	for (var j=0;j<horas.length;j++){
			// 		gruposHoras[parseInt(horas[j]/30)].push(horas[j]);
			// 	}
			// 	var rangos = new Array();
			// 	var max;
			// 	var min;
			// 	for (var j=0;j<5;j++){
			// 		if (gruposHoras[j].length>0){
			// 			max=gruposHoras[j][0];
			// 			min=gruposHoras[j][0];
			// 			for (var n=1; 1 && n<gruposHoras[j].length;n++){
			// 				if (max<gruposHoras[j][n]) max=gruposHoras[j][n];
			// 				if (min>gruposHoras[j][n]) max=gruposHoras[j][n];
			// 			}
			// 		}
			// 	}

			// }
			//buscando las materias de la seleccion en los registros
			for (var j = 1; j < tabla.rows.length; j++){
				// if ( (materiasHorario.materias[i].grupo == tabla.rows[j].cells[0].innerHTML) && ( ( destinoConexion != "" && materiasHorario.materias[i].materia == tabla.rows[j].cells[1].firstChild.innerHTML ) || (materiasHorario.materias[i].materia == tabla.rows[j].cells[1].innerHTML) )){
				if (materiasHorario.materias[i].grupo == tabla.rows[j].cells[0].innerHTML && materiasHorario.materias[i].materia == tabla.rows[j].cells[1].innerText ){
					tabla.rows[j].cells[posicionCheck].firstChild.checked = true;
				}				
			}
		}
		if (materiaSinEstado){
			guardarMateriasHorario();
		}
		if (i != 0){
			document.getElementById("asignaturasSeleccionadas").style.display = "";
			actualizaTotalSeleccion(i);
			// document.getElementById("totalSeleccion").innerHTML = i;
			atajoHorarios = true;
			verificaSeleccionSabado();
		}
	}
}
function marcaOcupados (){
	var id = "ctl00_mainCopy_GrvOcupabilidad";
	if (document.getElementById("regs") != null) id = "regs";
	var numRegistros = document.getElementById(id).rows.length;
	for (var i = 1; i < numRegistros; i++){
		var registros = document.getElementById(id).rows;
		if (registros[i].cells[6].innerHTML < "1"){
			var registro = registros[i].cloneNode(true);
			// registro.style="background-color: black; color: white;";
			registro.setAttribute("style", "background-color: black; color: white;");
			registros[i].parentNode.appendChild(registro);
			registros[i].parentNode.deleteRow(i);
			i--;
			numRegistros--;
		}
	}
}
var sabadoActivo = false;
function retiraSabados (){
	var tabla = document.getElementById("regs");
	var eliminar = true;
	for (var i = 1; i < tabla.rows.length; i++){
		if (tabla.rows[i].cells[10].innerHTML != "" && tabla.rows[i].cells[10].innerHTML != " " && tabla.rows[i].cells[10].innerHTML != "&nbsp;") eliminar = false;
	}
	if (eliminar){
		totalColumnas--;
		for (var i = 0; i < tabla.rows.length; i++){
			tabla.rows[i].deleteCell(10);
		}
	} else {
		sabadoActivo = true;
	}
}
function horarioDirecto (){
	valida(4);
	var comprobante = document.getElementById("ctl00_mainCopy_BtnComprobante");
	var boton = comprobante.cloneNode(true);
	boton.setAttribute("type","button");
	var enlace = document.createElement("a");
	var boleta = document.getElementById("ctl00_leftColumn_LoginViewSession_LoginNameSession").innerHTML;
	enlace.setAttribute("href", location.protocol+"//"+location.host+"/PDF/Alumnos/Reinscripciones/"+boleta+"-ComprobanteHorario.pdf");
	enlace.setAttribute("target","_blank");
	enlace.appendChild(boton);
	comprobante.parentNode.replaceChild(enlace, comprobante);
}
var accesosAtajos = new Array();
var ultimoAtajo;
function tablaAtajos (){
	var seccionAtajos = document.createElement("div");
	seccionAtajos.setAttribute("id","seccionAtajos");
	seccionAtajos.setAttribute("style","display:none; position: fixed; background-color: maroon; color: white; top: 10%; left: 50%; opacity: 0.85; z-index: 1; font-size: 17px; width:290px; margin: 0px 0px 0px -145px; -moz-box-shadow: 0 0 5px 5px #888; -webkit-box-shadow: 0 0 20px 5px#000; box-shadow: 0 0 20px 5px #000;");
	// document.getElementById("mensajeAtajos").parentNode.insertBefore(seccionAtajos,document.getElementById("mensajeAtajos"));
	document.body.appendChild(seccionAtajos);
	chrome.extension.sendMessage( { command : "getAtajos" }, function(respuesta){
		var seccionAtajos 		= document.getElementById("seccionAtajos");
		seccionAtajos.innerHTML = "<table style='border-collapse: collapse; width:100%;'></table>";
		var contenidoAtajos 	= "<tr style='background-color:#000;'><td style='padding:0px 10px 0px 10px;'>"+chrome.i18n.getMessage("shortcut")+"</td><td style='padding:0px 10px 0px 10px;'>"+chrome.i18n.getMessage("section")+"</td></tr>";
		var teclaAtajo 	= 48;
		ultimoAtajo 	= respuesta.atajos.atajo.length;
		for (var i = 0; i < ultimoAtajo; i++){
			if (respuesta.atajos.atajo[i].visible){
				if (teclaAtajo > 57 && teclaAtajo < 66){
					teclaAtajo =  65;
				}
				contenidoAtajos += "<tr><td style='padding:0px 10px 0px 10px;'>"+String.fromCharCode(teclaAtajo)+"</td><td style='padding:0px 10px 0px 10px;'>"+respuesta.atajos.atajo[i].nombre+"</td></tr>";
				accesosAtajos.push(respuesta.atajos.atajo[i].url);
				teclaAtajo++;
			}
		}
		seccionAtajos.firstChild.innerHTML = contenidoAtajos;
	});
}
function agregaIdentificacion (){
	if (location.pathname != "/Default.aspx"){
		chrome.extension.sendMessage( { command : "getDatos"}, identificar);
	} else {
		chrome.extension.sendMessage( { command : "getDatos"}, reaccion);
	}
}
function inicio(){
	var pagina 	= /^https\:\/\/www[.]saes[.]\w+[.]ipn[.]mx$/;
	var url 	= location.protocol+"//"+location.host;
	if (url.match(pagina) && location.pathname.indexOf("/PDF/") != 0){
		valida(1);
		creaFlujo();
		tablaAtajos();
		window.addEventListener("keyup",atajosEjecucion,true);
		ajustarDisenio();
		agregaIdentificacion();
		detectaPantalla();
	}
}
inicio();