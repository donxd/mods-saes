// var segundoPlano = chrome.extension.getBackgroundPage();
function guarda (){
	// localStorage["boleta"]=document.getElementById("boleta").value;
	// localStorage["pass"]=document.getElementById("pass").value;
	// localStorage["autoIdentificar"]="true";
	var boleta  = document.getElementById("boleta").value;
	var pass 	= document.getElementById("pass").value;
	var esc 	= "www.saes."+document.getElementById("esc").value+".ipn.mx";
	chrome.extension.sendMessage( { command : "setDatos", escuela : esc, boleta : boleta, pass: pass, identificar: true}, function(){
		document.getElementById("borrar").setAttribute("style","display:inline;");
		// segundoPlano.location.reload();
		document.getElementById("ok").setAttribute("style","display:inline;");
		setTimeout(desvanecer,2000);
	});
}
function desvanecer (){
	document.getElementById("ok").setAttribute("style","display:none;");
}
function limpiar (){
	// localStorage["boleta"]="";
	// localStorage["pass"]="";
	// localStorage["autoIdentificar"]="false";
	chrome.extension.sendMessage( { command : "setDatos", escuela : "", boleta : "", pass: "", identificar: false}, function(){
		document.getElementById("borrar").setAttribute("style","display:none;");
	});
}
function cargaDatos (){
	chrome.extension.sendMessage( { command : "getDatos"}, function(respuesta){
		if (respuesta.identificar != false){
			document.getElementById("boleta").value = respuesta.boleta;
			document.getElementById("pass").value  	= respuesta.pass;
			document.getElementById("esc").value 	= respuesta.escuela.substring(9,respuesta.escuela.lastIndexOf(".ipn"));
			document.getElementById("borrar").setAttribute("style","display:inline;");
		}
	});	

	// if(localStorage["autoIdentificar"]!=null&&localStorage["autoIdentificar"]!="false"){
	// 	document.getElementById("boleta").value=localStorage["boleta"];
	// 	document.getElementById("pass").value=localStorage["pass"];
	// 	document.getElementById("borrar").setAttribute("style","display:inline;");
	// }
}
// chrome.extension.sendMessage({command : "getAtajos"}, function(respuesta){
// 	var teclaAtajo = 48;
// 	for(var i=0; i<respuesta.atajos.length; i++){
// 		if(respuesta.atajos[i].visible){
// 			if(teclaAtajo>57){
// 				teclaAtajo =  65;
// 			}
// 			seccionAtajos.insertRow(i+1);
// 			seccionAtajos.rows[i+1].insertCell(0);
// 			seccionAtajos.rows[i+1].insertCell(1);
// 			seccionAtajos.rows[i+1].cells[0].innerHTML = String.fromCharCode(teclaAtajo);
// 			seccionAtajos.rows[i+1].cells[1].innerHTML = respuesta.atajos[i].nombre;
// 			teclaAtajo++;
// 		}
// 	}
// 	respuesta.atajos
// });
function guardar (){
	guarda();
	return false;
}
window.onload = function (){
	cargaDatos();
	document.getElementById("identificacion").addEventListener("submit",guardar,true);
	document.getElementById("identificacion").addEventListener("reset",limpiar,true);
};