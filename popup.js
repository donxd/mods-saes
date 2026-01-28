window.onload = () => {
	generateDataTable();
	addEventSearch();
	getDataPopup();
}

function getDataPopup (){
	console.log('recovery data popup 1');
	const dataPopup = localStorage.getItem('searchPopup');
	// chrome.runtime.sendMessage( { command : "getDataPopup" }, (respuesta) => {
	// 	console.log('info sw : ', respuesta);
	// 	console.log('recovery data popup 3');
	// });
	// console.log('recovery data popup 2');
	if (dataPopup.length) {
		const controlSearch = document.querySelector("[name=search]");
		controlSearch.value = dataPopup;
		filterRows(dataPopup);
	} else {
		showAllRows();
	}
	console.log('recovery data popup 2 : dataPopup : ', dataPopup);
}

function generateDataTable () {
	const dataTable = document.querySelector('#regs');
	dataTable.innerHTML = getDataSchools();
}

function addEventSearch () {
	const controlSearch = document.querySelector("[name=search]");
	controlSearch.addEventListener('change', () => searchOption(controlSearch), true);
}

function searchOption (controlSearch) {
	const valueSearch = controlSearch.value;

	if (valueSearch.length ){
		filterRows(valueSearch);
	} else {
		showAllRows();
	}
	saveSearchPopup(valueSearch);
}

function saveSearchPopup (valueSearch) {
	console.log('saveSearchPopup init 1 ');
	// chrome.runtime.sendMessage( { command : "saveDataPopup", data: valueSearch }, (respuesta) => {
	// 	console.log('response save data 3 : ', respuesta);
	// });
	// if (valueSearch.length) {
		localStorage.setItem('searchPopup', valueSearch);
	// }
	console.log('saveSearchPopup end 2');
}

function filterRows (valueSearch) {
	// console.log('valueSearch : ', (valueSearch));
	Array.from(document.querySelectorAll('#regs tr:not(.hidden)'))
	.forEach(row => {
		// console.log('row text : ', (row.children[0].innerText));
		const rowValue = row.children[0].innerText.toLowerCase();
		valueSearch = valueSearch.toLowerCase();

		// if (!row.children[0].innerText.includes(valueSearch)) {
		if (!rowValue.includes(valueSearch)) {
			row.classList.add('hidden');
		} else {
			row.classList.remove('hidden');
		}
	});
}

function showAllRows () {
	Array.from(document.querySelectorAll('#regs tr.hidden'))
	.forEach(row => row.classList.remove('hidden'));
}

