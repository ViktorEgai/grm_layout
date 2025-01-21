$(document).ready(function () {
	function tabs(navItems, contentItems, hasBottomMenu = false, navBottomItems) {
		$(navItems).eq(0).addClass("active");
		$(contentItems).eq(0).addClass("active");

		$(navItems).on("click", function (e) {
			e.preventDefault();
			let index = $(this).index();
			$(this).addClass("active").siblings().removeClass("active");

			if (hasBottomMenu) {
				$(navBottomItems).eq(index).addClass("active").siblings().removeClass("active");
			}

			$(contentItems).eq(index).addClass("active").siblings().removeClass("active");
		});

		if (hasBottomMenu) {
			$(navBottomItems).eq(0).addClass("active");

			$(navBottomItems).on("click", function (e) {
				e.preventDefault();
				let index = $(this).index();
				$(this).addClass("active").siblings().removeClass("active");

				$(navItems).eq(index).trigger("click");
			});
		}
	}
	tabs(".news-tabs-nav__item", ".news-tabs-content-list");
	tabs(".members-nav-top .members-nav__item", ".members-content", true, ".members-nav-bottom .members-nav__item");
});
