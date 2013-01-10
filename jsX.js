function log(mensaje){
	console.log (mensaje);
}
var indiceTabulador;
function ajustarDisenio(){
	document.getElementById("ctl00_subMenu").style.width="auto";
	var disenio = document.createElement("style");
	disenio.setAttribute("type","text/css");
	disenio.innerHTML 	= "#subnav .item {	padding : 0px 7px;	border: none; display:inline-block;width:150px;}";
	var elementosMenu 	= document.getElementsByClassName("item ctl00_subMenu_4");
	for (var i=0;i<elementosMenu.length;i++){
		if (elementosMenu[i].children.length==2){
			elementosMenu[i].children[1].style.paddingLeft="20px";
		}
	}
	var espaciosImagenes=document.getElementById("ctl00_subMenu").getElementsByTagName("br");
	while(espaciosImagenes.length!=0){
		espaciosImagenes[0].parentNode.removeChild(espaciosImagenes[0]);
	}
	
	var espaciosImagenes=document.getElementById("ctl00_subMenu").getElementsByTagName("img");
	while(espaciosImagenes.length!=0){
		espaciosImagenes[0].parentNode.removeChild(espaciosImagenes[0]);
	}


	document.getElementById("subnav").insertBefore(disenio, document.getElementById("ctl00_subMenu").nextSibling);
	var links = document.getElementsByTagName("a");
	var tabAsignado;
	for (var i=0;i<links.length;i++){
		if (links[i].getAttribute("href")!=null&&links[i].getAttribute("href").length>0){
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
			switch(links[i].getAttribute("href")){
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
					links[i].setAttribute("href","http://www.contenido.ccs.ipn.mx/G-866-2011-E.pdf");
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
}
function pedir(){
	var opcion=prompt("Modo random (1), todo bien (2), medio bien(3), medio mal(4), todo mal (5)","");
	switch(opcion){
		case "1": 	califica(5,1,2,1);
			break;
		case "2": 	califica(5,5,2,2);
			break;
		case "3": 	califica(5,3,2,1);
			break;
		case "4": 	califica(3,1,2,1);
			break;
		case "5": 	califica(1,1,1,1);
			break;
	}
}
function califica(maximo, minimo, recomendar1, recomendar2){
	var combos = document.getElementsByTagName("select");
	for (var i=0;(i<combos.length)&&(i<19);i++){
		combos[i].value=Math.floor(Math.random() * (maximo-minimo+1)) + minimo;
	}
	combos[i].value=Math.floor(Math.random() * (recomendar1-recomendar2+1)) + recomendar2;
}
function ajustaPeriodos(){
	var numeroPeriodos = document.getElementById("ctl00_mainCopy_Lbl_Kardex").getElementsByTagName("table").length;
	if (numeroPeriodos>0){
		for (var i=0;i<numeroPeriodos;i++){
			var periodos = document.getElementById("ctl00_mainCopy_Lbl_Kardex").getElementsByTagName("table");
			var periodosAnidados = periodos[i].getElementsByTagName("table");
			var celda;
			for (;periodosAnidados.length>0;){
				if (periodosAnidados[0].parentNode.tagName=="CENTER"&&periodosAnidados[0].parentNode.children.length==2){
					celda = periodosAnidados[0].parentNode.parentNode;
					var acomodar = periodosAnidados[0].parentNode.cloneNode(true);
					periodosAnidados[0].parentNode.parentNode.removeChild(periodosAnidados[0].parentNode);
				}else{
					celda = periodosAnidados[0].parentNode;
					var periodo 	= periodosAnidados[0].cloneNode(true);
					var acomodar 	= document.createElement("center");
					var espacio 	= document.createElement("br");
					acomodar.appendChild(periodo);
					acomodar.appendChild(espacio);
					periodosAnidados[0].parentNode.removeChild(periodosAnidados[0]);
				}
				document.getElementById("ctl00_mainCopy_Lbl_Kardex").appendChild(acomodar);	
			}
			while(celda.getElementsByTagName("br").length>0){
				celda.getElementsByTagName("br")[0].parentNode.removeChild(celda.getElementsByTagName("br")[0]);
			}
			if (periodos[i].parentNode.tagName=="CENTER"&&periodos[i].parentNode.children.length<2){
				var espacio = document.createElement("br");
				periodos[i].parentNode.appendChild(espacio);
			}
		}
	}
}
//##############<-buscador
function modificaciones(){
	if (this.value.length<1){
    	verTodo();
	}
}
var estadoSeleccion = true;
function seleccion(){
	if (estadoSeleccion){
		if (this.firstChild.localName!=null){
			buscador.value=this.firstChild.innerHTML;	
		}else {
		  	buscador.value=this.innerHTML;
		  	//alert(this.parentNode.numero);
		}	
		buscarTexto(this.innerHTML,this.cellIndex);
	}
}
function enumerarRegistros(datos,inicio){
  	var visibles = new Array();
	var numero=inicio;
	for (var i=inicio;i<=datos.length-1;i++,numero++){
		datos[i].setAttribute("class","visible");
		datos[i].numero=numero;
		visibles.push(numero);
		for (var j=0;j<totalColumnas;j++){
      		datos[i].cells[j].addEventListener("click",seleccion,false);
		}
	}
  	document.body.datosVisibles.push(visibles);
  	contar();
}
function verOcultar(datos,inicio,opc){
	var tipo="oculto";
	if (opc!=0){
		tipo="visible";
	}	
	var numeroRegistros=datos.length;
	for (var i=inicio;i<numeroRegistros;i++){
		datos[i].setAttribute("class",tipo);
	}
	contar();
}
function contar(){
	document.getElementById("contador").innerHTML=document.body.datosVisibles[document.body.datosVisibles.length-1].length+" de "+totalRegistros;
}	
function verTodo(){
	buscador.value="";
  	verOcultar(document.getElementById("regs").rows,1,1);//ver
  	//document.body.datosVisibles = new Array();
  	while(document.body.datosVisibles.length>1)document.body.datosVisibles.pop();
  	//document.body.datosOcultos = new Array();
  	contar();
  	ultimaBusqueda="";
}
function buscarDentro(palabra, fragmento){
  	var encontrado=false;
  	if (palabra.length>=fragmento.length){
    	var i=palabra.indexOf(fragmento.charAt(0));
    	var limite=palabra.lastIndexOf(fragmento.charAt(fragmento.length-1));
    	if (i!=-1&&limite!=-1){
      		if (fragmento.length<2){
        		encontrado=true;
          	}else{
            	while(i<limite){
	              	if ((i+fragmento.length-1)<palabra.length){
	                	if (palabra.charAt(i+fragmento.length-1)==fragmento.charAt(fragmento.length-1)){
	                  		if (palabra.substring(i,i+fragmento.length)==fragmento){
	                    		encontrado=true;
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
function buscarTexto(textoBuscado,columna){
	var limite 		= totalColumnas;
	var inicio 		= 0; //columnas j->limite
	var ocultos 	= new Array();
	var visibles 	= new Array();
	var encontrado;
	if (columna!=0){
		limite=columna+1;
		inicio=columna;
   	}
   	var registrosVisibles=document.body.datosVisibles[document.body.datosVisibles.length-1];
	var registros=document.getElementById("regs").rows;
	//alert("l "+visibles.length);
	for (var i=0;i<registrosVisibles.length;i++){
		encontrado=false;
		for (var j=columna;j<limite;j++){
          	if (buscarDentro(registros[registrosVisibles[i]].cells[j].innerHTML.toUpperCase(),textoBuscado.toUpperCase())){
            	//registros[registrosVisibles[i]].cells[j].style.backgroundColor="blue";
            	encontrado=true;
            	j=limite;	
            	visibles.push(registros[registrosVisibles[i]].numero);
          	}
        }
        if (!encontrado)ocultos.push(registros[registrosVisibles[i]].numero);
    }
    for (var j=0;j<ocultos.length;j++){
    	registros[ocultos[j]].setAttribute("class","oculto");
    }
    document.body.datosVisibles.push(visibles);
    //document.body.datosOcultos.push(ocultos);
    contar();
}	
function buscar(lanzador){
	var evento = lanzador || window.event;
	var codigoTecla = evento.charCode || evento.keyCode;
	var textoBuscado = document.getElementById("buscar").value;
	switch(codigoTecla){
		case 8:	/*del*/		case 46: //supr
			ultimaBusqueda=textoBuscado;
			if (textoBuscado.length>0){
	            var registros = document.getElementById("regs").rows;
	            document.body.datosVisibles.pop();
	            var visibles = document.body.datosVisibles[document.body.datosVisibles.length-1];
	            for (var i=0;i<visibles.length;i++){
	             	registros[visibles[i]].setAttribute("class","visible");
	            }
	            contar();
				//buscarTexto(textoBuscado, 	.columna);
				//alert("buscar");//buscarTexto
			} else verTodo();
			break;
		case 13: //enter
			if (textoBuscado.length>0){
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
			if (ultimaBusqueda!=textoBuscado){
				ultimaBusqueda=textoBuscado;
				if (textoBuscado.length>0){
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
function inicializar(){
	buscador=document.getElementById("buscar");
	buscador.columna=0;
	buscador.addEventListener("keyup",buscar,true);
  	document.getElementById("ver").addEventListener("click",verTodo,true);
	buscador.addEventListener("click",modificaciones,true);
	inicializaDatos();
}
function inicializaDatos(){
	document.body.datosVisibles = new Array();
  	//document.body.datosOcultos = new Array();
  	var registros  	= document.getElementById("regs").rows;
  	totalRegistros 	= (registros.length-1);
  	totalColumnas 	= registros[0].cells.length;
  	enumerarRegistros(registros,1);
  	contador = document.getElementById("contador");
  	buscador.focus();
}
function agregaBuscador(opc){
	var controlesBuscador = document.createElement("div");
	controlesBuscador.innerHTML = '<input type="search" placeholder="Buscar..." id="buscar"/><input type="button" id="ver" value="Ver todo"><span id="contador"></span>';
	var tipo;
	switch(opc){
		case 1: //ocupabilidad
			tipo = "ctl00_mainCopy_GrvOcupabilidad";
			var boton = document.createElement("input");
			boton.setAttribute("type","button");
			boton.setAttribute("value","Recargar");
			boton.addEventListener("click",actualizaOcupabilidad,true);
			controlesBuscador.appendChild(boton);
			break;
		case 2: //horarios
			tipo = "ctl00_mainCopy_dbgHorarios";
			break;
	}
	document.getElementById(tipo).parentNode.insertBefore(controlesBuscador, document.getElementById(tipo));
	document.getElementById(tipo).setAttribute("id","regs");
	inicializar();
}
//##############<-buscador
function actualizaOcupabilidad(){
	alert("Inhabilitado por el momento.");
	// valida(2);
}
var READY_STATE_COMPLETE=4;
var peticion_http = null;
function inicializa_xhr() {
	if (window.XMLHttpRequest) {
		return new XMLHttpRequest();
	}
	else if (window.ActiveXObject) {
		return new ActiveXObject("Microsoft.XMLHTTP");
	}
}
function valida(opc) {
	peticion_http = inicializa_xhr();
	if (peticion_http) {
		localStorage['tipoConsulta']=opc;
		switch(opc){
			case 1: //actualizacion
				peticion_http.onreadystatechange = procesaRespuesta;
				peticion_http.open("GET", chrome.i18n.getMessage("update"), true);
				peticion_http.send("");
				break;
			case 2:
				//javascript:alert(document.aspnetForm.elements.length);
				var elementos 		= document.forms[0].elements;
				var parametros 		= "";
				var parametros2 	= "";
				var agregar 		= "";
				var ultimo 			="";
				// var parm = "";
				for (var i=0;i<elementos.length;i++){
					if (elementos[i].getAttribute("name")!=null&&elementos[i].getAttribute("name")!=ultimo){
						// parm+=elementos[i].getAttribute("name")+"\t("+elementos[i].value.length+")\n";
						switch(elementos[i].getAttribute("name")){
							case "__EVENTTARGET":
							case "__EVENTARGUMENT":
							case "__LASTFOCUS":
							case "__VIEWSTATE":
							case "__VIEWSTATEENCRYPTED":
							case "__EVENTVALIDATION":
							case "ctl00$mainCopy$rblEsquema":
							case "ctl00$mainCopy$dpdPeriodoEscolarHist":
							// case "ctl00$mainCopy$Chkespecialidad":
							// case "ctl00$mainCopy$ChkSemestre":
							// case "ctl00$mainCopy$Chkgrupo":
							// case "ctl00$mainCopy$Chkmateria":
							// case "ctl00$mainCopy$txtCarrera":
							case "ctl00$mainCopy$dpdcarrera":
							// case "ctl00$mainCopy$txtplan":
							case "ctl00$mainCopy$dpdplan":

							// // case "ctl00$mainCopy$rblEsquema":  					//periodo ocupa    				->ctl00$mainCopy$rblEsquema$0,ctl00$mainCopy$rblEsquema$1
							// // 	case "ctl00$mainCopy$dpdPeriodoEscolarHist":  	//lista historico periodos    	->ctl00$mainCopy$dpdPeriodoEscolarHist
							// case "ctl00_mainCopy_Chkespecialidad":  			//especialidad    				->ctl00$mainCopy$Chkespecialidad
							// 	case "ctl00$mainCopy$dpdespecialidad":  		//lista especialidad    		->ctl00$mainCopy$dpdespecialidad
							// case "ctl00$mainCopy$ChkSemestre":  				//semestre    					->ctl00$mainCopy$ChkSemestre
							// 	case "ctl00$mainCopy$dpdsemestre":  			//lista semestre    			->ctl00$mainCopy$dpdsemestre
							// case "ctl00$mainCopy$Chkgrupo":  					//grupo    						->ctl00$mainCopy$Chkgrupo
							// 	case "ctl00$mainCopy$dpdgrupo":  				//lista grupos    				->ctl00$mainCopy$dpdgrupo
							// case "ctl00$mainCopy$Chkmateria":  					//materia    					->ctl00$mainCopy$Chkmateria
							// 	case "ctl00$mainCopy$dpdmateria":  				//lista grupos    				->ctl00$mainCopy$dpdmateria
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
								//parametros2 +=elementos[i].getAttribute("name")+"="+elementos[i].value+"\n";
								parametros2 += agregar+elementos[i].getAttribute("name")+"("+elementos[i].value.length+")\n";
								if (elementos[i].getAttribute("type")!="radio"){
									ultimo = elementos[i].getAttribute("name");
								} else {
									if (elementos[i].checked){
										ultimo = elementos[i].getAttribute("name");
									}
								}
								break;
						}
						if (i<1){
							agregar="&";
						}
						if (false){
							// var pasa=true;
							switch(elementos[i].getAttribute("name")){
								//~ case "ctl00$mainCopy$rblEsquema":
								//~ case "ctl00$mainCopy$Chkespecialidad":
								//~ case "ctl00$mainCopy$ChkSemestre":
								//~ case "ctl00$mainCopy$Chkgrupo":
								//~ case "ctl00$mainCopy$Chkmateria":
								//~ case "ctl00$mainCopy$txtCarrera":
								//~ case "ctl00$mainCopy$txtplan":
								case "__EVENTTARGET":
								case "__EVENTARGUMENT":
								case "__LASTFOCUS":
								case "__VIEWSTATE":
								case "__VIEWSTATEENCRYPTED":
								case "__EVENTVALIDATION":
									// pasa=false;

									//parametros2 +=elementos[i].getAttribute("name")+"\n";
									//parametros2 +=elementos[i].getAttribute("name")+"="+elementos[i].value+"\n";
									// parametros +=agregar+encodeURIComponent(elementos[i].getAttribute("name"))+"="+encodeURIComponent(elementos[i].value);
									// parametros2 +=agregar+elementos[i].getAttribute("name")+"\n";
							// var pasa=true;
							switch(elementos[i].getAttribute("name")){
								//~ case "ctl00$mainCopy$rblEsquema":
								//~ case "ctl00$mainCopy$Chkespecialidad":
								//~ case "ctl00$mainCopy$ChkSemestre":
								//~ case "ctl00$mainCopy$Chkgrupo":
								//~ case "ctl00$mainCopy$Chkmateria":
								//~ case "ctl00$mainCopy$txtCarrera":
								//~ case "ctl00$mainCopy$txtplan":
								case "__EVENTTARGET":
								case "__EVENTARGUMENT":
								case "__LASTFOCUS":
								case "__VIEWSTATE":
								case "__VIEWSTATEENCRYPTED":
								case "__EVENTVALIDATION":
									// pasa=false;

									//parametros2 +=elementos[i].getAttribute("name")+"\n";
									//parametros2 +=elementos[i].getAttribute("name")+"="+elementos[i].value+"\n";
									// parametros +=agregar+encodeURIComponent(elementos[i].getAttribute("name"))+"="+encodeURIComponent(elementos[i].value);
									// parametros2 +=agregar+elementos[i].getAttribute("name")+"\n";
									// ultimo=elementos[i].getAttribute("name");
									// break;
							// }
							// if (pasa){
							// 	switch(elementos[i].getAttribute("name")){
								case "ctl00$mainCopy$rblEsquema":
								case "ctl00$mainCopy$dpdcarrera":
								case "ctl00$mainCopy$dpdplan":
									parametros +=agregar+encodeURIComponent(elementos[i].getAttribute("name"))+"="+encodeURIComponent(elementos[i].value);
									//parametros2 +=elementos[i].getAttribute("name")+"="+elementos[i].value+"\n";
									parametros2 +=agregar+elementos[i].getAttribute("name")+"\n";
									ultimo=elementos[i].getAttribute("name");
									break;
								}
							// }
							if (i<1){
								agregar="&";
							}
							
							//parametros +=agregar+elementos[i].getAttribute("name")+"="+elementos[i].value;
							
							//~ __EVENTTARGET						
							//~ __EVENTARGUMENT
							//~ __LASTFOCUS
							//~ __VIEWSTATE
							//~ __VIEWSTATEENCRYPTED
							//~ __EVENTVALIDATION
							//~ ctl00$mainCopy$rblEsquema
							//~ ctl00$mainCopy$Chkespecialidad
							//~ ctl00$mainCopy$ChkSemestre
							//~ ctl00$mainCopy$Chkgrupo
							//~ ctl00$mainCopy$Chkmateria
							//~ ctl00$mainCopy$txtCarrera
							//~ ctl00$mainCopy$dpdcarrera
							//~ ctl00$mainCopy$txtplan
							//~ ctl00$mainCopy$dpdplan		// ultimo=elementos[i].getAttribute("name");
									// break;
							// }
							// if (pasa){
							// 	switch(elementos[i].getAttribute("name")){
								case "ctl00$mainCopy$rblEsquema":
								case "ctl00$mainCopy$dpdcarrera":
								case "ctl00$mainCopy$dpdplan":
									parametros +=agregar+encodeURIComponent(elementos[i].getAttribute("name"))+"="+encodeURIComponent(elementos[i].value);
									//parametros2 +=elementos[i].getAttribute("name")+"="+elementos[i].value+"\n";
									parametros2 +=agregar+elementos[i].getAttribute("name")+"\n";
									ultimo=elementos[i].getAttribute("name");
									break;
								}
							// }
							if (i<1){
								agregar="&";
							}
							
							//parametros +=agregar+elementos[i].getAttribute("name")+"="+elementos[i].value;
							
							//~ __EVENTTARGET						
							//~ __EVENTARGUMENT
							//~ __LASTFOCUS
							//~ __VIEWSTATE
							//~ __VIEWSTATEENCRYPTED
							//~ __EVENTVALIDATION
							//~ ctl00$mainCopy$rblEsquema
							//~ ctl00$mainCopy$Chkespecialidad
							//~ ctl00$mainCopy$ChkSemestre
							//~ ctl00$mainCopy$Chkgrupo
							//~ ctl00$mainCopy$Chkmateria
							//~ ctl00$mainCopy$txtCarrera
							//~ ctl00$mainCopy$dpdcarrera
							//~ ctl00$mainCopy$txtplan
							//~ ctl00$mainCopy$dpdplan
						}
					}
				}
				// alert(parm);
				alert(parametros2);
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
		}
	}
}
function procesaRespuesta() {
	if (peticion_http.readyState == READY_STATE_COMPLETE) {
		if (peticion_http.status == 200) {
			var variable = localStorage['tipoConsulta'];
			switch(variable){
				case "1":
					var respuestaXML = peticion_http.responseXML;					
					var raiz = respuestaXML.getElementsByTagName("gupdate");
					chrome.extension.sendMessage( { command : "getVersion"}, function(respuesta){
						if (respuesta.version<raiz[0].getElementsByTagName("app")[0].getElementsByTagName("updatecheck")[0].getAttribute("version")){
							generaAdvertenciaActualizacion();
						}	
					});
					break;
				case "2":
					var respuesta = peticion_http.responseText;

					var mensaje = document.createElement("div");
					mensaje.setAttribute("style","width:"+window.window.innerWidth+"px;height:"+window.innerHeight+"px;position:fixed;top:50px;left:50px;");
					// // mensaje.innerHTML="<textarea>"+respuesta+"</textarea>";


					var inicio 	= respuesta.indexOf("ctl00_mainCopy_GrvOcupabilidad");
					respuesta 	= respuesta.substring(inicio);
					inicio 		= respuesta.indexOf(">");
					respuesta 	= respuesta.substring(inicio+1);
					var fin 	= respuesta.indexOf("leftcolumn");
					respuesta 	= respuesta.substring(0,fin);
					fin 		= respuesta.indexOf("</table>");
					respuesta 	= respuesta.substring(0,fin);

					mensaje.innerHTML="<table>"+respuesta+"</table>";
					document.body.appendChild(mensaje);
					
				 	var registros = document.getElementById("regs");
				 	registros.innerHTML = respuesta;
				 	marcaOcupados();
				 	inicializaDatos();
					if (buscador.value.length!=0) buscarTexto(buscador.value, 0);

					// var datos = respuesta.getElementById("ctl00_mainCopy_GrvOcupabilidad");
					// datos.setAttribute("id","regs");
					// registros.parentNode.replaceChild(datos,registros);
					// inicializaDatos();
					// marcaOcupados();
					
					//~ //localStorage['resultados'] = respuesta;
					break;
			}
			peticion_http = null;
		}
	}
}
function generaAdvertenciaActualizacion(){
	var mensaje = document.createElement("div");
	mensaje.setAttribute("style"," background-color : #800000; width :"+window.window.innerWidth+"px; height : 18px; position : fixed; top :"+(window.innerHeight-18)+"px; left : 0px;");
	mensaje.innerHTML = "<a id='actualizacionLink' style='color:white;'>&#161;Manten al d&iacute;a la extensi&oacute;n&#33;</a>";
	document.body.appendChild(mensaje);
	document.getElementById("actualizacionLink").addEventListener("click",actualizar,true);
	var info 	= document.createElement("div");
	info.id 	= "informacion";
	info.setAttribute("style"," display : none; position : fixed; background-color : maroon; color : white; top : 6%; left : 50%; z-index : 1; font-size : 17px; margin : 0px 0px 0px -525px; -moz-box-shadow : 0 0 5px 5px #888; -webkit-box-shadow : 0 0 21px 5px#000; box-shadow : 0 0 20px 5px #000; width : 1050px; ");
	info.innerHTML = "<div style='background-color:black; color:white; opacity: 0.85;'>[Cerrar con Escape]</div><div overflow-y:auto; max-height: 450px;'><table style = ' margin : 0 auto; '><tr><td style = ' text-align : justify; width : 151px; font-size : 21px; padding-right : 35px; '><p>De clicks en los elementos que se muestran en las im&aacute;genes.</p><p>Y recargue la p&aacute;gina.</p></td><td><img src='"+chrome.extension.getURL("/css/1.jpg")+"'/><br><br><img src='"+chrome.extension.getURL("/css/2.jpg")+"'/></td></tr></table></div>";
	document.body.appendChild(info);
}
function actualizar(){
	document.getElementById("informacion").style.display = "";
	var texto = 'Para actualizar el complemento entra al menú de Herramientas->Extensiones de chrome/chromium. O ir a la siguiente ruta chrome://extensions/ \nYa dentro verás en la parte superior derecha una leyenda que dice "Modo programador" o "Modo desarrollador", haz click en él y aparecerá un botón que dice "Actualizar extensiones ahora", presionalo, cierra la pestaña del SAES y vuelve a entrar.\nY eso es todo. Es recomendable tener la extensión siempre actualizada para tener las mejoras más recientes.\nDudas, sugerencias o colaboraciones : n0s3.xd@gmail.com';
}
var identificado=false;
function creaFlujo(){
	if (document.getElementById("ctl00_leftColumn_LoginViewSession_LoginStatusSession")!=null){
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
var atajos=false;
function atajosEjecucion(lanzador){
	var evento = lanzador || window.event;
	var codigoTecla = evento.charCode || evento.keyCode;
	switch(codigoTecla){
		case 18: 	desActivaAtajos();
			break;
		case 27: 	//esc
			if (document.getElementById("asignaturas") != null) ocultarHorario();
			if (document.getElementById("informacion") != null) ocultarInfo();
			// if (atajoHorarios) ocultarHorario();
			break;
		default:
			if ((codigoTecla>47 && codigoTecla<58)||(codigoTecla>64 && codigoTecla<91)){
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
		if (codigoTecla>64){
			posicion = codigoTecla-55;
		} else {
			posicion = parseInt(String.fromCharCode(codigoTecla));
		}
		if (posicion<ultimoAtajo){
			switch(accesosAtajos[posicion]){
				case "login":
					if (document.getElementById("ctl00_leftColumn_LoginViewSession_LoginSession_UserName")!=null){
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
function quitaAtajos(){
	var atajos = document.getElementsByName("atajo");
	for (var i=0;i<atajos.length;i++){
		atajos[i].style.display = "none";
	}
	document.getElementById("mensajeAtajos").style.display = "none";
}
function muestraAtajos(){
	var atajos = document.getElementsByName("atajo");
	for (var i=0;i<atajos.length;i++){
		atajos[i].style.display = "";
	}
	document.getElementById("mensajeAtajos").style.display = "";
}
function desActivaAtajos(){
	if (atajos){
		atajos = false;
		document.getElementById("seccionAtajos").style.display = "none";
		// quitaAtajos();
	}else{
		atajos = true;
		document.getElementById("seccionAtajos").style.display = "";
		// muestraAtajos();
	}
}
function recordar(){
	var boleta 	= document.getElementById("ctl00_leftColumn_LoginViewSession_LoginSession_UserName").value;
	var pass 	= document.getElementById("ctl00_leftColumn_LoginViewSession_LoginSession_Password").value;
	if (this.checked!=true){
		chrome.extension.sendMessage( { command : "setDatos", escuela:location.host, boleta : boleta, pass: pass, identificar: false}, identificar);
	} else {
		chrome.extension.sendMessage( { command : "setDatos", escuela:location.host, boleta : boleta, pass: pass, identificar: true}, identificar);
	}
	document.getElementById("cambiosIdentificar").style.display = "";
}
function identificar(respuesta){
	switch(respuesta.command){
		case "getDatos":
			if (location.host==respuesta.escuela){
				document.getElementById("ctl00_leftColumn_LoginViewSession_LoginSession_UserName").value = respuesta.boleta;
				document.getElementById("ctl00_leftColumn_LoginViewSession_LoginSession_Password").value = respuesta.pass;
				document.getElementById("__EVENTTARGET").value 		= "ctl00$leftColumn$LoginViewSession$LoginSession$LoginButton";
				document.getElementById("__EVENTARGUMENT").value 	= "";
				if (respuesta.identificar&&!identificado){	
					// identificado = true;
					document.forms[0].submit();
				}
			}
			var identificar = document.createElement("span");
			identificar.innerHTML = "Autoidentificar <input type='checkbox' id='recordar' tabIndex='3' /><br/><span id='cambiosIdentificar'></span>";

			var recmen = document.getElementById("ctl00_leftColumn_LoginViewSession_LoginSession_PasswordRequired");
			recmen.parentNode.insertBefore(identificar, recmen.nextSibling);

			document.getElementById("recordar").addEventListener("click",recordar,true);
			break;
		case "setDatos":
			var cambios = document.getElementById("cambiosIdentificar");
			cambios.style.color = "green";
			if (respuesta.identificar){
				cambios.innerHTML = "Ok-guardado";
			} else {
				cambios.innerHTML = "Ok-borrado";
			}
			setTimeout(ocultarCambios,2000);
			break;
	}
}
function ocultarCambios(){
	document.getElementById("cambiosIdentificar").setAttribute("style","display:none;");
}
function reaccion(respuesta){
	if (document.getElementById("ctl00_leftColumn_LoginViewSession_LoginStatusSession")==null){
		var errorIdentificacion = false;
		var spans = document.getElementsByTagName("span");
		for (var i=0;!errorIdentificacion&&(i<spans.length);i++){
			if (spans[i].innerText=="El intento de conexión no fue correcto. Inténtelo de nuevo.") errorIdentificacion=true;
		}
		var identificar = document.createElement("span");
		identificar.innerHTML = "Autoidentificar <input type='checkbox' id='recordar' tabIndex='3' /><br/><span id='cambiosIdentificar'></span>";

		var recmen = document.getElementById("ctl00_leftColumn_LoginViewSession_LoginSession_PasswordRequired");
		recmen.parentNode.insertBefore(identificar, recmen.nextSibling);
		document.getElementById("recordar").addEventListener("click",recordar,true);

		if (respuesta.command =="getDatos"){
			if (location.host==respuesta.escuela){
				document.getElementById("ctl00_leftColumn_LoginViewSession_LoginSession_UserName").value=respuesta.boleta;
				document.getElementById("ctl00_leftColumn_LoginViewSession_LoginSession_Password").value=respuesta.pass;
				document.getElementById("__EVENTTARGET").value 		= "ctl00$leftColumn$LoginViewSession$LoginSession$LoginButton";
				document.getElementById("__EVENTARGUMENT").value 	= "";
				if (respuesta.identificar){			
					if (errorIdentificacion){
						alert("Tus datos para auto identificarte estan mal, reviselos en las opciones de la extension, evita bloquear tu cuenta.");
					} else {
						document.getElementById("recordar").checked = true;
					}
				}
			}
		}
	}
}
var destinoConexion="";
function conexionDiccionario(){
	var escuela = location.host.substring(9,location.host.lastIndexOf(".ipn"));
	switch(escuela){
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
			alert("No hay diccionario para tu escuela.");
			break;
	}
}
function comentarioRapido(){
	if (destinoConexion!=""){
		var formularioEnlace 	= document.createElement("form");
		formularioEnlace.action = destinoConexion;
		formularioEnlace.target = "_blank";
		formularioEnlace.method = "POST";
		formularioEnlace.setAttribute("id","formularioEnlace");
		formularioEnlace.innerHTML = "<input type='hidden' name='profesor'><input type='hidden' name='materia'>";
		document.body.appendChild(formularioEnlace);

		var enlaces = document.getElementById("regs");
		enlaces.rows[0].cells[10].innerHTML = "Comentar";
		for (var i=1;i<enlaces.rows.length;i++){
			enlaces.rows[i].cells[10].innerHTML = "<a href='#' name='diccionario'>#</a>";
		}
		var nenlaces = document.getElementsByName("diccionario");
		for (var i=0;i<nenlaces.length;i++){
			nenlaces[i].addEventListener("click",enlaceComentar,true);
		}
	}
}
function verComentarios(){
	if (destinoConexion!=""){
		var formularioEnlace 	= document.createElement("form");
		formularioEnlace.action = destinoConexion;
		formularioEnlace.setAttribute("id","formularioEnlace");
		formularioEnlace.target = "_blank";
		formularioEnlace.method = "POST";
		formularioEnlace.innerHTML = "<input type='hidden' name='sec' value='buscar'/><input type='hidden' name='n'/>";
		document.body.appendChild(formularioEnlace);

		var enlaces = document.getElementById("regs");
		for (var i=1;i<enlaces.rows.length;i++){
			enlaces.rows[i].cells[1].innerHTML = "<a href='#' name='diccionario'>"+enlaces.rows[i].cells[1].innerHTML+"</a>";
			enlaces.rows[i].cells[2].innerHTML = "<a href='#' name='diccionario'>"+enlaces.rows[i].cells[2].innerHTML+"</a>";
			// cuidado con los sin asignar y donde hay dos maestros en la misma materia
		}
		var nenlaces = document.getElementsByName("diccionario");
		for (var i=0;i<nenlaces.length;i++){
			nenlaces[i].addEventListener("click",enlaceVerComentarios,false);
		}
	}
}
function enlaceVerComentarios(){
	document.getElementsByName("n")[0].value = this.innerHTML;
	document.getElementById("formularioEnlace").submit();
	estadoSeleccion = false;
	setTimeout("estadoSeleccion = true;",1000);
}
function enlaceComentar(){
	var posicion = this.parentNode.parentNode.rowIndex;
	var registro = document.getElementById("regs").rows[posicion];
	document.getElementsByName("profesor")[0].value = registro.cells[2].innerHTML;
	document.getElementsByName("materia")[0].value 	= registro.cells[1].innerHTML;
	// alert("P->"+registro.cells[2].innerHTML+"\nM->"+registro.cells[1].innerHTML);
	// document.forms[0].target = "_blank";
	// document.forms[0].submit();
	document.getElementById("formularioEnlace").submit();
}
function expandirHorarios1(){
	var horariosDisponibles = document.getElementById("ctl00_mainCopy_Panel2");
	horariosDisponibles.style.height 	= "";
	horariosDisponibles.style.width 	= "900px";
	horariosDisponibles.style.overflow 	= "";
	document.getElementById("ctl00_mainCopy_GV_Horario2").style.width = "900px";
}
function expandirHorarios2(){
	var horarioNuevo = document.getElementById("ctl00_mainCopy_Panel1");
	horarioNuevo.style.height 	= "";
	horarioNuevo.style.width 	= "";
	horarioNuevo.style.overflow = "";
	document.getElementById("ctl00_mainCopy_GV_Horario").style.width = "900px";
	document.getElementById("ctl00_mainCopy_GV_Horario").style.width = "900px";
}
function tiempoHorarios2(){
	setTimeout("expandirHorarios2()",500);
}
function tiempoHorarios1(){
	setTimeout("expandirHorarios1()",500);
}
function detectaPantalla(){
	switch(location.pathname){
		case "/":
			chrome.extension.sendMessage( { command : "getDatos"}, identificar);
			break;
		case "/Default.aspx":
			chrome.extension.sendMessage( { command : "getDatos"}, reaccion);
			break;
		case "/alumnos/default.aspx":
			var boleta = document.getElementById("ctl00_leftColumn_LoginViewSession_LoginNameSession").innerHTML;
			document.cookie="boleta="+boleta+";path=/";
			break;
		// case "/Alumnos/Evaluacion_docente/califica_profe.aspx":
		case "/Alumnos/Evaluacion_docente/evaluacion_profesor.aspx":
		case "/Alumnos/Evaluacion_Docente/evaluacion_profesor.aspx":
			if (confirm("\u00BFDesea calificar a los maestros r\u00E1pidamente?")){
				pedir();
			}
			break;
		case "/Academica/Ocupabilidad_grupos.aspx":
			var periodo = document.getElementsByName("ctl00$mainCopy$rblEsquema");
			if (periodo[0].checked!=true&&periodo[1].checked!=true){
				document.getElementById("ctl00_mainCopy_Chkespecialidad").disabled 	= true;
				document.getElementById("ctl00_mainCopy_ChkSemestre").disabled 		= true;
				document.getElementById("ctl00_mainCopy_Chkgrupo").disabled 		= true;
				document.getElementById("ctl00_mainCopy_Chkmateria").disabled 		= true;
			}
			if (document.getElementById("ctl00_mainCopy_GrvOcupabilidad")!=null){
				if (document.getElementById("ctl00_mainCopy_GrvOcupabilidad").tBodies.length>0&&document.getElementById("ctl00_mainCopy_GrvOcupabilidad").tBodies[0].rows.length>1){
					marcaOcupados();
					agregaBuscador(1);
				}
			}
			break;
		case "/Academica/horarios.aspx":
			if (document.getElementById("ctl00_mainCopy_dbgHorarios")!=null){
				if (document.getElementById("ctl00_mainCopy_dbgHorarios").tBodies.length>0&&document.getElementById("ctl00_mainCopy_dbgHorarios").tBodies[0].rows.length>0){
					document.getElementById("ctl00_mainCopy_Panel1").setAttribute("style","");
					agregaBuscador(2);
					retiraSabados();
					conexionDiccionario();
					seleccionMaterias();
					cargarMateriasHorario();
					verComentarios();
					cargarHorariosGenerados();
				}
			}
			break;
		case "/Academica/Calendario.aspx":
			var tipo = document.getElementsByName("ctl00$mainCopy$rdlconsulta");
			if (tipo[0].checked!=true&&tipo[0].checked!=true){
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
			// retiraSabados();
			conexionDiccionario();
			comentarioRapido();
			break;
		case "/Alumnos/Reinscripciones/reinscribir.aspx":

			document.getElementById("wrapper").style.width 			= "1300px";
			document.getElementById("contentwrapper").style.width 	= "1000px";
			document.getElementById("floatwrapper").style.width 	= "1000px";
			document.getElementById("centercolumn").style.width 	= "1000px";
			document.getElementById("ctl00_mainCopy_div").style.height = "";
			document.getElementById("ctl00_mainCopy_div").style.width = "";
			
			document.getElementById("ctl00_mainCopy_UpdatePanel2").addEventListener("DOMSubtreeModified",tiempoHorarios2,true);
			document.getElementById("ctl00_mainCopy_UpdatePanel1").addEventListener("DOMSubtreeModified",tiempoHorarios1,true);
			expandirHorarios2();
			expandirHorarios1();

			break;
		case "/Alumnos/boleta/kardex.aspx":
			document.getElementById("ctl00_mainCopy_Panel1").removeAttribute("style");

			if (document.getElementById("contentwrapper").children.length<3){
				var parteIzquierda=document.getElementById("rightcolumn").cloneNode(true);
				document.getElementById("rightcolumn").parentNode.removeChild(document.getElementById("rightcolumn"));
				document.getElementById("contentwrapper").appendChild(parteIzquierda);
				
				var piePagina=document.getElementById("footer").cloneNode(true);
				document.getElementById("footer").parentNode.removeChild(document.getElementById("footer"));
				document.getElementById("contentwrapper").appendChild(piePagina);
				
				var parteDerecha=document.getElementById("leftcolumn").cloneNode(true);
				document.getElementById("leftcolumn").parentNode.removeChild(document.getElementById("leftcolumn"));
				document.getElementById("floatwrapper").appendChild(parteDerecha);
				
				ajustaPeriodos();
			}
			break;
	}
}
function seleccionMaterias(){
	//document.body.innerHTML+="<div id='asignaturas' style='display:none;'></div>";
	var tabla = document.getElementById("regs");
	tabla.rows[0].insertCell(10);
	tabla.rows[0].cells[10].innerHTML = "#";
	var cuadros  	= document.createElement("input");
	cuadros.type 	= "checkbox";
	cuadros.title 	= "Agregar";
	for (var i=1;i<tabla.rows.length;i++){
		tabla.rows[i].insertCell(10);
		//cuadro.value="Agregar";
		// cuadro.setAttribute("numero",i);
		var cuadro 		= cuadros.cloneNode(true);
		cuadro.numero 	= i;
		cuadro.addEventListener("click",agregarMateria,true);
		tabla.rows[i].cells[10].appendChild(cuadro);
	}
	var materiasSeleccionadas 	= document.createElement("div");
	materiasSeleccionadas.id 	= "asignaturas";
	materiasSeleccionadas.setAttribute("style","display:none; min-height:80px; min-width:250px; position: fixed; background-color: maroon; color: white; top: 6%; left: 50%; opacity: 0.85; z-index: 1; font-size: 17px; margin:0px 0px 0px -525px; -moz-box-shadow: 0 0 5px 5px #888; -webkit-box-shadow: 0 0 20px 5px#000; box-shadow: 0 0 20px 5px #000; width: 1050px; ");
	materiasSeleccionadas.innerHTML = "<div style='background-color:black; color:white;'>[Cerrar con Escape]</div> <div id = 'resultadoHorarios' style='display:none; overflow-y:auto; max-height: 450px;'></div> <div id = 'asignaturasSeleccionadas' style='overflow-y:auto; max-height: 450px;'> <table id = 'tablaAsignaturas' style='width:100%;'> <tr style = 'background-color:#FF9900; color:white;'> <td>Grupo</td> <td>Materia</td> <td>Profesor</td> <td>Lun</td> <td>Mar</td> <td>Mi&eacute;</td> <td>Jue</td> <td>Vie</td> <td>Quitar</td> <td>Incluir</td> </tr> </table> </div><div id = 'controlesHorarios'> <input type='button' id='borrarMateriasHorario' value='Borrar Todo'> <input type = 'button' id = 'generarMateriasHorario' value='Generar'> <input type = 'button' id = 'expImp' value = 'Exportar/Importar'> <span id ='totalSeleccion' style = ' float:right; padding-right : 30px; '>0</span> </div>  <div id = 'exportar' style = 'display : none;'>Copia el texto y guardalo en un archivo, o pega y da enter.<input id = 'exportarSeleccion' type = 'text' size = '5'/></div> <div id='informacionHorarios'></div>";
	var mostrarMateriasHorario 	 	= document.createElement("input");
	mostrarMateriasHorario.type  	= "button";
	mostrarMateriasHorario.value 	= "Ver Horario";
	mostrarMateriasHorario.setAttribute("id","mostrarMateriasHorario");
	mostrarMateriasHorario.addEventListener("click",mostrarHorario,true);

	document.getElementById("contador").parentNode.appendChild(mostrarMateriasHorario);	
	//tabla.parentNode.innerHTML+="<div id='asignaturas' style='display:none;'></div>";
	tabla.parentNode.appendChild(materiasSeleccionadas);
	document.getElementById("borrarMateriasHorario").addEventListener("click",borrarMateriasHorario,true);
	document.getElementById("generarMateriasHorario").addEventListener("click",generarHorarios,true);
	document.getElementById("expImp").addEventListener("click",expImp,true);
	document.getElementById("exportarSeleccion").addEventListener("change",importar,true);
	document.getElementById("exportarSeleccion").addEventListener("focus",seleccionarContenido,true);
	if (localStorage.horarioMaterias!=null && localStorage.horarioMaterias!="" && localStorage.horarioMaterias!="null" ){ 
		document.getElementById("exportarSeleccion").value = localStorage.horarioMaterias;
	}
}
function seleccionarContenido(){
	this.select();
}
function importar (){
	if (this.value != localStorage.horarioMaterias){
		try {
			materiasHorario = JSON.parse(this.value);
			guardarMateriasHorario();
			alert("Se va a recargar la p\u00E1gina.");
			// location.reload();
			document.forms[0].submit();
		} catch (msj){
			alert("Ha ingresado datos erroneos.");
			this.value = localStorage.horarioMaterias;
		}
		
	}
}
function expImp (){
	if ( document.getElementById("exportar").style.display == ""){
		document.getElementById("exportar").style.display = "none";
	} else {
		document.getElementById("exportar").style.display = "";
		document.getElementById("exportarSeleccion").focus();
	}
}
function generarHorarios (){
	// log("-> Generando horarios....1");
	cargarMateriasHorarioGuardadas();
	if (materiasHorario.materias.length!=0){
		// log("-> Generando horarios....1.1");
		var materiasCombinar 	= materiasHorario;
		var grupoMaterias 		= {materias:[]};
		while(materiasCombinar.materias.length!=0){
			// log("-> Generando horarios....1.1.1");
			var agrupado = false;
			var materiaOrdenar = materiasCombinar.materias.pop();
			if (materiaOrdenar.estado){
				for (var i=0;i<grupoMaterias.materias.length;i++){
					if (materiaOrdenar.materia==grupoMaterias.materias[i].materia){
						var grupo = {grupo : materiaOrdenar.grupo, horas : materiaOrdenar.horas, profe : materiaOrdenar.profe};
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
		while(grupoMaterias.materias.length!=0){
			var materia = grupoMaterias.materias.shift();
			var i;
			for (i=0; i < gruposOrdenados.materias.length;i++){
				if (materia.grupos.length <= gruposOrdenados.materias[i].grupos.length){
					break;
				}
			}
			gruposOrdenados.materias.splice(i,0,materia);
		}
		// localStorage.armadoOrdenado = "";
		localStorage.armadoOrdenado 	= JSON.stringify(gruposOrdenados);
		var horariosPosiblesAnteriores 	= {combinacion:[]};
		var combinacionesDisponibles 	= true;

		// alert("Numero de materias "+gruposOrdenados.materias.length);
		// log("-> Generando horarios....1.2");
		if (gruposOrdenados.materias.length!=0){
			// log("-> Generando horarios....1.2.1");
			for (var i=0;i<gruposOrdenados.materias[0].grupos.length;i++){
				var combinacion = {secuencia:[i], horas:gruposOrdenados.materias[0].grupos[i].horas};
				horariosPosiblesAnteriores.combinacion.push(combinacion);
			}
			// alert(JSON.stringify(horariosPosiblesAnteriores));
			for (var i=1;combinacionesDisponibles && i < gruposOrdenados.materias.length;i++){
				//alert(i);
				var horariosPosibles = {combinacion:[]};
				// alert("->"+horariosPosiblesAnteriores.combinacion.length);
				for (var j=0;j<horariosPosiblesAnteriores.combinacion.length;j++){
					//alert("->"+j);
					// alert("- ->"+gruposOrdenados.materias[i].grupos.length);
					
					var combinacion = {secuencia:horariosPosiblesAnteriores.combinacion[j].secuencia, horas:horariosPosiblesAnteriores.combinacion[j].horas};
					for (var n=0;n<gruposOrdenados.materias[i].grupos.length;n++){
						//alert("-->"+n);
						var encontrado = false;
						// combinacion.horas = horariosPosiblesAnteriores.combinacion[j].horas;
						// combinacion.secuencia = horariosPosiblesAnteriores.combinacion[j].secuencia;
						
						// alert(combinacion.horas+"###"+gruposOrdenados.materias[i].grupos[n].horas);
						// alert(i+" , "+n);
						for (var k=0;!encontrado && k<gruposOrdenados.materias[i].grupos[n].horas.length;k++){
							if (buscarArregloOrdenado(combinacion.horas,gruposOrdenados.materias[i].grupos[n].horas[k])!=-1){
								encontrado = true;
							}
						}
						if (!encontrado){
							//alert("Agregado");
							var nuevaCombinacion = {secuencia:[], horas:combinacion.horas};
							nuevaCombinacion.horas = nuevaCombinacion.horas.concat(gruposOrdenados.materias[i].grupos[n].horas);
							nuevaCombinacion.horas = ordenar(nuevaCombinacion.horas);
							nuevaCombinacion.secuencia = nuevaCombinacion.secuencia.concat(combinacion.secuencia);
							// nuevaCombinacion.secuencia.push(n);
							nuevaCombinacion.secuencia[i]=n;
							//alert("secuencia  "+nuevaCombinacion.secuencia+" - "+nuevaCombinacion.secuencia.length);
							horariosPosibles.combinacion.push(nuevaCombinacion);
							// alert(n+" - "+nuevaCombinacion.secuencia+" # "+JSON.stringify(horariosPosibles.combinacion));
						}
					}
					// alert("opciones anteriores  "+j+"/"+horariosPosiblesAnteriores.combinacion.length);
				}
				if (horariosPosibles.combinacion.length!=0) horariosPosiblesAnteriores = horariosPosibles;
				else combinacionesDisponibles = false;
				// alert("opciones anteriores  "+horariosPosiblesAnteriores.combinacion.length+" #"+JSON.stringify(horariosPosiblesAnteriores.combinacion));
			}
		}
		// alert("Listo");
		// log("-> Generando horarios....1.3");
		if (combinacionesDisponibles&&horariosPosiblesAnteriores.combinacion.length>0){
			// log("-> Generando horarios....1.3.1");
			localStorage.resultados = JSON.stringify(horariosPosiblesAnteriores);
			presentarHorariosGenerados(horariosPosiblesAnteriores,gruposOrdenados);
		} else {
			// log("-> Generando horarios....1.3.2");
			document.getElementById("informacionHorarios").innerHTML="No hay resultados";
			cargarMateriasHorarioGuardadas();
		}
		horariosPosiblesAnteriores=null;
	}
	// log("-> Generando horarios....2");
}
function cargarHorariosGenerados(){
	if (localStorage.resultados!=null && localStorage.resultados!="" && localStorage.resultados!="null" && 
		localStorage.armadoOrdenado!=null && localStorage.armadoOrdenado!="" && localStorage.armadoOrdenado!="null" ){
		var gruposOrdenados = JSON.parse(localStorage.armadoOrdenado);
		var horariosPosiblesAnteriores = JSON.parse(localStorage.resultados);
		presentarHorariosGenerados(horariosPosiblesAnteriores,gruposOrdenados);
	}
}
function seleccionarHorario(){
	if (this.value!= "" && this.value.length>0){
		switch(parseInt(this.value)){
			case 0:
				mostrarSeleccionMaterias();
				break;
			default:
				mostrarHorarioGenerado(this.value);
				break;
		}
	}
}
var totalHorarios=0;
function presentarHorariosGenerados(horariosPosiblesAnteriores, gruposOrdenados){
	var nResultados = horariosPosiblesAnteriores.combinacion.length;
	var informacion = document.getElementById("informacionHorarios");
	informacion.setAttribute("style","text-align:center;");
	// informacion.style = "text-aling:center;";
	// informacion.innerHTML 	= "Hay "+nResultados+" resultados: ";

	totalHorarios 				= parseInt(nResultados);
	var seleccionHorarios 		= document.createElement("table");
	seleccionHorarios.innerHTML = "<tr><td>Hay "+nResultados+" resultados:</td><td><input id='seleccionHorarios' type='number' min='0' max='"+nResultados+"' value='0' size='4'/></td><td>Puedes usar las flechas &uArr; &dArr;</td></tr>";
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
	tablaInformacion.innerHTML 		= "<tr style='background-color:#FF9900; color:white;'><td>Grupo</td><td>Materia</td><td>Profesor</td><td>Lun</td><td>Mar</td><td>Mi&eacute;</td><td>Jue</td><td>Vie</td></tr>";
	for (var i=0;i<horariosPosiblesAnteriores.combinacion[0].secuencia.length;i++){
		tablaInformacion.insertRow(i+1);
		for (var k=0;k<8;k++) tablaInformacion.rows[i+1].insertCell(k);
		tablaInformacion.rows[i+1].cells[1].innerHTML=gruposOrdenados.materias[i].materia;
	}

	cargarMateriasHorarioGuardadas();
	var resultadoHorarios = document.getElementById("resultadoHorarios");
	resultadoHorarios.innerHTML="";
	for (var n=0;n<nResultados;n++){
		// var boton 	= document.createElement("input");
		// boton.type 	= "button";
		// boton.value = (n+1);
		// boton.addEventListener("click",mostrarHorarioGenerado,true);
		// informacion.appendChild(boton);
		
		var tablaInformacionN = tablaInformacion.cloneNode(true);
		for (var i=0;i<horariosPosiblesAnteriores.combinacion[n].secuencia.length;i++){
			tablaInformacionN.rows[i+1].cells[0].innerHTML=gruposOrdenados.materias[i].grupos[horariosPosiblesAnteriores.combinacion[n].secuencia[i]].grupo;
			if (destinoConexion!=""){
				var enlaceDiccionario = document.createElement("a");
				enlaceDiccionario.href = "#";
				enlaceDiccionario.setAttribute("style","color : #F90;");
				enlaceDiccionario.innerHTML = gruposOrdenados.materias[i].grupos[horariosPosiblesAnteriores.combinacion[n].secuencia[i]].profe;
				enlaceDiccionario.addEventListener("click",enlaceVerComentarios,false);
				tablaInformacionN.rows[i+1].cells[2].appendChild(enlaceDiccionario);
			} else {
				tablaInformacionN.rows[i+1].cells[2].innerHTML=gruposOrdenados.materias[i].grupos[horariosPosiblesAnteriores.combinacion[n].secuencia[i]].profe;
			}
			var j;
			// alert("t "+materiasHorario.materias.length);
			for (j=0;j<materiasHorario.materias.length;j++){
				// alert(tablaInformacionN.rows[i+1].cells[0].innerHTML+"/"+materiasHorario.materias[j].grupo);
				if (tablaInformacionN.rows[i+1].cells[0].innerHTML == materiasHorario.materias[j].grupo &&  tablaInformacionN.rows[i+1].cells[1].innerHTML == materiasHorario.materias[j].materia){
					break;
				}
			}
			// alert(j);
			for (var k=3;k<8;k++) {
				tablaInformacionN.rows[i+1].cells[k].innerHTML = materiasHorario.materias[j].dias[k-3];
			}
		}
		tablaInformacionN.setAttribute("id","horarioGenerado"+(n+1));
		tablaInformacionN.setAttribute("name","horariosGenerados");
		resultadoHorarios.appendChild(tablaInformacionN);
	}
}
function mostrarSeleccionMaterias(){
	document.getElementById("asignaturasSeleccionadas").style.display = "";
	document.getElementById("controlesHorarios").style.display = "";
	document.getElementById("resultadoHorarios").style.display = "none";
}
function ocultarHorariosGenerados(){
	var horariosGenerados = document.getElementsByName("horariosGenerados");
	for (var i=0;i<horariosGenerados.length;i++)	horariosGenerados[i].style.display = "none";
}
function mostrarHorarioGenerado(numero){
	if (numero<=totalHorarios){
		ocultarHorariosGenerados();
		document.getElementById("horarioGenerado"+numero).style.display = "";
		document.getElementById("resultadoHorarios").style.display = "";
		document.getElementById("asignaturasSeleccionadas").style.display = "none";
		document.getElementById("controlesHorarios").style.display = "none";
		document.getElementById("exportar").style.display = "none";
	}
}
function buscarArregloOrdenado(arreglo, buscar){
	var k = parseInt(arreglo.length/2);
	var i = 0;
	var n = k;
	var l = arreglo.length;

	var encontrado = false;
	var pos=-1;
	while(k!=0){
		if (buscar!=arreglo[n]){					
			k = parseInt((n-i)/2);
			if (buscar > arreglo[n]){
				if (k!=1){
					i = n;
					n += k ;
				} else{
					for (n++;n<l;n++){
						if (buscar==arreglo[n]){
							encontrado = true;
							pos = n;
							break;
						}
					}
					if (!encontrado){
						break;
					}
				}
			} else{
				if (k!=1){
					n -= k;
					l = n;
				} else{
					for (n--;n>=i;n--){
						if (buscar==arreglo[n]){
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
var materiasHorario = {materias:[]};
function agregarMateria(){
	var materias 	= document.getElementById("asignaturas");
	var tabla 		= document.getElementById("regs");
	var grupo 		= tabla.rows[this.numero].cells[0].innerHTML;
	var nombre 		= tabla.rows[this.numero].cells[1].innerHTML;
	var profesor 	= tabla.rows[this.numero].cells[2].innerHTML;
	if (destinoConexion!=""){
		nombre 		= tabla.rows[this.numero].cells[1].firstChild.innerHTML;
		profesor 	= tabla.rows[this.numero].cells[2].firstChild.innerHTML;
	}
	var i;
	for (i=this.numero-1;i>0;i--){
		// if (grupo!=tabla.rows[i].cells[0].innerHTML || nombre!=tabla.rows[i].cells[1].innerHTML){
		if (grupo!=tabla.rows[i].cells[0].innerHTML){
			break;
		}
	}
	i++;
	
	if (this.checked!=false){ //agregar
		// var grupo=this.parentNode.parentNode.cells[0].innerHTML;
		// var nombre=this.parentNode.parentNode.cells[1].innerHTML;
		var dias = ["&nbsp;","&nbsp;","&nbsp;","&nbsp;","&nbsp;"]; //dias de la semana
		var horasSeguimiento = new Array(); //horas combinación
		
		var horas;
		var rango;
		//var i=this.numero;
		var j;
		var n;
		//encontrar primera posicion de aparicion		
		// do{
		for (;i<tabla.rows.length && grupo==tabla.rows[i].cells[0].innerHTML;i++){
			if ((destinoConexion!="" && nombre==tabla.rows[i].cells[1].firstChild.innerHTML) || nombre==tabla.rows[i].cells[1].innerHTML){
				tabla.rows[i].cells[10].firstChild.checked=true;
				var cambioDia = 0;
				for (var j=5;j<10;j++){
					if (tabla.rows[i].cells[j].innerHTML!="&nbsp;"){
						horas = tabla.rows[i].cells[j].innerHTML;
						horas = horas.replace("/\s+/g","");
						horas = horas.replace(/:/g,".");
						rango = new Array();
						// alert(horas);
						rango = horas.split("-");
						for (n=0;n<2;n++){
							rango[n] = 	parseFloat(rango[n]);
							rango[n] += 0.2;
							if (rango[n]%0.5!=0) rango[n]=parseInt(rango[n]);
							rango[n] -= 7;
						}
						rango[1] = ((rango[1]-rango[0])*2)-1;
						rango[0] *= 2;
						rango[1] += rango[0];

						var encontrarInicio = false;
						for (n=0;n<horasSeguimiento.length;n++){
							// alert("buscando "+rango[0]);
							if (rango[0]+cambioDia==horasSeguimiento[n]){
								encontrarInicio = true;
								for (n++;n<horasSeguimiento.length;n++){
									if (horasSeguimiento[n-1]+1!=horasSeguimiento[n]){
										break;
									}
								}
								if (horasSeguimiento[n-1]!=rango[1]){
									if (horasSeguimiento[n-1]<rango[1]){
										// alert("ie");
										for (n=horasSeguimiento[n-1]+1;n<=rango[1];n++) horasSeguimiento.push(n+cambioDia);
										//ordenar(horasSeguimiento);
										//var diasRangos = dias[j-5].split(",");
										//alert("#"+dias[j-5]+"#");
										if (dias[j-5]!="&nbsp;") dias[j-5]+=","+tabla.rows[i].cells[j].innerHTML;
										else dias[j-5]=tabla.rows[i].cells[j].innerHTML;
									}
								}
							}
						}
						if (!encontrarInicio){
							// alert("in");
							for (n=rango[0];n<=rango[1];n++) horasSeguimiento.push(n+cambioDia);
							if (dias[j-5]!="&nbsp;") dias[j-5]+=","+tabla.rows[i].cells[j].innerHTML;
							else dias[j-5]=tabla.rows[i].cells[j].innerHTML;
							// dias[j-5]=tabla.rows[i].cells[j].innerHTML;					
						}
					}
					cambioDia += 30;
				}
			}
		}
		// while(
		// 	i<tabla.rows.length &&
		// 	grupo==tabla.rows[i].cells[0].innerHTML && 
		// 	grupo==tabla.rows[i].cells[1].innerHTML
		// );
		horasSeguimiento 	= ordenar(horasSeguimiento);
		var asignaturaH 	= { materia : nombre, profe: profesor, grupo : grupo, horas : horasSeguimiento, dias : dias, estado : true };
		materiasHorario.materias.push(asignaturaH);
		
		var asignaturasTabla = document.getElementById("tablaAsignaturas");
		asignaturasTabla.insertRow(asignaturasTabla.rows.length);
		var materiaH = asignaturasTabla.rows[asignaturasTabla.rows.length-1];
		
		for (var j=0;j<10;j++) materiaH.insertCell(j);
		materiaH.cells[0].innerHTML = asignaturaH.grupo;
		materiaH.cells[1].innerHTML = asignaturaH.materia;
		var quitarMateria = document.createElement("img");
		quitarMateria.src = chrome.extension.getURL("/css/menos.png");
		quitarMateria.addEventListener("click",removerMateria,true);
		materiaH.cells[8].appendChild(quitarMateria);
		var estadoMateria 	= document.createElement("input");
		estadoMateria.type 	= "checkbox";
		estadoMateria.title = "Habilitar/Deshabilitar";
		estadoMateria.name 	= "incluirMateria";
		estadoMateria.checked 	= true;
		estadoMateria.addEventListener("change",cambiarEstadoSeleccion,true);
		materiaH.cells[9].appendChild(estadoMateria);
		// materiaH.cells[9].innerHTML="<input type='checkbox' title='Habilitar/Deshabilitar' name='incluirMateria' checked >";
		if (destinoConexion!=""){
			var enlaceDiccionario 	= document.createElement("a");
			enlaceDiccionario.href 	= "#";
			enlaceDiccionario.setAttribute("style","color : #F90;");
			enlaceDiccionario.innerHTML = asignaturaH.profe;
			enlaceDiccionario.addEventListener("click",enlaceVerComentarios,false);
			materiaH.cells[2].appendChild(enlaceDiccionario);
		} else {			
			materiaH.cells[2].innerHTML = asignaturaH.profe;
		}

		for (var j=0;j<5;j++) materiaH.cells[3+j].innerHTML = dias[j];
		
		document.getElementById("totalSeleccion").innerHTML = parseInt(document.getElementById("totalSeleccion").innerHTML)+1;
		document.getElementById("asignaturasSeleccionadas").style.display = "";
		atajoHorarios = true;

		guardarMateriasHorario();
	}else { //quitar
		for (;i<tabla.rows.length && grupo==tabla.rows[i].cells[0].innerHTML;i++){
			if (nombre==tabla.rows[i].cells[1].innerHTML){
				tabla.rows[i].cells[10].firstChild.checked = false;
			}
		}
		var asignaturasTabla = document.getElementById("tablaAsignaturas");
		for (i=1;i<asignaturasTabla.rows.length;i++){
			if (asignaturasTabla.rows[i].cells[0].innerHTML==grupo && asignaturasTabla.rows[i].cells[1].innerHTML == nombre){
				asignaturasTabla.deleteRow(i);
				break;
			}
		}
		borrarMateriaHorario(grupo, nombre);
	}
}
function cambiarEstadoSeleccion(){
	var grupo 	= this.parentNode.parentNode.cells[0].innerHTML;
	var materia = this.parentNode.parentNode.cells[1].innerHTML;
	var n = materiasHorario.materias.length;
	for (var i=0;i<n;i++){
		if (materiasHorario.materias[i].grupo==grupo && materiasHorario.materias[i].materia==materia){
			materiasHorario.materias[i].estado = this.checked;
			guardarMateriasHorario();
			break;
		}
	}
	// alert("|"+grupo+"|"+materia+"|");
}
function borrarMateriasHorario(){
	var i;
	var tabla = document.getElementById("regs");
	for (i=1;i<tabla.rows.length;i++) tabla.rows[i].cells[10].firstChild.checked = false;
	tabla = document.getElementById("tablaAsignaturas");
	for (i=tabla.rows.length-1;tabla.rows.length!=1;i--) tabla.deleteRow(i);
	//document.getElementById("asignaturasSeleccionadas").style.display="none";
	ocultarHorario();
	atajoHorarios 	= false;
	materiasHorario = {materias:[]};
	localStorage.horarioMaterias 	= "";
	localStorage.armadoOrdenado 	= "";
	localStorage.resultados 		= "";
	mostrarSeleccionMaterias();
	document.getElementById("exportarSeleccion").value 			= "";
	document.getElementById("resultadoHorarios").innerHTML 		= "";
	document.getElementById("informacionHorarios").innerHTML 	= "";
	document.getElementById("totalSeleccion").innerHTML 		= "0";
}
function ordenar(datos){
	var limite = datos.length, k=parseInt(limite/2),i,j,temp;
	while(k>0){
		for (i=k;i<=limite-1;i++){
			j = i;
			while(j-k>=0){
				if (datos[j]<datos[j-k]){
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
function guardarMateriasHorario(){
	if (materiasHorario.materias.length != 0){
		localStorage.horarioMaterias = JSON.stringify(materiasHorario);
		document.getElementById("exportarSeleccion").value = localStorage.horarioMaterias;
	}
}
var atajoHorarios=false;
function cargarMateriasHorarioGuardadas(){
	if (localStorage.horarioMaterias!=null && localStorage.horarioMaterias!="" && localStorage.horarioMaterias!="null" ){
		materiasHorario = JSON.parse(localStorage.horarioMaterias);
	}	
}
function removerMateria(){
	if (confirm("\u00BFEsta seguro?")){
		var grupo 	= this.parentNode.parentNode.cells[0].innerHTML;
		var materia = this.parentNode.parentNode.cells[1].innerHTML;

		this.parentNode.parentNode.parentNode.deleteRow(this.parentNode.parentNode.rowIndex);

		var registros = document.getElementById("regs");
		for (var i=1;i<registros.rows.length;i++){
			if (registros.rows[i].cells[0].innerHTML==grupo && (registros.rows[i].cells[1].innerHTML==materia || (destinoConexion!="" && registros.rows[i].cells[1].firstChild.innerHTML==materia) )){
				registros.rows[i].cells[10].firstChild.checked = false;
			}
		}
		borrarMateriaHorario(grupo, materia);
	}
}
function borrarMateriaHorario(grupo, nombre){
	cargarMateriasHorarioGuardadas();
	if (materiasHorario.materias.length > 1){
		for (var i=0; i < materiasHorario.materias.length; i++){
			if (materiasHorario.materias[i].grupo == grupo && materiasHorario.materias[i].materia == nombre){
				if (i>parseInt(materiasHorario.materias.length/2)){
					for (;i<((materiasHorario.materias.length)-1);i++){
						materiasHorario.materias[i] = materiasHorario.materias[i+1];
					}	
					materiasHorario.materias.pop();
				} else {
					for (;i>0;i--){
						materiasHorario.materias[i] = materiasHorario.materias[i-1];
					}
					materiasHorario.materias.shift();
				}
				break;
			}
		}
		document.getElementById("totalSeleccion").innerHTML = parseInt(document.getElementById("totalSeleccion").innerHTML)-1;
		guardarMateriasHorario();
	} else {
		borrarMateriasHorario();	
	}
}
function cargarMateriasHorario(){
	if (localStorage.horarioMaterias!=null && localStorage.horarioMaterias!="" && localStorage.horarioMaterias!="null" ){
		materiasHorario = JSON.parse(localStorage.horarioMaterias);
		var tabla = document.getElementById("regs");
		var asignaturasTabla = document.getElementById("tablaAsignaturas");
		var materiaH;
		var i;
		var quitarMaterias = document.createElement("img");
		quitarMaterias.src = chrome.extension.getURL("/css/menos.png");
		quitarMaterias.title = "Quitar";
		
		var estadoMaterias 		= document.createElement("input");
		estadoMaterias.type 	= "checkbox";
		estadoMaterias.title 	= "Habilitar/Deshabilitar";
		estadoMaterias.name 	= "incluirMateria";
		
		var materiaSinEstado = false;
		for (i=0;i<materiasHorario.materias.length;i++){
			asignaturasTabla.insertRow(asignaturasTabla.rows.length);
			materiaH = asignaturasTabla.rows[asignaturasTabla.rows.length-1];
			for (var j=0;j<10;j++) materiaH.insertCell(j);
			materiaH.cells[0].innerHTML = materiasHorario.materias[i].grupo;
			materiaH.cells[1].innerHTML = materiasHorario.materias[i].materia;
			if (destinoConexion!=""){
				materiaH.cells[2].innerHTML = "<a href='#' name='diccionario' style='color:#F90;'>"+materiasHorario.materias[i].profe+"</a>";
			} else {
				materiaH.cells[2].innerHTML = materiasHorario.materias[i].profe;
			}
			var quitarMateria = quitarMaterias.cloneNode(true);
			quitarMateria.addEventListener("click",removerMateria,true);
			materiaH.cells[8].appendChild(quitarMateria);

			var estadoMateria = estadoMaterias.cloneNode(true);
			estadoMateria.addEventListener("change",cambiarEstadoSeleccion,true);

			if (materiasHorario.materias[i].estado==undefined || materiasHorario.materias[i].estado!=false){
				estadoMateria.checked 	= true;
				if (materiasHorario.materias[i].estado==undefined){
					materiasHorario.materias[i] = { materia : materiasHorario.materias[i].materia, profe: materiasHorario.materias[i].profe, grupo : materiasHorario.materias[i].grupo, horas : materiasHorario.materias[i].horas, dias : materiasHorario.materias[i].dias, estado : true };
					materiaSinEstado = true;
				}
			}
			materiaH.cells[9].appendChild(estadoMateria);
			for (var j=0;j<5;j++) materiaH.cells[3+j].innerHTML = materiasHorario.materias[i].dias[j];
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
			for (var j=1;j<tabla.rows.length;j++){
				if ( (materiasHorario.materias[i].grupo == tabla.rows[j].cells[0].innerHTML) && ( ( destinoConexion != "" && materiasHorario.materias[i].materia == tabla.rows[j].cells[1].firstChild.innerHTML ) || (materiasHorario.materias[i].materia == tabla.rows[j].cells[1].innerHTML) )){
					tabla.rows[j].cells[10].firstChild.checked = true;
				}				
			}
		}
		if (materiaSinEstado){
			guardarMateriasHorario();
		}
		if (i!=0){
			document.getElementById("asignaturasSeleccionadas").style.display = "";
			document.getElementById("totalSeleccion").innerHTML = i;
			atajoHorarios = true;
		}
	}
}
function marcaOcupados(){
	var id = "ctl00_mainCopy_GrvOcupabilidad";
	if (document.getElementById("regs")!=null) id = "regs";
	var numRegistros = document.getElementById(id).rows.length;
	for (var i=1;i<numRegistros;i++){
		var registros = document.getElementById(id).rows;
		if (registros[i].cells[6].innerHTML<"1"){
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
function retiraSabados(){
	var tabla = document.getElementById("regs");
	totalColumnas--;
	for (var i=0;i<tabla.rows.length;i++){
		tabla.rows[i].deleteCell(10);
	}
}
function horarioDirecto(){
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
function tablaAtajos(){
	var seccionAtajos = document.createElement("div");
	seccionAtajos.setAttribute("id","seccionAtajos");
	seccionAtajos.setAttribute("style","display:none; position: fixed; background-color: maroon; color: white; top: 10%; left: 50%; opacity: 0.85; z-index: 1; font-size: 17px; width:290px; margin: 0px 0px 0px -145px; -moz-box-shadow: 0 0 5px 5px #888; -webkit-box-shadow: 0 0 20px 5px#000; box-shadow: 0 0 20px 5px #000;");
	// document.getElementById("mensajeAtajos").parentNode.insertBefore(seccionAtajos,document.getElementById("mensajeAtajos"));
	document.body.appendChild(seccionAtajos);
	chrome.extension.sendMessage( { command : "getAtajos" }, function(respuesta){
		var seccionAtajos 		= document.getElementById("seccionAtajos");
		seccionAtajos.innerHTML = "<table style='border-collapse: collapse; width:100%;'></table>";
		var contenidoAtajos 	= "<tr style='background-color:#000;'><td style='padding:0px 10px 0px 10px;'>Atajo</td><td style='padding:0px 10px 0px 10px;'>Secci&oacute;n</td></tr>";
		var teclaAtajo 	= 48;
		ultimoAtajo 	= respuesta.atajos.atajo.length;
		for (var i=0; i<ultimoAtajo; i++){
			if (respuesta.atajos.atajo[i].visible){
				if (teclaAtajo>57 && teclaAtajo<66){
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
function inicio(){
	var pagina 	= /^https\:\/\/www[.]saes[.]\w+[.]ipn[.]mx$/;
	var url 	= location.protocol+"//"+location.host;
	if (url.match(pagina) && location.pathname.indexOf("/PDF/")!=0){
		valida(1);
		creaFlujo();
		tablaAtajos();
		window.addEventListener("keyup",atajosEjecucion,true);
		ajustarDisenio();
		detectaPantalla();
	}
}
inicio();