function getDataSchools () {
	const info = [
		{
			level : 'Superior',
			data: [
				{"link":"https://www.saes.cicsma.ipn.mx/", "icon": "https://ipn.mx/assets/files/saes/assets/uploads/cics_ma_1.png", "name": "CICS MILPA ALTA"},
				{"link":"https://www.saes.escasto.ipn.mx/", "icon": "https://ipn.mx/assets/files/saes/assets/uploads/esca_sto_1.png", "name": "ESCA SANTO TOMAS"},
				{"link":"https://www.saes.eseo.ipn.mx/", "icon": "https://ipn.mx/assets/files/saes/assets/uploads/eseo_1.png", "name": "ESEO"},
				{"link":"https://www.saes.esiaz.ipn.mx/", "icon": "https://ipn.mx/assets/files/saes/assets/uploads/esia_zac_1.png", "name": "ESIA ZAC"},
				{"link":"https://www.saes.esimez.ipn.mx/", "icon": "https://ipn.mx/assets/files/saes/assets/uploads/esime_zac_1.png", "name": "ESIME ZACATENCO"},
				{"link":"https://www.saes.est.ipn.mx/", "icon": "https://ipn.mx/assets/files/saes/assets/uploads/est_1.png", "name": "EST"},
				{"link":"https://www.saes.upiita.ipn.mx/", "icon": "https://ipn.mx/assets/files/saes/assets/uploads/upiita_1.png", "name": "UPIITA"},
				{"link":"https://www.saes.upiip.ipn.mx/", "icon": "https://ipn.mx/assets/files/saes/assets/uploads/upiiplogo_ch_1.png", "name": "UPIIP"},
				{"link":"https://www.saes.cicsst.ipn.mx/", "icon": "https://ipn.mx/assets/files/saes/assets/uploads/cics_ust_1.png", "name": "CICS UST"},
				{"link":"https://www.saes.escatep.ipn.mx/", "icon": "https://ipn.mx/assets/files/saes/assets/uploads/esca_tep_1.png", "name": "ESCA TEPEPAN"},
				{"link":"https://www.saes.esfm.ipn.mx/", "icon": "https://ipn.mx/assets/files/saes/assets/uploads/esfm_1.png", "name": "ESFM"},
				{"link":"https://www.saes.esimeazc.ipn.mx/", "icon": "https://ipn.mx/assets/files/saes/assets/uploads/esime_azc_1.png", "name": "ESIME AZCAPOTZALCO"},
				{"link":"https://www.saes.esiqie.ipn.mx/", "icon": "https://ipn.mx/assets/files/saes/assets/uploads/esiqie_1.png", "name": "ESIQIE"},
				{"link":"https://www.saes.upibi.ipn.mx/", "icon": "https://ipn.mx/assets/files/saes/assets/uploads/upiibi_1.png", "name": "UPIBI"},
				{"link":"https://www.saes.upiiz.ipn.mx/", "icon": "https://ipn.mx/assets/files/saes/assets/uploads/upiiz_1.png", "name": "UPIIZ"},
				{"link":"https://www.saes.upiic.ipn.mx/", "icon": "https://ipn.mx/assets/files/saes/assets/uploads/ipn_default_2_1.png", "name": "UPIIC"},
				{"link":"https://www.saes.encb.ipn.mx/", "icon": "https://ipn.mx/assets/files/saes/assets/uploads/encb_1.png", "name": "ENCB"},
				{"link":"https://www.saes.escom.ipn.mx/", "icon": "https://ipn.mx/assets/files/saes/assets/uploads/escom_1.png", "name": "ESCOM"},
				{"link":"https://www.saes.esiatec.ipn.mx/", "icon": "https://ipn.mx/assets/files/saes/assets/uploads/esia_tec_1.png", "name": "ESIA TECAMACHALCO"},
				{"link":"https://www.saes.esimecu.ipn.mx/", "icon": "https://ipn.mx/assets/files/saes/assets/uploads/esime_culh_1.png", "name": "ESIME CULHUACAN"},
				{"link":"https://www.saes.esit.ipn.mx/", "icon": "https://ipn.mx/assets/files/saes/assets/uploads/esit_1.png", "name": "ESIT"},
				{"link":"https://www.saes.upiicsa.ipn.mx/", "icon": "https://ipn.mx/assets/files/saes/assets/uploads/upiicsa_1.png", "name": "UPIICSA"},
				{"link":"https://www.saes.enba.ipn.mx/", "icon": "https://ipn.mx/assets/files/saes/assets/uploads/enba_1.png", "name": "ENBA"},
				{"link":"https://www.saes.upiem.ipn.mx/", "icon": "https://ipn.mx/assets/files/saes/assets/uploads/ipn_default_3_1.png", "name": "UPIEM"},
				{"link":"https://www.saes.enmh.ipn.mx/", "icon": "https://ipn.mx/assets/files/saes/assets/uploads/enmh_1.png", "name": "ENMH"},
				{"link":"https://www.saes.ese.ipn.mx/", "icon": "https://ipn.mx/assets/files/saes/assets/uploads/ese_1.png", "name": "ESE"},
				{"link":"https://www.saes.esiatic.ipn.mx/", "icon": "https://ipn.mx/assets/files/saes/assets/uploads/esia_tic_1.png", "name": "ESIA TICOMAN"},
				{"link":"https://www.saes.esimetic.ipn.mx/", "icon": "https://ipn.mx/assets/files/saes/assets/uploads/esime_tic_2.png", "name": "ESIME TICOMAN"},
				{"link":"https://www.saes.esm.ipn.mx/", "icon": "https://ipn.mx/assets/files/saes/assets/uploads/esm_1.png", "name": "ESM"},
				{"link":"https://www.saes.upiig.ipn.mx/", "icon": "https://ipn.mx/assets/files/saes/assets/uploads/upiig_1.png", "name": "UPIIG"},
				{"link":"https://www.saes.upiih.ipn.mx/", "icon": "https://ipn.mx/assets/files/saes/assets/uploads/ipn_default_1_2.png", "name": "UPIIH"},
				{"link":"https://www.saes.upiit.ipn.mx/", "icon": "https://ipn.mx/assets/files/saes/assets/uploads/ipn_default_4_1.png", "name": "UPIIT"}
			]
		},
		{
			level : 'Medio',
			data: [
				{"link":"https://www.saes.cecyt1.ipn.mx/", "icon": "https://ipn.mx/assets/files/saes/assets/uploads/cecyt1.png", "name": "CECyT 1"},
				{"link":"https://www.saes.cecyt5.ipn.mx/", "icon": "https://ipn.mx/assets/files/saes/assets/uploads/cecyt5.png", "name": "CECyT 5"},
				{"link":"https://www.saes.cecyt9.ipn.mx/", "icon": "https://ipn.mx/assets/files/saes/assets/uploads/cecyt9.png", "name": "CECyT 9"},
				{"link":"https://www.saes.cecyt13.ipn.mx/", "icon": "https://ipn.mx/assets/files/saes/assets/uploads/cecyt13.png", "name": "CECyT 13"},
				{"link":"https://www.saes.cecyt17.ipn.mx/", "icon": "https://ipn.mx/assets/files/saes/assets/uploads/cecyt17.png", "name": "CECyT 17"},
				{"link":"https://www.saes.cecyt2.ipn.mx/", "icon": "https://ipn.mx/assets/files/saes/assets/uploads/cecyt2.png", "name": "CECyT 2"},
				{"link":"https://www.saes.cecyt6.ipn.mx/", "icon": "https://ipn.mx/assets/files/saes/assets/uploads/cecyt6.png", "name": "CECyT 6"},
				{"link":"https://www.saes.cecyt10.ipn.mx/", "icon": "https://ipn.mx/assets/files/saes/assets/uploads/cecyt10.png", "name": "CECyT 10"},
				{"link":"https://www.saes.cecyt14.ipn.mx/", "icon": "https://ipn.mx/assets/files/saes/assets/uploads/cecyt14.png", "name": "CECyT 14"},
				{"link":"https://www.saes.cecyt18.ipn.mx/", "icon": "https://ipn.mx/assets/files/saes/assets/uploads/ipn_default.png", "name": "CECyT 18"},
				{"link":"http://www.saes.cecyt3.ipn.mx/", "icon": "https://ipn.mx/assets/files/saes/assets/uploads/cecyt3.png", "name": "CECyT 3"},
				{"link":"https://www.saes.cecyt7.ipn.mx/", "icon": "https://ipn.mx/assets/files/saes/assets/uploads/cecyt7.png", "name": "CECyT 7"},
				{"link":"https://www.saes.cecyt11.ipn.mx/", "icon": "https://ipn.mx/assets/files/saes/assets/uploads/cecyt11.png", "name": "CECyT 11"},
				{"link":"https://www.saes.cecyt15.ipn.mx/", "icon": "https://ipn.mx/assets/files/saes/assets/uploads/cecyt15.png", "name": "CECyT 15"},
				{"link":"https://www.saes.cecyt19.ipn.mx/", "icon": "https://ipn.mx/assets/files/saes/assets/uploads/ipn_default_1.png", "name": "CECyT 19"},
				{"link":"http://www.saes.cecyt4.ipn.mx/", "icon": "https://ipn.mx/assets/files/saes/assets/uploads/cecyt4.png", "name": "CECyT 4"},
				{"link":"https://www.saes.cecyt8.ipn.mx/", "icon": "https://ipn.mx/assets/files/saes/assets/uploads/cecyt8.png", "name": "CECyT 8"},
				{"link":"https://www.saes.cecyt12.ipn.mx/", "icon": "https://ipn.mx/assets/files/saes/assets/uploads/cecyt12.png", "name": "CECyT 12"},
				{"link":"https://www.saes.cecyt16.ipn.mx/", "icon": "https://ipn.mx/assets/files/saes/assets/uploads/cecyt16.png", "name": "CECyT 16"},
				{"link":"https://www.saes.cet1.ipn.mx/", "icon": "https://ipn.mx/assets/files/saes/assets/uploads/cet1.png", "name": "CET 1"}
			]
		},
	];
	let data = info.map(level => {
		let dataLevel = `
		<details open>
			<summary>
				<span class="level">Nivel ${level.level}</span>
			</summary>
			<table>${getDataLevel(level)}</table>
		</details>`;

		return dataLevel;
	}).join('');

	return data;
}

function getDataLevel (level) {
	return level.data.map(school => {
		let dataSchool = '';

		dataSchool = `<tr>
			<td>
				<a href="${school.link}" target="_blank">
					<img src="${school.icon}" title="${school.name}"/> ${school.name}
				</a>
			</td>
		</tr>`;

		return dataSchool;
	}).join('');
}