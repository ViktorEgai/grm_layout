$(document).ready(function () {
	const searchBtn = $(" #search-popup .search-form__btn");
	const searchClear = $(" #search-popup .search-form__clear");
	const searchResult = $("#search-result");

	searchResult.hide();

	$("#search-popup input").on("input", function () {
		if ($(this).val() !== "") {
			searchBtn.hide();
			searchClear.show();
			searchResult.show();
		} else {
			searchBtn.show();
			searchClear.hide();
			searchResult.hide();
		}

		// if ($(this).val().length > 2) {
		//   $.ajax({
		// 	url: "/index.php" /* Куда отправить запрос */,
		// 	method: "post" /* Метод запроса (post или get) */,
		// 	dataType: "html" /* Тип данных в ответе (xml, json, script, html). */,
		// 	data: { text: "Текст" } /* Данные передаваемые в массиве */,
		// 	success: function (data) {

		// 			searchResult.show();
		// 	},
		// });
		// }
	});
});
