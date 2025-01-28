jQuery(document).ready(function ($) {
	$("input[type=tel]").inputmask("+7 999 999 99 99");
	$("[data-fancybox]").fancybox({
		autoFocus: false,
		touch: false,
	});

	if ($(window).width() < 992) {
		$(".info-item-services").after($(".about"));
		$(".single-vakancy-card").after($(".agent"));

		// toggle widget
		$(".widget__logo").on("click", function (e) {
			e.preventDefault();
			$(".widget-block").slideToggle();
			$(".widget-block").toggleClass("active");
		});
	} else {
		$(".info").after($(".about"));
		$(".sidebar-banner").before($(".agent"));

		// toggle widget
		$(".widget__logo").on("mouseenter", function () {
			$(".widget-block").slideDown();
		});
		$(".widget").on("mouseleave", function () {
			$(".widget-block").slideUp();
		});
	}
	$(window).resize(function () {
		if ($(window).width() < 992) {
			$(".info-item-services").after($(".about"));
			$(".single-vakancy-card").after($(".agent"));
		} else {
			$(".info").after($(".about"));
			$(".sidebar-banner").before($(".agent"));
		}
	});
	$(".cards-item__link").on("click", function (e) {
		e.preventDefault();

		$(this).closest(".cards-item").toggleClass("active");
	});
	$(".cards-item-close").on("click", function (e) {
		e.preventDefault();

		$(this).closest(".cards-item").toggleClass("active");
	});

	$(".dropdown-item__title").on("click", function () {
		$(this).next().slideToggle();
	});
});
