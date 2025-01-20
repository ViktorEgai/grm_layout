$(document).ready(function () {
	function tabs(navItems, contentItems) {
		$(navItems).eq(0).addClass("active");
		$(contentItems).eq(0).addClass("active");

		$(navItems).on("click", function (e) {
			e.preventDefault();
			let index = $(this).index();
			$(this).addClass("active").siblings().removeClass("active");

			$(contentItems).eq(index).addClass("active").siblings().removeClass("active");
		});
	}
	tabs(".news-tabs-nav__item", ".news-tabs-content-list");
});
