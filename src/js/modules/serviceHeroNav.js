$(document).ready(function () {
	if ($(window).width() > 992) {
		let submenuheight = 0;
		$(".service-hero-submenu").each(function (index) {
			let id = "submenu-" + (index + 1);

			$(this).parent().attr("data-id", id);

			$(this).attr("id", id);

			$(this).prev().append(`<span class="arrow"><svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.3333 1L5.66667 5.66667L1 1" stroke="white" stroke-opacity="0.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
</span>`);
			$(this).parent().addClass("has-submenu");
			submenuheight = $(this).outerHeight() > submenuheight ? $(this).outerHeight() : submenuheight;
		});
		$(".service-hero-nav").css("--height", $(".service-hero-nav").outerHeight() + "px");
		$(".service-hero-nav").css("--hover-height", $(".service-hero-nav").outerHeight() + submenuheight + "px");
	} else {
		$(".service-hero-submenu").each(function (index) {
			let id = "submenu-" + (index + 1);

			$(this).parent().attr("data-id", id);

			$(this).attr("id", id);

			$(".service-hero-menu").after($(this));
			$(this).hide();
		});
		$(".service-hero-menu").clone().appendTo(".service-hero-nav").addClass("service-hero-menu-bottom").hide();

		function toggleMenu(main, clone) {
			$(main)
				.off("click", ".service-hero-menu__item")
				.on("click", ".service-hero-menu__item", function (e) {
					const id = $(this).data("id");
					const link = $(this).find("a");
					const index = $(this).index();
					const copyMenuLink = $(clone + " .service-hero-menu__item")
						.eq(index)
						.find("a");

					if (id) {
						e.preventDefault();

						if ($("#" + id).attr("style") == "display: block;") {
							$(".service-hero-submenu").hide();
							$(".service-hero-menu-bottom").hide();
							$(link).removeClass("active");
							copyMenuLink.removeClass("active");
						} else {
							$(".service-hero-submenu").hide();
							$(".service-hero-menu-bottom").show();
							$("#" + id).toggle();
							$(link).toggleClass("active");
							copyMenuLink.addClass("active");
						}
					}
				});
		}
		toggleMenu(".service-hero-menu-top", ".service-hero-menu-bottom");
		toggleMenu(".service-hero-menu-bottom", ".service-hero-menu-top");

		let isSyncingScroll = false;

		$(".service-hero-menu-top, .service-hero-menu-bottom").on("scroll", function () {
			if (!isSyncingScroll) {
				isSyncingScroll = true;
				let scrollLeft = $(this).scrollLeft();
				$(".service-hero-menu-top, .service-hero-menu-bottom").not(this).scrollLeft(scrollLeft);
				isSyncingScroll = false;
			}
		});
	}
});
