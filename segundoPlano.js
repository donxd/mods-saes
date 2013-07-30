var version = 0.54;
function log(mensaje){
	console.log (mensaje);
}
chrome.runtime.onInstalled.addListener(function() {
	log("-> Instalado");
});
chrome.extension.onMessage.addListener (
	function (request, sender, callback) {
		switch (request.command){
			case "getVersion":
				callback({
					version : version
				});
				break;
			case "getDatos":
				var autoIdentificar = true;
				if (localStorage.autoIdentificar == undefined){
					autoIdentificar = false;
				}
				callback({
					command 	: request.command,
					escuela		: localStorage.escuela,
					boleta 		: localStorage.boleta,
					pass 		: localStorage.pass,
					identificar : autoIdentificar
				});
				break;
			case "setDatos":
				localStorage.escuela 			= request.escuela;
				localStorage.boleta 			= request.boleta;
				localStorage.pass 				= request.pass;
				localStorage.autoIdentificar	= request.identificar;
				callback({
					command 	: request.command,
					identificar : request.identificar,
					guardado 	: true
				});
				break;
			case "getAtajos":
			 	var opcionesAtajos;
				if(localStorage.atajos!=null && localStorage.atajos!=""){
					opcionesAtajos = JSON.parse(localStorage.atajos);
				} else {
					opcionesAtajos = { atajo : [
						{ nombre : "Iniciar/Cerrar Sesi&oacute;n", 		visible : true, url : "login" },
						{ nombre : "Calificaciones del Semestre", 		visible : true, url : "/Alumnos/Informacion_semestral/calificaciones_sem.aspx" },
						{ nombre : "K&aacute;rdex",						visible : true, url : "/Alumnos/boleta/kardex.aspx" },
						{ nombre : "Estado General",					visible : true, url : "/Alumnos/boleta/Estado_Alumno.aspx" },
						{ nombre : "Calificaciones de ETS",  			visible : true, url : "/Alumnos/ETS/calificaciones_ets.aspx" },
						{ nombre : "Inscribir de ETS",  				visible : true, url : "/Alumnos/ETS/inscripcion_ets.aspx" },
						{ nombre : "Horario",  							visible : true, url : "/Alumnos/Informacion_semestral/Horario_Alumno.aspx" },
						{ nombre : "Dictamen",  						visible : true, url : "/Alumnos/Dictamenes/respuesta_dictamen.aspx" },
						{ nombre : "Solicitud de Dictamen",  			visible : true, url : "/Alumnos/Dictamenes/Candidato.aspx" },
						{ nombre : "Cita de Reinscripci&oacute;n", 		visible : true, url : "/Alumnos/Reinscripciones/fichas_reinscripcion.aspx" },
						{ nombre : "Reinscripci&oacute;n", 				visible : true, url : "/Alumnos/Reinscripciones/reinscribir.aspx" },
						{ nombre : "Comprobante de Horario", 			visible : true, url : "/Alumnos/Reinscripciones/Comprobante_Horario.aspx" },
						{ nombre : "Evaluaci&oacute;n de Profesores",	visible : true, url : "/Alumnos/Evaluacion_docente/califica_profe.aspx" },
						{ nombre : "Horarios Disponibles",				visible : true, url : "/Academica/horarios.aspx" },
						{ nombre : "Ocupabilidad",						visible : true, url : "/Academica/Ocupabilidad_grupos.aspx" },
						{ nombre : "Equivalencias",						visible : true, url : "/Academica/Equivalencias.aspx" },
					] };
					localStorage.atajos = JSON.stringify(opcionesAtajos);
				}
				callback({
					command 	: request.command,
					atajos 		: opcionesAtajos
				});
				break;
			case "setAtajos":
				opcionesAtajos = JSON.parse(localStorage.atajos);
				opcionesAtajos.atajos[request.posicion].visible = request.visible;
				break;
			default:
				callback({});
				break;
		}
	}
);
chrome.runtime.onSuspend.addListener(function() {
	log("Descansando....");
});