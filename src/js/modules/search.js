$(document).ready(function () {
	$(".search-form-result").hide();
	$(".search-form-result").html('<div class="search-form-result-list"></div>');
	$(".search-form input").on("input", function () {
		const searchBtn = $(this).parents(".search-form").find(".search-form__btn");
		const searchClear = $(this).parents(".search-form").find(".search-form__clear");
		const searchResult = $(this).parents(".search-form").find(".search-form-result");
		const searchResultList = $(this).parents(".search-form").find(".search-form-result .search-form-result-list");
		const searchForm = $(this).parents(".search-form");
		let query = $(this).val().trim();

		if (query.length > 2) {
			$.ajax({
				url: searchApiUrl,
				dataType: "json",
				success: function (data) {
					let results = filterResults(data, query);
					displayResults(results);
				},
			});
		} else {
			searchBtn.show();
			searchClear.hide();
			searchResult.hide();
			searchForm.removeClass("active");
		}

		function filterResults(data, query) {
			let regex = new RegExp(query, "i"); // Регулярное выражение для поиска
			return data.filter((item) => regex.test(item.title)); // Фильтрация по заголовку
		}

		function displayResults(results) {
			searchBtn.hide();
			searchClear.show();
			searchResult.show();
			searchForm.addClass("active");
			searchResultList.html("").show();

			if (results.length === 0) {
				searchResultList.html("").append("<p>Ничего не найдено</p>");
				return;
			}

			results.forEach((item) => {
				let resultItem = `
							<a href="${item.url}" class="search-form-result-item">
							<img src="/static/img/icons/search.svg" alt="" />
							<span>${item.title}</span>
						</a>
                 
            `;
				searchResultList.append(resultItem);
			});
		}
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
