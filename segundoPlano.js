var version = 0.64;
function log (mensaje){
	console.log (mensaje);
}
chrome.runtime.onInstalled.addListener(function() {
	log("-> Instalado");
});
chrome.extension.onMessage.addListener(
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
				if (request.identificar){
					localStorage.escuela 			= request.escuela;
					localStorage.boleta 			= request.boleta;
					localStorage.pass 				= request.pass;
					localStorage.autoIdentificar	= request.identificar;
				} else {
					localStorage.removeItem("escuela");
					localStorage.removeItem("boleta");
					localStorage.removeItem("pass");
					localStorage.removeItem("autoIdentificar");
				}
				callback({
					command 	: request.command,
					identificar : request.identificar,
					guardado 	: true
				});
				break;
			case "getAtajos":
			 	var opcionesAtajos;
				if (localStorage.atajos != null && localStorage.atajos != ""){
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
			case "setEvaluacionProfesores":
				localStorage.calificacion = JSON.stringify(request.calificacion);
				localStorage.profesores = JSON.stringify(request.profesores);
				callback({});
				break;
			case "getEvaluacionProfesores":
				if (!(localStorage.calificacion != null && localStorage.calificacion != "")){
					localStorage.calificacion = "";
					localStorage.profesores = "[]";
				}
				callback({
					calificacion : JSON.parse(localStorage.calificacion),
					profesores : JSON.parse(localStorage.profesores)
				});
				break;		
			default:
				callback({});
				break;
		}
	}
);
chrome.extension.onConnect.addListener(function (port) {
	// console.assert(port.name == "msg");
	port.onMessage.addListener(function (data) {
		switch (data.method){
			case "exportar":
				var contextData = { port: port, datos : data.datos };
				generaArchivo(contextData);
				break;
			case "limpiar":
				limpiaRespaldo();
		}
		/*
		if (data.method == 'exportar') {
			var contextData = { port: port, datos : data.datos };
			generaArchivo(contextData);
		}
		*/
	});
});
function limpiaRespaldo (){
	var errorHandler = function errorHandler (){
		console.log("Error limpiando el archivo.");
	}
	window.webkitRequestFileSystem(window.TEMPORARY, 100*1024 /*10KB*/,
		function (fs){
			// //leyendo
			// fs.root.getFile('log.txt', {}, function (fileEntry){
			// 	fileEntry.file(function(file) {
			// 		var reader = new FileReader();
			// 		reader.onloadend = function(e) {
			// 			var txtArea = document.createElement('textarea');
			// 			txtArea.value = this.result;
			// 			document.body.appendChild(txtArea);
			// 		};
			// 		reader.readAsText(file);
			// 	}, errorHandler);
			// }, errorHandler);

			fs.root.getFile('log.txt', { create : false }, function (fileEntry){
				fileEntry.remove(function (){
					log('File removed.');
				}, errorHandler);
			}, errorHandler);
		}, errorHandler
	);
}
function generaArchivo (contextData){
	creaArchivo(contextData, function (contextData) {
		enviaArchivo(contextData);
	});
}
function enviaArchivo(contextData) {
	var port = contextData.port;
	port.postMessage({ method : 'hecho', url : contextData.fileUrl });
}
function creaArchivo (contextData,callback){
	var errorHandler = function errorHandler (){
		log("Error en la creación del archivo.");
	}
	window.webkitRequestFileSystem(window.TEMPORARY, 100*1024 /*10KB*/,
		function (fs){
			fs.root.getFile('log.txt', { create: true }, function (fileEntry){
				fileEntry.createWriter(function (fileWriter){
					fileWriter.onwriteend = function (e){
						log('Archivo creado. «'+fileEntry.toURL()+'»');
						contextData.fileUrl = fileEntry.toURL();
						callback(contextData);
					};
				  	fileWriter.onerror = function (e){
						log('Error archivo: ' + e.toString());
				  	};
					var blob = new Blob([contextData.datos], {type: 'text/plain'});
					fileWriter.write(blob);
				}, errorHandler);
			}, errorHandler);
		}, errorHandler
	);
}
chrome.runtime.onSuspend.addListener(function() {
	log("Descansando....");
});