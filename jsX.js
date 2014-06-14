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
		disenio.innerHTML 	= "#subnav .item {	padding : 0px 7px;	border : none; display : inline-block; width : 150px; }";
		var elementosMenu 	= document.getElementsByClassName("item ctl00_subMenu_4");
		for (var i = 0; i < elementosMenu.length; i++){
			if (elementosMenu[i].children.length == 2){
				elementosMenu[i].children[1].style.paddingLeft = "20px";
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
	if (opcion != null){
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
	controlesBuscador.innerHTML = 	'<input type="search" placeholder="'+chrome.i18n.getMessage("search_input")+'" id="buscar"/>'+
									'<input type="button" id="ver" value="'+chrome.i18n.getMessage("show_all_button")+'">'+
									'&nbsp;<span id="contador"></span>&nbsp;';
	var tipo;
	switch (opc){
		case 1: //ocupabilidad
			tipo = "ctl00_mainCopy_GrvOcupabilidad";
			var boton = document.createElement("input");
			boton.setAttribute("type","button");
			// boton.setAttribute("value","Recargar");
			// boton.setAttribute("id","boton_recargar");
			// boton.addEventListener("click",actualizaOcupabilidad,true);

			boton.setAttribute("value",chrome.i18n.getMessage("selection_filter"));
			boton.setAttribute("id","boton_recargar");
			boton.addEventListener("click",filtraSeleccion,true);
			controlesBuscador.appendChild(boton);
			break;
		case 2: //horarios
			tipo = "ctl00_mainCopy_dbgHorarios";
			controlesBuscador.innerHTML += 	"<input type = 'button' id = 'expImp' value = '"+chrome.i18n.getMessage("imp_button")+"' title='"+chrome.i18n.getMessage("import_message")+"'/>"+
											"<div id = 'exportar'>"+
												"<input id = 'exportarSeleccion' type = 'file'/>"+
												"<span class='importar'>"+chrome.i18n.getMessage("imp_text")+"</span>"+
											"</div>"; 
			break;
	}
	document.getElementById(tipo).parentNode.insertBefore(controlesBuscador, document.getElementById(tipo));
	if (tipo == "ctl00_mainCopy_dbgHorarios"){
		document.getElementById("expImp").addEventListener("click",expImp,true);
		var exportar = document.getElementById("exportar");
		exportar.classList.add("oculto");
		exportar.classList.add("fueraImportar");
		// exportar.addEventListener("dragstart",moviendo,false);
		exportar.addEventListener("dragenter",sobreImportar,true);
		exportar.addEventListener("dragover",colocandoImportar,true);
		exportar.addEventListener("drop",ingresandoImportar,true);
		document.getElementById("exportarSeleccion").addEventListener("change",seleccionImportar,true);
		//document.getElementById("exportarSeleccion").addEventListener("focus",seleccionarContenido,true);
		if (localStorage.horarioMaterias != null && localStorage.horarioMaterias != "" && localStorage.horarioMaterias != "null" ){ 
			// document.getElementById("exportarSeleccion").value = localStorage.horarioMaterias;
		}
	}
	document.getElementById(tipo).setAttribute("id","regs");
	inicializar();
}
function filtraSeleccion (){
	if (localStorage.horarioMaterias != null && localStorage.horarioMaterias != ""){
		var listaMaterias = JSON.parse(localStorage.horarioMaterias);
		if (listaMaterias.materias.length > 0){

			var ocultos 	= new Array();
			var visibles 	= new Array();
			var encontrado;
			var registros = document.getElementById("regs").rows;
			var numRegistros = registros.length;
			var inicio = 1; //posicion de incio en la tabla de los registros
			

			
			// visibles.push(registros[registrosVisibles[i]].numero);
			// ocultos.push(registros[registrosVisibles[i]].numero);


		    //recorriendo los elementos de la lista
			for (var i = 0; i < listaMaterias.materias.length; i++){

				var registroMateria = listaMaterias.materias[i];
				//recorriendo los registros de la tabla
				for (var j = inicio; j < numRegistros; j++){
					if (registros[j].cells[0].innerHTML == registroMateria.grupo && registros[j].cells[2].innerHTML == registroMateria.materia){
						visibles.push(j);
					}
				}
			}

			visibles = ordenar(visibles);

			//generando la lista de ocultos
			for (var i = inicio; i < numRegistros; i++){
				encontrado =  false;
				for (var j = 0; !encontrado && j < visibles.length; j++){
					if (i == visibles[j]){
						encontrado = true;
					}
				}
				if (!encontrado){
					ocultos.push(i);
				}
			}

			//mostrando
			for (var j = 0; j < visibles.length; j++){
				registros[ visibles[j] ].setAttribute("class","visible");
			}

			//ocultando
			for (var j = 0; j < ocultos.length; j++){
				registros[ ocultos[j] ].setAttribute("class","oculto");
			}
		    document.body.datosVisibles.push(visibles);
		    contar();
		} else {
			alert("No ha seleccionado ninguna materia.");
		}
	} else {
		mensajeFiltrado();
	}
}
function mensajeFiltrado (){
	alert(chrome.i18n.getMessage("message_selection_filter"));
}
function seleccionImportar (){
	validaArchivo(this.files[0]);
}
function validaArchivo (archivo){
	var tipoArchivo = /text.*/;
	if (archivo.type.match(tipoArchivo)){
		var lector = new FileReader();
		lector.onload = function(event) {
  			infoImportar = lector.result;
		}
		lector.readAsText(archivo);
		setTimeout(temporizadorImportar,500);
	} else {
		alert(chrome.i18n.getMessage("error_type_file"));
	}
}
function sobreImportar (evento){
	// log("1");
	this.classList.remove('fueraImportar');
	this.classList.add('sobreImportar');
	return false;
}
function colocandoImportar (evento){
	// log("2");
	this.style.opacity = '1';
	evento.dataTransfer.dropEffect = 'move';
	if (evento.preventDefault) {
		evento.preventDefault();
	}
	return false;
}
function ingresandoImportar (evento){
	// log("4");
	evento.stopPropagation(); // Detiene al navegador para que no lea el archivo
	evento.preventDefault();
	if (evento.dataTransfer.files.length > 0){	
		var file = evento.dataTransfer.files[0];
		validaArchivo(file);
		var lector = new FileReader();
		lector.onload = function(event) {
	  		infoImportar = lector.result;
		}
		lector.readAsText(file);
		setTimeout(temporizadorImportar,500);
	}
	this.classList.remove('sobreImportar');
	this.classList.add('fueraImportar');
	return false;
}
function temporizadorImportar (){
	importar(infoImportar);
}
//##############<-buscador

function actualizaOcupabilidad(){
	valida(3);
}
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
							//document.querySelector("#__EVENTTARGET").value   = "ctl00$mainCopy$Aceptar";
							// document.querySelector("#__EVENTARGUMENT").value = "";

							case "__EVENTTARGET" :
								parametros += agregar+encodeURIComponent(elementos[i].getAttribute("name"))+"="+encodeURIComponent("ctl00$mainCopy$dpdplan");
								break;	
							case "__EVENTARGUMENT" :
								parametros += agregar+encodeURIComponent(elementos[i].getAttribute("name"))+"=";
								break;
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
				// var recargar = document.getElementById("boton_recargar");

				// var marco = document.createElement("iframe");
				// marco.setAttribute("name","marco_recargar");
				// marco.setAttribute("style","position: fixed; left: 10%; top: 10%; width: 85%; z-index: 99; height: 70%;");
				// recargar.parentNode.appendChild(marco);

				document.getElementById("__EVENTTARGET").value = "ctl00$mainCopy$dpdplan";

				var formulario = document.getElementById("aspnetForm");
				// formulario.setAttribute("target","marco_recargar");
				formulario.submit();

				/*
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
				*/

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
	
	//solución de las teclas numéricas
	if (codigoTecla > 95) codigoTecla -=48;
	
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
				chrome.extension.sendMessage( { command : "setDatos", escuela : location.host, boleta : boleta, pass : pass, identificar : true }, identificar);
			} else {
				alert(chrome.i18n.getMessage("error_data_login"));
				this.checked = false;
			}
		}
	} else {
		chrome.extension.sendMessage( { command : "setDatos", identificar : false }, identificar);
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
			destinoConexion = "http://foroupiicsa.net/diccionario/";
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
			enlaces.rows[i].cells[1].innerHTML = "<a href='#' name='diccionario' title='"+chrome.i18n.getMessage("comments")+"' class='tooltip'>"+enlaces.rows[i].cells[1].innerHTML+"</a>";
			enlaces.rows[i].cells[2].innerHTML = "<a href='#' name='diccionario' title='"+chrome.i18n.getMessage("comments")+"' class='tooltip'>"+enlaces.rows[i].cells[2].innerHTML+"</a>";
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
		case "/Alumnos/Evaluacion_docente/califica_profe.aspx":
		case "/Alumnos/Evaluacion_Docente/Califica_Profe.aspx":
			evaluacionProfesores();
			chrome.extension.sendMessage( { command : "getEvaluacionProfesores"}, controlaEvaluacion);
			break;
		// case "/Alumnos/Evaluacion_docente/califica_profe.aspx":
		case "/Alumnos/Evaluacion_docente/evaluacion_profesor.aspx":
		case "/Alumnos/Evaluacion_Docente/evaluacion_profesor.aspx":
			chrome.extension.sendMessage( { command : "getEvaluacionProfesores"}, evaluarProfesor);
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
					seleccionOptativas();
					cargarOptativas();
					inicializarOrdenamiento();
					verComentarios();
					cargarHorariosGenerados();
					cargarTraslapes();
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
			}
			// informacionHistorico();
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
function controlaEvaluacion (respuesta){
	if (respuesta.profesores.length > 0){
		var califica = false;
		var listaProfesores = document.querySelector("#ctl00_mainCopy_GV_Profe");
		if (listaProfesores){
			var i,j;
			for (j = 0; j < respuesta.profesores.length; j++){
				for (i = 1; i < listaProfesores.rows.length; i++){
					if (respuesta.profesores[j] == listaProfesores.rows[i].cells[3].querySelectorAll("a")[1].search){
						listaProfesores.rows[i].cells[4].firstChild.checked = true;
						califica = true;
						break;
					}
				}
			}
		}
		if (califica){
			desactivaEvaluacionProfesores();
			// ejecutaEvaluacionProfesor();
		} else {
			chrome.extension.sendMessage( { command : "setEvaluacionProfesores", calificacion : "", profesores : [] }, autoEvaluacionGuardada);
		}
	}
}
function cancelaEvaluacionProfesores (){
	clearTimeout(temporizadorEvaluacionProfesores);
	chrome.extension.sendMessage( { command : "setEvaluacionProfesores", calificacion : "", profesores : [] }, autoEvaluacionGuardada);	

	var activarEvaluacion = document.querySelector("#aplicaCalificacion");
	activarEvaluacion.value = chrome.i18n.getMessage("apply_autoevaluation");
	activarEvaluacion.addEventListener("click",aplicaEvaluacionProfesores,true);
}
var temporizadorEvaluacionProfesores;
function desactivaEvaluacionProfesores (){
	var activarEvaluacion = document.querySelector("#aplicaCalificacion");
	activarEvaluacion.value = chrome.i18n.getMessage("cancel_autoevaluation");
	activarEvaluacion.removeEventListener("click",aplicaEvaluacionProfesores,true);
	activarEvaluacion.addEventListener("click",cancelaEvaluacionProfesores,true);
	activarEvaluacion.focus();
	temporizadorEvaluacionProfesores = setTimeout(ejecutaEvaluacionProfesor,"1500");
}
function ejecutaEvaluacionProfesor (){
	var profesor = document.querySelector('input[name="calificaProfesor"]:checked');
	location.assign(profesor.parentNode.parentNode.cells[3].querySelectorAll("a")[1].href);
}
function evaluarProfesor (respuesta){
	var profesorEvaluado = false;
	if (respuesta.profesores.length > 0){
		for (var j = 0; j < respuesta.profesores.length; j++){
			if (respuesta.profesores[j] == location.search){
				profesorEvaluado = true;
				break;
			}
		}
		if (profesorEvaluado){
			var tipo = 1;
			switch (respuesta.calificacion){
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
				default:
					log("E:"+respuesta.calificacion);
					break;
			}

			document.querySelector("#__EVENTTARGET").value   = "ctl00$mainCopy$Aceptar";
			document.querySelector("#__EVENTARGUMENT").value = "";

			document.querySelector("select").form.submit();
			// document.forms[0].submit();
			// location.assign(document.referrer);
		}
	} else {
		if (confirm(chrome.i18n.getMessage("question_score_teacher"))){
			pedir(1);
		}
	}	
}
function evaluacionProfesores (){
	var listaProfesores = document.querySelector("#ctl00_mainCopy_GV_Profe");
	if (listaProfesores && listaProfesores.rows.length > 1){
		var controlesCalificar = document.createElement("div");
		controlesCalificar.setAttribute("style","text-align:right;");

		var opciones = "";
		var opcionesCalificar = chrome.i18n.getMessage("options_score_all").split(",");
		for (var i = 0; i < opcionesCalificar.length; i++) opciones += "<option value='"+(i+1)+"'>"+ opcionesCalificar[i]+"</option>";

		controlesCalificar.innerHTML = chrome.i18n.getMessage("text_options_score_all")+"<select id='calificacionProfesores'>"+opciones+"</select><input type='button' id='aplicaCalificacion' value='"+chrome.i18n.getMessage("apply_autoevaluation")+"'><br/><br/>";

		listaProfesores.parentNode.insertBefore(controlesCalificar,listaProfesores);
		document.querySelector("#aplicaCalificacion").addEventListener("click",aplicaEvaluacionProfesores,true);

		for (var i = 0; i < listaProfesores.rows.length; i++){
			listaProfesores.rows[i].insertCell(4);
			listaProfesores.rows[i].cells[4].innerHTML = (i!=0) ? "<input type='checkbox' name='calificaProfesor'/>" : "#";
			listaProfesores.rows[i].cells[4].setAttribute("style","text-align:center");
		}
		document.querySelector("#calificacionProfesores").focus();
	}
}
function aplicaEvaluacionProfesores (){
	if (confirm(chrome.i18n.getMessage("confirm_delete"))){
		var calificacion = document.querySelector("#calificacionProfesores").value;

		var checkProfesores = document.querySelectorAll('input[name="calificaProfesor"]:checked');
		if (checkProfesores.length > 0){		
			var profesores = new Array();
			for (var i = 0; i < checkProfesores.length; i++) {
				profesores.push(checkProfesores[i].parentNode.parentNode.cells[3].querySelectorAll("a")[1].search);
			}
			chrome.extension.sendMessage( { command : "setEvaluacionProfesores", calificacion : calificacion, profesores : profesores }, autoEvaluacionGuardada);
			desactivaEvaluacionProfesores();
		} else {
			alert(chrome.i18n.getMessage("text_nothing_selected_score"));
		}
	}
}
function autoEvaluacionGuardada (){
	log("Evaluación - Guardada");
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
function medidasCeldasSeleccion () {
	return new Array (71,229,223,69,69,69,69,69,69,63,63);
}
// function quitaEspacioCeldas (){
// 	var estilosSeleccionMaterias = document.createElement("style");	
// 	estilosSeleccionMaterias.innerHTML = " td, th { padding : 0px 0px } ";
// 	document.getElementById("regs").parentNode.appendChild(estilosSeleccionMaterias);
// }
function inicializarOrdenamiento (){
	var registros = document.querySelectorAll('div[name="contenedorRegistro"]');
	for (var i = 0; i < registros.length; i++){
		registros[i].addEventListener("dragstart",moviendo,false);
		registros[i].addEventListener("dragenter",sobre,false);
		registros[i].addEventListener("dragover",colocando,false);
		// registros[i].addEventListener("dragleave",saliendo,false);
		registros[i].addEventListener("drop",ingresando,false);
		registros[i].addEventListener("dragend",soltando,false);
		registros[i].setAttribute("draggable",true);
		registros[i].className = "fuera";
	}
	posicionRegistroSeleccionado = null;
}
var posicionRegistroSeleccionado;
function moviendo (evento){
	this.style.opacity = '0.4';
	posicionRegistroSeleccionado = this.parentNode.parentNode.rowIndex-1;
	evento.dataTransfer.effectAllowed = 'move';
// 		evento.dataTransfer.setData('text/html', this.innerHTML);
}
function colocando (evento){
	this.style.opacity = '1';
	evento.dataTransfer.dropEffect = 'move';
	 if (evento.preventDefault) {
		evento.preventDefault();
	}
	return false;
}
function sobre (evento){
	var registros = document.querySelectorAll('div[name="contenedorRegistro"]');
	for (var i = 0; i < registros.length; i++){
		// registros[i].className = "fuera";
		registros[i].classList.remove("sobre");
		registros[i].classList.add("fuera");
	}
	// this.className = "sobre";
	this.classList.remove("fuera");
	this.classList.add("sobre");
	return false;
}
function saliendo (evento){
	// this.classList.remove('sobre');
	// this.classList.remove('fuera');
	return false;
}
function soltando (){
	var registros = document.querySelectorAll('div[name="contenedorRegistro"]');
	for (var i = 0; i < registros.length; i++){
		// registros[i].className = "fuera";
		registros[i].classList.remove("sobre");
		registros[i].classList.add("fuera");
		registros[i].setAttribute("draggable","true");
		registros[i].style.opacity = '1';
	}
	return false;
}
function ingresando (evento){
	if (evento.stopPropagation) {
		evento.stopPropagation(); // stops the browser from redirecting.
	}
	// if (dragSrcEl != this) {
	// 	// Set the source column's HTML to the HTML of the column we dropped on.
	// 	dragSrcEl.innerHTML = this.innerHTML;
	// 	this.innerHTML = evento.dataTransfer.getData('text/html');
	// }
	var posicionCambio = this.parentNode.parentNode.rowIndex-1;
	var registros = document.querySelectorAll('div[name="contenedorRegistro"]');
	if (posicionRegistroSeleccionado != posicionCambio){
		var temp = registros[posicionRegistroSeleccionado].children[0].rows[0].cloneNode(true);
		var i, j, inicio = 0, fin = 9, check = 10;
		if (posicionRegistroSeleccionado > posicionCambio){
			for (i = posicionRegistroSeleccionado; i > posicionCambio; i--){
				for (j = inicio; j < fin; j++){
					registros[i].children[0].rows[0].cells[j].innerHTML = registros[i-1].children[0].rows[0].cells[j].innerHTML;
				}
				registros[i].children[0].rows[0].cells[check].children[0].checked = registros[i-1].children[0].rows[0].cells[check].children[0].checked;
			}
		} else {
			for (i = posicionRegistroSeleccionado; i < posicionCambio; i++){
				// console.log(i+"/"+posicionCambio+":"+registros.length);
				for (j = inicio; j < fin; j++){
					registros[i].children[0].rows[0].cells[j].innerHTML = registros[i+1].children[0].rows[0].cells[j].innerHTML;
				}
				registros[i].children[0].rows[0].cells[check].children[0].checked = registros[i+1].children[0].rows[0].cells[check].children[0].checked;
			}
		}
		for (j = inicio; j < fin; j++){
			registros[i].children[0].rows[0].cells[j].innerHTML = temp.cells[j].innerHTML;
		}
		registros[i].children[0].rows[0].cells[check].children[0].checked = temp.cells[check].children[0].checked;
		//remarcar los resaltados
		removerResaltado();
		agregaResaltado();
	}
	actualizaMaterias();
	return false;
}
function agregaResaltado (){
	// log("agregaResaltado\t\t1");
	var registros = document.querySelectorAll('span.resaltar');
	for (var i = 0; i < registros.length; i++){
		// log("agregaResaltado\t\t1.5");
		registros[i].parentNode.parentNode.parentNode.parentNode.parentNode.classList.add("resaltar");
	}
	// log("agregaResaltado\t\t2");
}
function seleccionMaterias (){

	var anchoSeleccion = parseInt(window.innerHeight * 0.8);

	var estilosSeleccionMaterias = document.createElement("style");
	estilosSeleccionMaterias.innerHTML =  "div#asignaturas { min-height : 80px; min-width : 250px; position : fixed; background-color : maroon; color : white; top : 6%; left : 50%; opacity : 0.85; z-index : 1; font-size : 17px; margin : 0px 0px 0px -525px; box-shadow: 0 0 20px 5px #000; width: 1050px; } ";
	estilosSeleccionMaterias.innerHTML += "div#asignaturas > div:nth-child(1) { background-color : #000; color : #FFF; } ";
	estilosSeleccionMaterias.innerHTML += "div#resultadoHorarios { overflow-y : auto; max-height : "+anchoSeleccion+"px; } ";
	estilosSeleccionMaterias.innerHTML += "div#asignaturasSeleccionadas { overflow-y:auto; max-height: "+anchoSeleccion+"px; } ";
	estilosSeleccionMaterias.innerHTML += "div#asignaturasSeleccionadas > table { width:100%; } ";
	estilosSeleccionMaterias.innerHTML += "table#tablaAsignaturas > tbody > tr:nth-child(1), table[name='traslapes'] > tbody > tr:nth-child(1), table#tablaOptativas tr:nth-child(1) { background-color : #F90; color : #FFF; } ";
	// estilosSeleccionMaterias.innerHTML += "table.traslapes tr:not(.titulos) td { border : 1px solid #FFF } ";
	estilosSeleccionMaterias.innerHTML += "table[name='traslapes'] td, div#informacionOptativas td { border : 1px solid #FFF; } table[name='traslapes'], table#tablaOptativas { border-collapse : collapse; } ";
	estilosSeleccionMaterias.innerHTML += ".ocultar { display : none; } ";
	estilosSeleccionMaterias.innerHTML += "span#totalSeleccion { float:right; padding-right : 30px; padding-top : 3px; } ";
	// estilosSeleccionMaterias.innerHTML += "table#tablaAsignaturas table td { border: 1px solid #AAA; } ";
	estilosSeleccionMaterias.innerHTML += "table#tablaAsignaturas td, th { padding : 0px 0px } ";
	estilosSeleccionMaterias.innerHTML += "div[name='contenedorRegistro'] { cursor : pointer; } div[name='contenedorRegistro'] > table { width : 100% } ";
	estilosSeleccionMaterias.innerHTML += "div#exportar { width : 560px; background-color : #DADADA; text-align : left; padding : 5px 20px 5px 20px; } ";
	estilosSeleccionMaterias.innerHTML += "span.importar { text-decoration : underline; font-weight : bold; text-transform : uppercase; } ";
	estilosSeleccionMaterias.innerHTML += "[draggable] { -webkit-user-select : none; -webkit-user-drag: element; } .sobre { border : 2px dashed #FFF; } .sobreImportar { border : 2px dashed #000; } .fuera { border : 2px solid #800000; } .fueraImportar { border : 1px solid #000; } .seleccionado { background-color : rgba(122, 196, 41, 0.53); } ";
	estilosSeleccionMaterias.innerHTML += "div.tabla { display : table; width : 100%; } div.celda { display : table-cell; vertical-align : middle; } ";
	estilosSeleccionMaterias.innerHTML += "div.resaltar { border : 1px solid #FFF; background-color : #154215; } ";
	estilosSeleccionMaterias.innerHTML += "div#informacionOptativas { text-align : center; } div#detalleTraslapes table, table#tablaOptativas { margin : 0px auto; } ";
	estilosSeleccionMaterias.innerHTML += "div#controlesHorarios, div#informacionHorarios { background-color : #000 } ";
	estilosSeleccionMaterias.innerHTML += ".tooltip { display : inline; position : relative; } ";
	estilosSeleccionMaterias.innerHTML += ".tooltip:hover:after { background : rgba(0,0,0,.75); border-radius : 5px; bottom : 26px; color : #FFF; content : attr(title); font-size : 14px; text-aling : justify; left : 20%; padding : 5px 15px; position : absolute; z-index : 98; width : 220px; } ";
	estilosSeleccionMaterias.innerHTML += ".tooltip:hover:before { border : solid; border-color : #000 transparent; border-width : 6px 6px 0 6px; bottom : 20px; content : ''; left : 50%; position : absolute; z-index : 99; } ";
	estilosSeleccionMaterias.innerHTML += ".titulo_tabla { color : #FF9900; text-transform : uppercase; } "; 

	var medidasCeldas = medidasCeldasSeleccion();
	for (var j = 0; j < medidasCeldas.length; j++) {
		// estilosSeleccionMaterias.innerHTML += "table#tablaAsignaturas > tbody > tr:nth-child(1) > td:nth-child(" + (j+1) + "){ width : " + medidasCeldas[j] + "px } table#tablaAsignaturas table td:nth-child(" + (j+1) + "){ width : " + (medidasCeldas[j]-4) + "px } ";
		estilosSeleccionMaterias.innerHTML += "table#tablaAsignaturas > tbody > tr:nth-child(1) > td:nth-child(" + (j+1) + "), table#tablaAsignaturas table td:nth-child(" + (j+1) + "){ width : " + (medidasCeldas[j]-4) + "px; } ";
	}

	var tabla = document.getElementById("regs");
	var posicion = tabla.rows[0].cells.length;
	tabla.rows[0].insertCell(posicion);
	tabla.rows[0].cells[posicion].innerHTML = "#";

	var cuadros   = document.createElement("input");
	cuadros.type  = "checkbox";
	cuadros.title = chrome.i18n.getMessage("add_subject");
	cuadros.setAttribute("class","tooltip");

	for (var i = 1; i < tabla.rows.length; i++){
		tabla.rows[i].insertCell(posicion);

		var cuadro 		= cuadros.cloneNode(true);
		cuadro.numero 	= i;
		cuadro.addEventListener("click",agregarMateria,true);

		tabla.rows[i].cells[posicion].appendChild(cuadro);
	}
	var materiasSeleccionadas = document.createElement("div");
	materiasSeleccionadas.id  = "asignaturas";
	materiasSeleccionadas.classList.add("oculto");
	// materiasSeleccionadas.className = "oculto";
	// materiasSeleccionadas.setAttribute("class","oculto");

	//materiasSeleccionadas.setAttribute("style","display:none; min-height:80px; min-width:250px; position: fixed; background-color: maroon; color: white; top: 6%; left: 50%; opacity: 0.85; z-index: 1; font-size: 17px; margin:0px 0px 0px -525px; -moz-box-shadow: 0 0 5px 5px #888; -webkit-box-shadow: 0 0 20px 5px#000; box-shadow: 0 0 20px 5px #000; width: 1050px; ");
	
	materiasSeleccionadas.innerHTML = 	"<div>"+chrome.i18n.getMessage("close_div")+"</div>"+
										"<div id = 'resultadoHorarios'></div>"+
										"<div id = 'asignaturasSeleccionadas'>"+
											"<table id = 'tablaAsignaturas'>"+
												"<tr>"+
													"<td>"+chrome.i18n.getMessage("group")+"</td>"+
													"<td>"+chrome.i18n.getMessage("subject")+"</td>"+
													"<td>"+chrome.i18n.getMessage("teacher")+"</td>"+
													"<td>"+chrome.i18n.getMessage("monday")+"</td>"+
													"<td>"+chrome.i18n.getMessage("tuesday")+"</td>"+
													"<td>"+chrome.i18n.getMessage("wednesday")+"</td>"+
													"<td>"+chrome.i18n.getMessage("thursday")+"</td>"+
													"<td>"+chrome.i18n.getMessage("friday")+"</td>"+
													"<td name = 'sabado'>"+chrome.i18n.getMessage("saturday")+"</td>"+
													"<td>"+chrome.i18n.getMessage("delete_title")+"</td>"+
													"<td>"+chrome.i18n.getMessage("include_subject")+"</td>"+
												"</tr>"+
											"</table>"+
										"</div>"+
										"<div id = 'controlesHorarios'>"+
											"<input type='button' id='exportar_boton' value='"+chrome.i18n.getMessage("exp_button")+"' title='"+chrome.i18n.getMessage("export_message")+"'/>"+
											"<input type='button' id='borrarMateriasHorario' value='"+chrome.i18n.getMessage("delete_all_button")+"'/>"+
											"<input type = 'button' id = 'generarMateriasHorario' value='"+chrome.i18n.getMessage("generate_button")+"'/>"+
											"<input type = 'button' id = 'optativas' value='"+chrome.i18n.getMessage("optionals")+"'/>"+
											"<span id = 'totalSeleccion' title='"+chrome.i18n.getMessage("total_selection")+"'>0</span>"+
										"</div>"+
										"<div id = 'informacionHorarios'></div>"+
										"<div id = 'informacionOptativas' class= 'oculto'></div>"+
										"<div id = 'detalleTraslapes' class= 'oculto'></div>";

	var mostrarMateriasHorario 	 	= document.createElement("input");
	mostrarMateriasHorario.type  	= "button";
	mostrarMateriasHorario.value 	= chrome.i18n.getMessage("show_selection");
	mostrarMateriasHorario.setAttribute("id","mostrarMateriasHorario");
	mostrarMateriasHorario.addEventListener("click",mostrarHorario,true);
	document.getElementById("contador").parentNode.appendChild(mostrarMateriasHorario);	

	tabla.parentNode.appendChild(materiasSeleccionadas);
	tabla.parentNode.appendChild(estilosSeleccionMaterias);

	document.getElementById("borrarMateriasHorario").addEventListener("click",borrarMateriasHorario,true);
	document.getElementById("generarMateriasHorario").addEventListener("click",generarHorarios,true);
	document.getElementById("exportar_boton").addEventListener("click",exportar,true);
	document.getElementById("optativas").addEventListener("click",mostrarOptativas,true);
	// setTimeout(quitaEspacioCeldas,5000);
}
function seleccionOptativas (){
	//Construyendo la tabla de optativas
	var tituloOptativas = document.createElement("h3");
	tituloOptativas.innerHTML = chrome.i18n.getMessage("title_optionals");
	tituloOptativas.setAttribute("class","titulo_tabla");

	var tablaOptativas = document.createElement("table");
	tablaOptativas.setAttribute("id","tablaOptativas");
	tablaOptativas.insertRow(0);
	tablaOptativas.rows[0].insertCell(0);
	tablaOptativas.rows[0].insertCell(1);
	tablaOptativas.rows[0].cells[0].innerHTML = chrome.i18n.getMessage("subject");
	tablaOptativas.rows[0].cells[1].innerHTML = chrome.i18n.getMessage("optional");

	var regresar = document.createElement("input");
	regresar.type = "button";
	regresar.value = chrome.i18n.getMessage("return");
	regresar.addEventListener("click",mostrarOptativas,true);

	var informacionOptativas = document.getElementById("informacionOptativas");
	informacionOptativas.appendChild(tituloOptativas);
	informacionOptativas.appendChild(tablaOptativas);
	informacionOptativas.appendChild(document.createElement("br"));
	informacionOptativas.appendChild(regresar);
}
function cargarOptativas (){
	if (localStorage.horarioMaterias != null && localStorage.horarioMaterias != ""){
		var listaOptativas;
		if (localStorage.optativas != null && localStorage.optativas != ""){
			listaOptativas = JSON.parse(localStorage.optativas);
		} else {
			materiasHorario = JSON.parse(localStorage.horarioMaterias);
			//Agrupando los datos por materia
			listaOptativas = new Array();
			var i, j, encontrado;
			for (i = 0; i < materiasHorario.materias.length; i++){
				encontrado = false;
				for (j = 0; !encontrado && j < listaOptativas.length; j++){
					if (materiasHorario.materias[i].materia == listaOptativas[j].materia){
						encontrado = true;
					}
				}
				if (!encontrado){
					listaOptativas.push( { materia : materiasHorario.materias[i].materia, check : false });
				}
			}
			localStorage.optativas = JSON.stringify(listaOptativas);
		}
		insertarOptativas(listaOptativas);
	}
}
function cambiaEstadoOptativa (){
	var posicion = this.parentNode.parentNode.rowIndex-1;
	var listaOptativas = JSON.parse(localStorage.optativas);
	listaOptativas[posicion].check = !listaOptativas[posicion].check;
	localStorage.optativas = JSON.stringify(listaOptativas);
}
function mostrarOptativas (){
	switch (this.value){
		case chrome.i18n.getMessage("optionals"):
			document.getElementById("informacionOptativas").removeAttribute("class");
			document.getElementById("asignaturasSeleccionadas").classList.add("oculto");
			document.getElementById("controlesHorarios").classList.add("oculto");
			document.getElementById("informacionHorarios").classList.add("oculto");
			document.getElementById("resultadoHorarios").classList.add("oculto");
			break;
		case chrome.i18n.getMessage("return"):
		default:
			document.getElementById("informacionOptativas").classList.add("oculto");
			mostrarSeleccionMaterias();
			document.getElementById("informacionHorarios").removeAttribute("class");
			var contadorSeleccion = document.getElementById("seleccionHorarios");
			if (contadorSeleccion){
				contadorSeleccion.value = 0;
			}
			break;
	}
}
function agregarOptativa (materia){
	var encontrado = false;
	var listaOptativas = JSON.parse(localStorage.optativas);
	for (var i = 0; i < listaOptativas.length; i++){
		if (materia == listaOptativas[i].materia) {
			encontrado = true;
			break;
		}
	}
	if (!encontrado){
		listaOptativas.push( { materia : materia, check : false} );
		guardarOptativas(listaOptativas);
		insertarOptativas( [ { materia : materia } ]);
	}
}
function insertarOptativas (materias){
	var tablaOptativas = document.getElementById("tablaOptativas");
	var posicionFila = tablaOptativas.rows.length;

	var checkOptativas = document.createElement("input");
	checkOptativas.type = "checkbox";
	checkOptativas.name = "optativa";
	checkOptativas.title = chrome.i18n.getMessage("enable_disable_optional");

	for (var i = 0; i < materias.length; i++){
		var checkOptativa = checkOptativas.cloneNode(true);
		checkOptativa.addEventListener("change",cambiaEstadoOptativa,true);
		if (materias[i].check){
			checkOptativa.setAttribute("checked","true");
		}

		tablaOptativas.insertRow(posicionFila+i);
		tablaOptativas.rows[posicionFila+i].insertCell(0);
		tablaOptativas.rows[posicionFila+i].insertCell(1);
		tablaOptativas.rows[posicionFila+i].cells[0].innerHTML = materias[i].materia;
		tablaOptativas.rows[posicionFila+i].cells[1].appendChild(checkOptativa);
	}
}
function guardarOptativas (listaOptativas){
	localStorage.optativas = JSON.stringify(listaOptativas);
}
function eliminarOptativa (materia){
	var listaOptativas = JSON.parse(localStorage.optativas);
	for (var i = 0; i < listaOptativas.length; i++){
		if (materia == listaOptativas[i].materia) {
			// log("##1:"+listaOptativas.length);
			listaOptativas.splice(i,1)
			guardarOptativas(listaOptativas);
			// log("##2:"+listaOptativas.length);
			// removerOptativaTabla(materia);
			removerOptativaTabla(i+1);
			break;
		}
	}
}
// function removerOptativaTabla (materia){
function removerOptativaTabla (posicion){
	var tablaOptativas = document.getElementById("tablaOptativas");
	// for (var i = 1; i < tablaOptativas.rows.length; i++) {
	// 	if (materia == tablaOptativas.rows[i].cells[0].innerText){
	// 		tablaOptativas.deleteRow(i);
	// 		break;
	// 	}
	// }
	tablaOptativas.deleteRow(posicion);
}
function exportar (){
	var port = chrome.extension.connect({ name: "msg" });
	port.postMessage({ method : 'limpiar' });
	port.postMessage({ method : 'exportar', datos : localStorage.horarioMaterias });
	port.onMessage.addListener(function (data) {
		if (data.method == 'hecho') {
			var fecha = new Date();
			var nombreArchivo = fecha.getFullYear()+"-"+(fecha.getMonth() < 9 ? "0"+(fecha.getMonth()+1) : fecha.getMonth())+"-"+fecha.getDate()+"["+document.getElementById("totalSeleccion").innerHTML+"]"+".txt";
			// log("nombre "+data.archivo+"\nurl"+data.url);
			var link = document.createElement('a');
			link.setAttribute('href', data.url);
			link.setAttribute('download', nombreArchivo);
			link.setAttribute('id', "respaldo");
			document.body.appendChild(link);

			var clickEvent = document.createEvent("MouseEvent");
			clickEvent.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
			link.dispatchEvent(clickEvent);
			// setTimeout(function () { document.removeChild(link); }, 10);
			setTimeout(eliminaEnlace, 10);
		}
	});	
}
function eliminaEnlace (){
	var enlace = document.getElementById("respaldo");
	enlace.parentNode.removeChild(enlace);
}
function seleccionarContenido (){
	this.select();
}
var infoImportar = "";
var importando = false;
function importar (contenidoImportar){
	if (!importando){
		importando = true;
		if (contenidoImportar != ""){	
			if (contenidoImportar != localStorage.horarioMaterias){
				try {
					borrarMateriasHorario();
					// log("I");
					materiasHorario = JSON.parse(contenidoImportar);
					// log("II");
					guardarMateriasHorario();
					// log("III");
					alert(chrome.i18n.getMessage("reload_page"));
					// location.reload();
					// log("IV");
					document.forms[0].submit();
				} catch (msj){
					alert(chrome.i18n.getMessage("error_imp"));
					// contenidoImportar = localStorage.horarioMaterias;
				}
			} else {
				alert(chrome.i18n.getMessage("same_info"));
			}
		} else {
			alert(chrome.i18n.getMessage("nothing_4_import"));
		}
		setTimeout(reiniciarImportacion,1000);
	}
	infoImportar = "";
}
function reiniciarImportacion (){
	importando = false;
}
function expImp (){
	// document.getElementById("exportar").classList.toggle("oculto");
	// if (document.getElementById("exportar").style.display == ""){
	// 	document.getElementById("exportar").style.display = "none";
	// } else {
	// 	document.getElementById("exportar").style.display = "";
	// 	document.getElementById("exportarSeleccion").focus();
	// }
	if (document.getElementById("exportar").classList.contains("oculto")){
		// document.getElementById("exportar").removeAttribute("class");
		document.getElementById("exportar").classList.remove("oculto");
		// document.getElementById("exportarSeleccion").focus();
	} else {
		document.getElementById("exportar").classList.add("oculto");
	}
}
function generarHorarios (){
	// log("-> Generando horarios....1");
	cargarMateriasHorarioGuardadas();
	if (materiasHorario.materias.length != 0){
		removerResaltado();
		// log("-> Generando horarios....1.1");
		// Agrupar las materias por la secuencia
		var materiasCombinar 	= materiasHorario;
		var grupoMaterias 		= { materias : [] };
		var optativas = { materia : "optativa", grupos : [] };
		var listaOptativas = JSON.parse(localStorage.optativas);
		while (materiasCombinar.materias.length != 0){
			// log("-> Generando horarios....1.1.1");
			var agrupado = false;
			var materiaOrdenar = materiasCombinar.materias.pop();
			if (materiaOrdenar.estado){
				var optativa = false;
				for (var j = 0; j < listaOptativas.length; j++){
					if (materiaOrdenar.materia == listaOptativas[j].materia && listaOptativas[j].check){
						optativas.grupos.push( { materia : materiaOrdenar.materia, grupo : materiaOrdenar.grupo, horas : materiaOrdenar.horas, profe : materiaOrdenar.profe } );
						optativa = true;
						break;
					}
				}
				if (!optativa){
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
		}
		if (optativas.grupos.length > 0){
			grupoMaterias.materias.push(optativas);
		}
		// Se ordenan las materias agrupadas con las secuencias : ascendente
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

		var traslapes = new Array();

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
						var posicionTraslape = gruposOrdenados.materias[i].grupos[n].horas.length;
						for (var k = 0; !encontrado && k < gruposOrdenados.materias[i].grupos[n].horas.length; k++){
							if (buscarArreglo(combinacion.horas,gruposOrdenados.materias[i].grupos[n].horas[k]) != -1){
								// log("traslape 1 "+combinacion.horas+"\n"+gruposOrdenados.materias[i].grupos[n].horas[k]);
								encontrado = true;
								posicionTraslape = k;
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
						} else {

							//Corregir informe de traslape
								//ultima materia de rama viable x materia que tiene conflicto

							var x = 0;
							//buscando al colisionador
							for (; x < traslapes.length; x++){
								// if (traslapes[x].nivel == nivel && traslapes[x].opcion == combinacion.secuencia[nivel]) break;
								if (traslapes[x].nivel == i && traslapes[x].opcion == n) break;
							}
							if (x == traslapes.length){
								// traslapes.push({ nivel : nivel, opcion : combinacion.secuencia[nivel], colision : [] });
								traslapes.push({ nivel : i, opcion : n, colision : [] });
							}
							//localizando al colisionado
							// var nivel = combinacion.secuencia.length-1;
							var nivel;
							encontrado = false;
							while (!encontrado){
								// log("totalSecuencia :"+combinacion.secuencia.length);
								for (var k = 0; !encontrado && k < combinacion.secuencia.length; k++){
									// log(k+"/"+combinacion.secuencia.length);
									// log("traslape 2 \n"+gruposOrdenados.materias[k].grupos[combinacion.secuencia[k]].horas+"\n"+gruposOrdenados.materias[i].grupos[n].horas[posicionTraslape]+"<-");
									if (buscarArreglo(gruposOrdenados.materias[k].grupos[combinacion.secuencia[k]].horas,gruposOrdenados.materias[i].grupos[n].horas[posicionTraslape]) != -1){
										encontrado = true;
										// log("en : 1");
										nivel = k;
									}
								}
								if (!encontrado) {
									log("Inf");
									break;
								}
							}


							//buscando al colisionado
							var k = 0
							for (; k < traslapes[x].colision.length; k++){
								// if (traslapes[x].colision[k].nivel == i && traslapes[x].colision[k].opcion == n) break;
								if (traslapes[x].colision[k].nivel == nivel && traslapes[x].colision[k].opcion == combinacion.secuencia[nivel]) break;
							}
							if (k == traslapes[x].colision.length){
								// traslapes[x].colision.push({ nivel : i, opcion : n, repeticiones : 1 });
								traslapes[x].colision.push({ nivel : nivel, opcion : combinacion.secuencia[nivel], repeticiones : 1 });
							} else {
								traslapes[x].colision[k].repeticiones++;
							}
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
		informeTraslapes(traslapes, gruposOrdenados);
		horariosPosiblesAnteriores = null;
	}
	// log("-> Generando horarios....2");
}
function cargarTraslapes (){
	if (localStorage.traslapes != null && localStorage.traslapes != "" && localStorage.armadoOrdenado != null && localStorage.armadoOrdenado != ""){
		informeTraslapes(JSON.parse(localStorage.traslapes),JSON.parse(localStorage.armadoOrdenado));
	}
}
function informeTraslapes (infoTraslapes, gruposOrdenados){
	if (infoTraslapes.length > 0){
		//Guardando los traslapes
		localStorage.traslapes = JSON.stringify(infoTraslapes);

		//Organizando la información de los traslapes
		/*
		var materias;
		if (localStorage.materiasTraslapes != null && localStorage.materiasTraslapes != ""){
			materias = JSON.parse(localStorage.materiasTraslapes);
		} else {
			materias = agrupaMaterias(infoTraslapes);
			materias = nombreMaterias(materias,gruposOrdenados);
			materias = ordenaSecuenciaMaterias(materias);
			materias = agregaIdMaterias(materias);
			localStorage.materiasTraslapes = JSON.stringify(materias);
		}
		*/
		var materias = agrupaMaterias(infoTraslapes);
		materias = nombreMaterias(materias,gruposOrdenados);
		materias = ordenaSecuenciaMaterias(materias);
		materias = agregaIdMaterias(materias);
		localStorage.materiasTraslapes = JSON.stringify(materias);

		//Generando la tabla de identificadores
		var tituloTraslapes = document.createElement("h3");
		tituloTraslapes.innerHTML = chrome.i18n.getMessage("title_conflicts");
		tituloTraslapes.setAttribute("class","titulo_tabla");

		var traslapes = document.createElement("table");
		traslapes.setAttribute("class","traslapes");
		traslapes.setAttribute("name","traslapes");
		traslapes.insertRow(0);
		traslapes.rows[0].insertCell(0);
		traslapes.rows[0].insertCell(1);
		traslapes.rows[0].insertCell(2);
		traslapes.rows[0].cells[0].innerHTML = chrome.i18n.getMessage("group");
		traslapes.rows[0].cells[1].innerHTML = chrome.i18n.getMessage("subject");
		traslapes.rows[0].cells[2].innerHTML = chrome.i18n.getMessage("id_subject");
		traslapes.rows[0].setAttribute("class","titulos");
		var fila = 1;
		var secuencia = "";
		var posicionCambioSecuencia;
		var anchoSecuencia = 1;
		var filaDatos;
		for (var i = 0; i < materias.length; i++, fila++){
			traslapes.insertRow(fila);
			traslapes.rows[fila].insertCell(0);
			traslapes.rows[fila].insertCell(1);
			if (secuencia != materias[i].secuencia){
				posicionCambioSecuencia = fila;
				traslapes.rows[fila].insertCell(2);
				secuencia = materias[i].secuencia;
				traslapes.rows[fila].cells[0].innerHTML = secuencia;
				filaDatos = 1;
				anchoSecuencia = 1;
			} else {
				anchoSecuencia++;
				traslapes.rows[posicionCambioSecuencia].cells[0].setAttribute("rowspan",anchoSecuencia);
				filaDatos = 0;	
			}
			traslapes.rows[fila].cells[filaDatos].innerHTML = materias[i].materia;
			traslapes.rows[fila].cells[filaDatos+1].innerHTML = materias[i].id;
		}
		var detalles = document.getElementById("detalleTraslapes");
		detalles.innerHTML = 	"<div class='tabla'>"+
									"<div class='celda'>"+
										"<h3 class='titulo_tabla'>"+chrome.i18n.getMessage("title_conflicts")+"</h3>"+
									"</div>"+
									"<div class='celda'>"+
										"<h3 class='titulo_tabla'>"+chrome.i18n.getMessage("title_detail_conflicts")+"</h3>"+
									"</div>"+
								"</div>"+
								"<br/>";
		detalles.children[0].children[0].appendChild(traslapes);
		detalles.children[0].children[0].appendChild(traslapes);

		//Generando tabla de resultados
		traslapes = document.createElement("table");
		traslapes.setAttribute("name","traslapes");
		traslapes.insertRow(0);
		traslapes.rows[0].insertCell(0);
		traslapes.rows[0].insertCell(1);
		traslapes.rows[0].insertCell(2);
		traslapes.rows[0].cells[0].innerHTML = chrome.i18n.getMessage("id_subject");
		traslapes.rows[0].cells[1].innerHTML = chrome.i18n.getMessage("overlap_porcent");
		traslapes.rows[0].cells[2].innerHTML = chrome.i18n.getMessage("overlapping_elements");


		var totalResultados = 1;
		for (var i = 0; i < gruposOrdenados.materias.length; i++){
			totalResultados *= gruposOrdenados.materias[i].grupos.length;
		}
		
		for (var i = 0; i < infoTraslapes.length; i++){
			traslapes.insertRow(i+1);
			traslapes.rows[i+1].insertCell(0);
			traslapes.rows[i+1].insertCell(1);
			traslapes.rows[i+1].insertCell(2);
			// id = buscaIdentificador(infoTraslapes[i],materias);
			// porcentaje = calculaImpacto(infoTraslapes[i],gruposOrdenados);
			// conflictos = listaConflictos(infoTraslapes[i],materias);
			traslapes.rows[i+1].cells[0].innerHTML = "<a href='#' name='traslape' title='"+chrome.i18n.getMessage("show_conflict")+"' class='tooltip' style='color : #F5E638;'>"+buscaIdentificador(infoTraslapes[i],materias)+"</a>";
			traslapes.rows[i+1].cells[1].innerHTML = calculaImpacto(infoTraslapes[i],gruposOrdenados.materias,totalResultados);
			traslapes.rows[i+1].cells[2].innerHTML = listaConflictos(infoTraslapes[i],materias);
		}
		detalles.children[0].children[1].appendChild(traslapes);
		
		var regresar = document.createElement("input");
		regresar.type = "button";
		regresar.value = chrome.i18n.getMessage("return");
		regresar.addEventListener("click",mostrarDetalleTraslapes,true);
		detalles.appendChild(regresar);

		var botonDetalles = document.createElement("input");
		botonDetalles.type = "button";
		botonDetalles.value = chrome.i18n.getMessage("details");
		botonDetalles.addEventListener("click",mostrarDetalleTraslapes,true);

		//Colocando el botón en los controles, si es que hay resultados
		var informacionHorarios = document.getElementById("informacionHorarios");
		if (informacionHorarios.innerText != chrome.i18n.getMessage("no_results")){
			// log("##"+informacionHorarios.innerHTML);
			informacionHorarios = informacionHorarios.children[0].rows[0].cells[2];
		}
		informacionHorarios.appendChild(botonDetalles);
		verTraslapes();
	} else {
		localStorage.traslapes = "";
	}
}
function verTraslapes (){
	var materiasTraslapes = document.getElementsByName("traslape");
	for (var i = 0; i < materiasTraslapes.length; i++){
		materiasTraslapes[i].addEventListener("click",marcaTraslapes,true);
	}
}
function marcaTraslapes (){
	removerMarcaResaltado();
	// log("1");
	mostrarDetalleTraslapes(this);
	// log("2");
	var materias  = JSON.parse(localStorage.materiasTraslapes);
	var traslapes = JSON.parse(localStorage.traslapes);
	var detalle;
	// log("3\n"+this.innerText);
	for (var i = 0; i < materias.length; i++){
		if (this.innerText == materias[i].id) {
			// log("3.5\n"+JSON.stringify(materias[i]));
			detalle = materias[i];
			break;
		}
	}
	for (var i = 0; i < traslapes.length; i++){
		if (detalle.nivel == traslapes[i].nivel && detalle.opcion == traslapes[i].opcion) {
			// log("3.8\n"+JSON.stringify(traslapes[i]));
			detalle = traslapes[i];
			break;
		}
	}
	// log("4\n"+JSON.stringify(detalle));
	detalle = datosTraslape(detalle, materias);
	// log("5\n"+JSON.stringify(detalle));

	//Quitando el estilo a los registros ya resaltados
	removerResaltado();
	// log("6");

	//Agregando el estilo para resaltar
	registros = document.querySelectorAll('div[name="contenedorRegistro"]');
	for (i = 0; i < detalle.length; i++){
		for (j = 0; j < registros.length; j++){
			// log("6.1\n"+detalle[i].secuencia+" | "+registros[j].children[0].rows[0].cells[0].innerHTML+"\n"+detalle[i].materia+" | "+registros[j].children[0].rows[0].cells[1].innerHTML);
			if (detalle[i].secuencia == registros[j].children[0].rows[0].cells[0].innerHTML && detalle[i].materia == registros[j].children[0].rows[0].cells[1].innerHTML){
				// log("6.5");
				registros[j].classList.add("resaltar");
				registros[j].children[0].rows[0].cells[2].innerHTML = "<span class='resaltar'></span>"+registros[j].children[0].rows[0].cells[2].innerHTML;
				break;
			}
		}
	}
	// log("7");
}
function removerMarcaResaltado (){
	var posicionesFilasMarcas = new Array();
	var registros = document.querySelectorAll('span.resaltar');
	for (var i = 0; i < registros.length; i++){
		registros[i].parentNode.removeChild(registros[i]);
		// posicionesFilasMarcas.push(registros[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.rowIndex);
	}
	// registros = document.getElementById("tablaAsignaturas");
	// for (i = 0; i < posicionesFilasMarcas.length; i++){
	// 	registros.rows[posicionesFilasMarcas[i]].cells[0].children[0].children[0].rows[0].cells[2].removeChild()
	// }
}
function removerResaltado (){
	// log("removerResaltado\t\t1");
	var registros = document.querySelectorAll('div.resaltar');
	for (var i = 0; i < registros.length; i++){
		registros[i].classList.remove("resaltar");
	}
	// log("removerResaltado\t\t2");
}
function datosTraslape (detalle, materias){
	// var temp = recuperaDatos(detalle, materias);
	// detalle.secuencia = temp.secuencia;
	// detalle.materia = temp.materia;
	// for (var i = 0; i < detalle.colision.length; i++){
	// 	detalle.colision[i] = recuperaDatos(detalle.colision[i], materias);
	// }
	// return detalle;
	// log("4.1");
	//Coloca las materias en un mismo nivel
	var materiasTraslapes = new Array();
	for (var i = 0; i < detalle.colision.length; i++){
		materiasTraslapes.push(detalle.colision[i]);
	}
	detalle.colision = new Array();
	materiasTraslapes.push(detalle);

	// log("4.2\n"+JSON.stringify(materiasTraslapes));
	//Trae los datos de secuencia, materia y letra
	for (var i = 0; i < materiasTraslapes.length; i++){
		materiasTraslapes[i] = recuperaDatos(materiasTraslapes[i], materias);
	}
	// log("4.3\n"+JSON.stringify(materiasTraslapes));
	return materiasTraslapes;
}
function recuperaDatos (detalle, materias){
	for (var i = 0; i < materias.length; i++){
		if (detalle.nivel == materias[i].nivel && detalle.opcion == materias[i].opcion){
			detalle.secuencia = materias[i].secuencia;
			detalle.materia = materias[i].materia;
			detalle.id = materias[i].id;
			break;
		}
	}
	return detalle;
}
function calculaImpacto (materia, gruposOrdenados, totalResultados){
	var gradoImpacto = 1;
	for (var i = materia.nivel+1; i < gruposOrdenados.length; i++){
		gradoImpacto *= gruposOrdenados[i].grupos.length;
	}
	var totalRepeticiones = 0;
	for (var i = 0; i < materia.colision.length; i++){
		totalRepeticiones += materia.colision[i].repeticiones;
	}
	gradoImpacto *= totalRepeticiones * 100;
	// log("##########"+gradoImpacto+"*"+totalRepeticiones+"/"+totalResultados);
	gradoImpacto /= totalResultados;
	return gradoImpacto.toFixed(1);
}
function listaConflictos (materia, materiasNombradas){
	var conflictos = new Array();
	for (var i = 0; i < materia.colision.length; i++){
		conflictos.push(buscaIdentificador(materia.colision[i],materiasNombradas));
	}
	return conflictos.join(",");
}
function buscaIdentificador (materia, materiasNombradas){
	var id;
	for (var i = 0; i < materiasNombradas.length; i++){
		if (materia.nivel == materiasNombradas[i].nivel && materia.opcion == materiasNombradas[i].opcion){
			id = materiasNombradas[i].id;
			break;
		}
	}
	return id;
}
function agregaIdMaterias (materias){
	var letra = 65;
	for (var i = 0; i < materias.length; i++, letra++){
		materias[i].id = String.fromCharCode(letra);
	}
	return materias;
}
function mostrarDetalleTraslapes (){
	switch (this.value){
		case chrome.i18n.getMessage("details"):
			document.getElementById("detalleTraslapes").removeAttribute("class");
			document.getElementById("asignaturasSeleccionadas").classList.add("oculto");
			document.getElementById("controlesHorarios").classList.add("oculto");
			document.getElementById("informacionHorarios").classList.add("oculto");
			document.getElementById("resultadoHorarios").classList.add("oculto");
			break;
		case chrome.i18n.getMessage("return"):
		default:
			document.getElementById("detalleTraslapes").classList.add("oculto");
			mostrarSeleccionMaterias();
			document.getElementById("informacionHorarios").removeAttribute("class");
			var seleccionHorarios = document.getElementById("seleccionHorarios");
			if (seleccionHorarios != null){
				seleccionHorarios.value = 0;
			}
			break;
	}
}
function ordenaSecuenciaMaterias (materias){
	var ordenado = new Array()
	if (materias.length > 1){
		var i, j, almacenado;
		for (i = 0; i < materias.length; i++){
			almacenado = false;
			for (j = 0; !almacenado && j < ordenado.length; j++){
				if (materias[i].secuencia < ordenado[j].secuencia){
					var temp, temp2;
					if (j != 0 && j != ordenado.length-1){
						// log("A"+j);
						temp = ordenado.slice(0,j);
						temp2 = ordenado.slice(j);
						temp.push(materias[i]);
						// log("#########\n["+ordenado.length+"]\n"+JSON.stringify(ordenado));
						ordenado = temp.concat(temp2);
						// ordenado = temp.slice(0);
						// ordenado = temp;
						// ordenado.push(materias[i]);
						almacenado = true;
						break;
					}
					if (j == 0){
						// log("B");
						ordenado.unshift(materias[i]);
						almacenado = true;
					}
					if (j == ordenado.length-1){
						// log("C");
						temp = ordenado.pop();
						ordenado.push(materias[i],temp);
						almacenado = true;
					}
					break;
				}
			}
			if (!almacenado){
				// log("D");
				ordenado.push(materias[i]);
			}
		}
	} else ordenado = materias;
	// log("["+ordenado.length+"]\n"+JSON.stringify(ordenado));
	return ordenado;
}
function nombreMaterias (materias, gruposOrdenados){
	try {
		for (var i = 0; i < materias.length; i++){
			materias[i].secuencia = gruposOrdenados.materias[materias[i].nivel].grupos[materias[i].opcion].grupo;
			if (gruposOrdenados.materias[materias[i].nivel].materia != "optativa"){
				materias[i].materia = gruposOrdenados.materias[materias[i].nivel].materia;
			} else {
				materias[i].materia = gruposOrdenados.materias[materias[i].nivel].grupos[materias[i].opcion].materia;
			}
		}
	} catch (error){
		log("Problema presentacion de resultados");
	}
	return materias;
}
function agrupaMaterias (traslapes){
	var materias = new Array();
	var i, j, k, encontrado, materia;
	for (i = 0, k = -1; i < traslapes.length;){
		if (k < 0) {
			materia = { nivel : traslapes[i].nivel, opcion : traslapes[i].opcion };
			k++;
		} else {
			if (k < traslapes[i].colision.length){
				materia = { nivel : traslapes[i].colision[k].nivel, opcion : traslapes[i].colision[k].opcion };
				k++;
			} else {
				i++;
				k = -1;
			}
		}
		encontrado = false;
		for (j = 0; !encontrado && j < materias.length; j++){
			if (materias[j].nivel == materia.nivel && materias[j].opcion == materia.opcion){
				encontrado = true;
			}
		}
		if (!encontrado){
			materias.push({ nivel : materia.nivel, opcion : materia.opcion });
		}
	}
	return materias;
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
		var numeroResultado = parseInt(this.value);
		if (numeroResultado  >= 0  && numeroResultado <= document.getElementById("seleccionHorarios").getAttribute("max")){
			switch (numeroResultado){
				case 0:
					mostrarSeleccionMaterias();
					break;
				default:
					mostrarHorarioGenerado(numeroResultado);
					break;
			}
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
	seleccionHorarios.innerHTML = 	"<tr>"+
										"<td>"+chrome.i18n.getMessage("results_1")+nResultados+chrome.i18n.getMessage("results_2")+":</td>"+
										"<td>"+
											"<input id='seleccionHorarios' type='number' min='0' max='"+nResultados+"' value='0' size='4' title='"+chrome.i18n.getMessage("show_result")+"'/>"+
										"</td>"+
										"<td>"+chrome.i18n.getMessage("results_3")+"</td>"+
									"</tr>";
	seleccionHorarios.setAttribute("style","margin:0px auto;");
	informacion.innerHTML = "";
	informacion.appendChild(seleccionHorarios);
	horarioSeleccionado = 0;
	seleccionHorarios 	= document.getElementById("seleccionHorarios");
	seleccionHorarios.setAttribute("style","text-align:center;");
	seleccionHorarios.addEventListener("keyup",seleccionarHorario,true);
	seleccionHorarios.addEventListener("change",seleccionarHorario,true);

	// var seleccionMaterias 	= document.createElement("input");
	// seleccionMaterias.type 	= "button";
	// seleccionMaterias.value = "Inicio";
	// seleccionMaterias.addEventListener("click",mostrarSeleccionMaterias,true);
	// informacion.appendChild(seleccionMaterias);
	
	var tablaInformacion = document.createElement("table");
	tablaInformacion.classList.add("oculto");
	// tablaInformacion.style.display 	= "none";
	// tablaInformacion.style.width 	= "100%";
	tablaInformacion.innerHTML = "<tr style='background-color:#FF9900; color:white;'><td>"+chrome.i18n.getMessage("group")+"</td> <td>"+chrome.i18n.getMessage("subject")+"</td> <td>"+chrome.i18n.getMessage("teacher")+"</td> <td>"+chrome.i18n.getMessage("monday")+"</td> <td>"+chrome.i18n.getMessage("tuesday")+"</td> <td>"+chrome.i18n.getMessage("wednesday")+"</td> <td>"+chrome.i18n.getMessage("thursday")+"</td> <td>"+chrome.i18n.getMessage("friday")+"</td> <td>"+chrome.i18n.getMessage("saturday")+"</td> </tr>";

	for (var i = 0; i < horariosPosiblesAnteriores.combinacion[0].secuencia.length; i++){
		tablaInformacion.insertRow(i+1);
		for (var k = 0; k < 9; k++) tablaInformacion.rows[i+1].insertCell(k);
		// tablaInformacion.rows[i+1].cells[1].innerHTML = gruposOrdenados.materias[i].materia;
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
			if (gruposOrdenados.materias[i].materia == "optativa"){
				tablaInformacionN.rows[i+1].cells[1].innerHTML = gruposOrdenados.materias[i].grupos[horariosPosiblesAnteriores.combinacion[n].secuencia[i]].materia;
			} else {
				tablaInformacionN.rows[i+1].cells[1].innerHTML = gruposOrdenados.materias[i].materia;
			}
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
			// log("##\n"+JSON.stringify(materiasHorario));
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
	// document.getElementById("asignaturasSeleccionadas").style.display = "";
	document.getElementById("asignaturasSeleccionadas").removeAttribute("class");
	// document.getElementById("controlesHorarios").style.display = "";
	document.getElementById("controlesHorarios").removeAttribute("class");
	// document.getElementById("resultadoHorarios").style.display = "none";
	document.getElementById("resultadoHorarios").classList.add("oculto");
}
function ocultarHorariosGenerados (){
	var horariosGenerados = document.getElementsByName("horariosGenerados");
	// for (var i = 0; i < horariosGenerados.length; i++) horariosGenerados[i].style.display = "none";
	for (var i = 0; i < horariosGenerados.length; i++) horariosGenerados[i].classList.add("oculto");
}
function mostrarHorarioGenerado(numero){
	if (numero <= totalHorarios){
		ocultarHorariosGenerados();
		// document.getElementById("horarioGenerado"+numero).style.display = "";
		document.getElementById("horarioGenerado"+numero).removeAttribute("class");
		// document.getElementById("resultadoHorarios").style.display = "";
		document.getElementById("resultadoHorarios").removeAttribute("class");
		// document.getElementById("asignaturasSeleccionadas").style.display = "none";
		document.getElementById("asignaturasSeleccionadas").classList.add("oculto");
		// document.getElementById("controlesHorarios").style.display = "none";
		document.getElementById("controlesHorarios").classList.add("oculto");
		// document.getElementById("exportar").style.display = "none";
		document.getElementById("exportar").classList.add("oculto");
	}
}
function buscarArregloOrdenadoBinario (arreglo, buscar){
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
function buscarArregloOrdenado (arreglo, buscar, version){
	var posicion = -1;
	var inicio = 0;
	var n;
	var fin = arreglo.length - 1;
 
	while (inicio <= fin) {
		n = (inicio + fin) / 2;
		// console.log(buscar+"/"+arreglo[Math.round(n)]+" : "+Math.round(n));
		if (buscar == arreglo[ version ? Math.round(n) : parseInt(n) ]) {
			posicion = version ? Math.round(n) : parseInt(n);
			break;
		} else {
			if (arreglo[ version ? Math.round(n) : parseInt(n) ] > buscar) {
				fin = n - 1;
			} else {
				inicio = n + 1;
			}
		}
	}
	return posicion;
}
function buscarArreglo (arreglo, buscar){
	var posicion = buscarArregloOrdenadoBinario(arreglo, buscar);
	if (posicion == -1){
		posicion = buscarArregloOrdenado (arreglo, buscar, false);
		if (posicion == -1){
			posicion = buscarArregloOrdenado (arreglo, buscar, true);
		}
	}
	return posicion;
}
function mostrarHorario (){
	// document.getElementById("asignaturas").classList.remove("ocultar");
	//verifica que antes tenga algunos datos para mostrar
	if (atajoHorarios) document.getElementById("asignaturas").removeAttribute("class");
}
function ocultarHorario (){
	document.getElementById("asignaturas").classList.add("ocultar");
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

		var dias = ["&nbsp;","&nbsp;","&nbsp;","&nbsp;","&nbsp;","&nbsp;","&nbsp;"]; //dias de la semana
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
		horasSeguimiento = ordenar(horasSeguimiento);
		var asignaturaH  = { materia : nombre, profe: profesor, grupo : grupo, horas : horasSeguimiento, dias : dias, estado : true };
		materiasHorario.materias.push(asignaturaH);
		
		//insertando en la lista de la selección
		var asignaturasTabla = document.getElementById("tablaAsignaturas");
		asignaturasTabla.insertRow(asignaturasTabla.rows.length);

		var materiaH = asignaturasTabla.rows[asignaturasTabla.rows.length-1];
		var cantidadCeldas = 11;
		
		materiaH.insertCell(0);
		materiaH.cells[0].setAttribute("colspan",cantidadCeldas);

		materiaH.cells[0].innerHTML = "<div name='contenedorRegistro'><table><tr name='registro'></tr></table></div>";
		
		materiaH.cells[0].children[0].addEventListener("dragstart",moviendo,false);
		materiaH.cells[0].children[0].addEventListener("dragenter",sobre,false);
		materiaH.cells[0].children[0].addEventListener("dragover",colocando,false);
		// materiaH.cells[0].children[0].addEventListener("dragleave",saliendo,false);
		materiaH.cells[0].children[0].addEventListener("drop",ingresando,false);
		materiaH.cells[0].children[0].addEventListener("dragend",soltando,false);
		materiaH.cells[0].children[0].setAttribute("draggable",true);
		materiaH.cells[0].children[0].className = "fuera";

		materiaH = materiaH.cells[0].querySelector('tr[name="registro"]');

		for (var j = 0; j < cantidadCeldas; j++) materiaH.insertCell(j);		

		materiaH.cells[0].innerHTML = asignaturaH.grupo;
		materiaH.cells[1].innerHTML = asignaturaH.materia;

		var quitarMateria = document.createElement("img");
		quitarMateria.src = chrome.extension.getURL("/css/menos.png");
		quitarMateria.style.cursor = "pointer";
		quitarMateria.title = chrome.i18n.getMessage("delete_subject");
		quitarMateria.addEventListener("click",removerMateria,true);
		materiaH.cells[cantidadCeldas-2].appendChild(quitarMateria);

		var estadoMateria 	= document.createElement("input");
		estadoMateria.type 	= "checkbox";
		estadoMateria.title = chrome.i18n.getMessage("enable_disable");
		estadoMateria.name 	= "incluirMateria";
		estadoMateria.checked 	= true;
		estadoMateria.addEventListener("change",cambiarEstadoSeleccion,true);
		materiaH.cells[cantidadCeldas-1].appendChild(estadoMateria);

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

		materiaH.cells[cantidadCeldas-3].setAttribute("name","sabado");
		
		//actualizando el contador de la selección
		actualizaTotalSeleccion(1);
		// document.getElementById("totalSeleccion").innerHTML = parseInt(document.getElementById("totalSeleccion").innerHTML)+1;

		//habilitando visualización de la lista de selección
		document.getElementById("asignaturasSeleccionadas").style.display = "";
		atajoHorarios = true;
		//respaldando selección
		guardarMateriasHorario();
		agregarOptativa(nombre);
	} else { //quitar
		eliminaMateriaSeleccion(grupo, nombre, i, 0);
	}
	removerMarcaResaltado();
	if (numeroDias > 5) {
		//verificacion para la visualización de la columna sábado
		verificaSeleccionSabado();
	}
}
function verificaSeleccionSabado (){
	//verificando datos para ocultar
	var ocultarSabado = true;
	// var asignaturasTabla = document.getElementById("tablaAsignaturas");
	var celdasSabado = document.querySelectorAll('#tablaAsignaturas td[name="sabado"]');
	var cantidadRegistros =  celdasSabado.length;
	for (var i = 1; i < cantidadRegistros; i++){
		if (celdasSabado[i].innerHTML != "&nbsp;"){
			ocultarSabado = false;
			break;
		}
	}
	//aplicando el cambio (mostrar, ocultar)
	for (var i = 0; i < celdasSabado.length; i++){
		if (ocultarSabado) celdasSabado[i].classList.add("ocultar");
		else celdasSabado[i].classList.remove("ocultar");
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
	localStorage.horarioMaterias   = "";
	localStorage.armadoOrdenado    = "";
	localStorage.resultados        = "";
	localStorage.traslapes         = "";
	localStorage.materiasTraslapes = "";
	localStorage.optativas         = "";
	mostrarSeleccionMaterias();
	document.getElementById("exportarSeleccion").value       = "";
	document.getElementById("resultadoHorarios").innerHTML   = "";
	document.getElementById("informacionHorarios").innerHTML = "";
	document.getElementById("totalSeleccion").innerHTML      = "0";
	// document.getElementById("exportar").style.display        = "none";
	document.getElementById("exportar").classList.add("oculto");
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
		// document.getElementById("exportarSeleccion").value = localStorage.horarioMaterias;
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

		// eliminaMateriaSeleccion(grupo, materia, this.parentNode.parentNode.rowIndex, 1);
		// log("**"+this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode);
		eliminaMateriaSeleccion(grupo, materia, this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.rowIndex, 1);
	}
}
function eliminaMateriaSeleccion (grupo, materia, posicion, tipoAccion){
	// log("eliminaMateriaSeleccion\n"+grupo+", "+materia+", "+posicion+", "+tipoAccion);
	var tablaSeleccion = document.getElementById("tablaAsignaturas");
	var registros = document.getElementById("regs");
	// var i = posicion;
	var i;
	var posicionCheck = sabadoActivo ? 11 : 10;
	switch (tipoAccion){
		case 0: //registros
			//deseleccionando las materias del mismo grupo en los registros
			// for (; i < registros.rows.length && grupo == registros.rows[i].cells[0].innerHTML; i++){
			//comprobar si funciona para elementos separados
			for (i = 0; i < registros.rows.length; i++){
				// log("----"+materia+" | "+registros.rows[i].cells[1].innerText);
				if (grupo == registros.rows[i].cells[0].innerHTML && materia == registros.rows[i].cells[1].innerText){
					registros.rows[i].cells[posicionCheck].firstChild.checked = false;
				}
			}
			//quitando de la lista de la selección
			var materiasSeleccion = document.querySelectorAll('div[name="contenedorRegistro"]');
			for (i = 0; i < materiasSeleccion.length; i++){
				if (materiasSeleccion[i].children[0].rows[0].cells[0].innerHTML == grupo && materiasSeleccion[i].children[0].rows[0].cells[1].innerHTML == materia){
					// materiasSeleccion.deleteRow(i);
					tablaSeleccion.deleteRow(materiasSeleccion[i].parentNode.parentNode.rowIndex);
					break;
				}
			}
			break;
		case 1: //seleccion
			//quitando de la lista de la selección
			tablaSeleccion.deleteRow(posicion);
			
			//deseleccionando las materias del mismo grupo en los registros
			// for (var i = 1; i < registros.rows.length; i++){
			for (i = 1; i < registros.rows.length; i++){
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
	eliminarOptativa(materia);
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
function actualizaMaterias (){
	var materiasOrdenadas =  new Array();
	var materiasSeleccion = document.querySelectorAll('div[name="contenedorRegistro"]');
	var i,j;
	for (i = 0; i < materiasSeleccion.length; i++){
		for (j = 0; j < materiasHorario.materias.length; j++){
			if (materiasSeleccion[i].children[0].rows[0].cells[0].innerHTML == materiasHorario.materias[j].grupo && materiasSeleccion[i].children[0].rows[0].cells[1].innerHTML == materiasHorario.materias[j].materia){
				materiasOrdenadas.push(materiasHorario.materias[j]);
				break;
			}
		}
	}
	materiasHorario.materias = materiasOrdenadas;
	guardarMateriasHorario();
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
		var posicionCheck  = sabadoActivo ? 11 : 10;

		var quitarMaterias   = document.createElement("img");
		quitarMaterias.src   = chrome.extension.getURL("/css/menos.png");
		quitarMaterias.title = chrome.i18n.getMessage("delete_subject");
		quitarMaterias.style.cursor = "pointer";
		// quitarMaterias.setAttribute("class","tooltip");
		
		var estadoMaterias   = document.createElement("input");
		estadoMaterias.type  = "checkbox";
		estadoMaterias.title = chrome.i18n.getMessage("enable_disable");
		estadoMaterias.name  = "incluirMateria";
		// estadoMaterias.setAttribute("class","tooltip");
		
		var materiaSinEstado = false;
		var posicionFila;

		for (i = 0; i < materiasHorario.materias.length; i++){
			posicionFila = asignaturasTabla.rows.length;
			asignaturasTabla.insertRow(posicionFila);
			materiaH = asignaturasTabla.rows[posicionFila];
			materiaH.insertCell(0);
			materiaH.cells[0].setAttribute("colspan",cantidadCeldas);

			materiaH.cells[0].innerHTML = "<div name='contenedorRegistro'><table><tr name='registro'></tr></table></div>";
			materiaH = materiaH.cells[0].querySelector('tr[name="registro"]');

			for (var j = 0; j < cantidadCeldas; j++) materiaH.insertCell(j);

			materiaH.cells[0].innerHTML = materiasHorario.materias[i].grupo;
			materiaH.cells[1].innerHTML = materiasHorario.materias[i].materia;

			if (destinoConexion != ""){
				materiaH.cells[2].innerHTML = "<a href='#' name='diccionario' style='color:#F90;' title='"+chrome.i18n.getMessage("comments")+"' class='tooltip'>"+materiasHorario.materias[i].profe+"</a>";
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
			// log("**"+materiaH.cells.length+"-"+materiasHorario.materias.length+"-"+JSON.stringify(materiasHorario.materias[i]));
			for (var j = 0; j < numeroDias; j++) materiaH.cells[3+j].innerHTML = materiasHorario.materias[i].dias[j];
			materiaH.cells[cantidadCeldas-3].setAttribute("name","sabado");
			
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
		seccionAtajos.innerHTML = "<table style='width:100%; border-collapse: collapse;'></table>";
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
	if (location.pathname != "/Default.aspx" && location.pathname != "/default.aspx"){
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