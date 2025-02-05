$(document).ready(function () {
	$(".search-form-result").hide();
	$(".search-form input").on("input", function () {
		const searchBtn = $(this).parents(".search-form").find(".search-form__btn");
		const searchClear = $(this).parents(".search-form").find(".search-form__clear");
		const searchResult = $(this).parents(".search-form").find(".search-form-result");
		const searchForm = $(this).parents(".search-form");

		if ($(this).val() !== "") {
			searchBtn.hide();
			searchClear.show();
			searchResult.show();
			searchForm.addClass("active");
		} else {
			searchBtn.show();
			searchClear.hide();
			searchResult.hide();
			searchForm.removeClass("active");
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

	$(".search-form__clear").on("click", function () {
		const searchResult = $(this).parents(".search-form").find(".search-form-result");
		const searchBtn = $(this).parents(".search-form").find(".search-form__btn");

		const searchForm = $(this).parents(".search-form");
		$(this).hide();
		$(this).parents(".search-form").find("input").val("");

		searchResult.hide();
		searchBtn.show();
		searchForm.removeClass("active");
	});
});
