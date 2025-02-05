jQuery(document).ready(function ($) {
	$("input[type=tel]").inputmask("+7 999 999 99 99");
	$("[data-fancybox]").fancybox({
		autoFocus: false,
		touch: false,
	});

	if ($(window).width() < 992) {
		$(".info-item-services").after($(".about"));
		$(".single-vakancy-card").after($(".agent"));
		$(".calendar-wrapper").after($(".calendar__btn"));
		$(".tarif-slider").before($(".tarif__title"));
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

	$(".header-mobile-submenu, .header-submenu").prev().append(`<span class="arrow"><svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.3333 1L5.66667 5.66667L1 1" stroke="white" stroke-opacity="0.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
</span>`);
	$(".header-submenu").parents(".header-menu__item").addClass("has-children");

	$(".has-children").each(function () {
		const userBlock = $(".header-user-block");

		$(this).append(userBlock);
	});
	$(".header-menu-btn").on("click", function () {
		$(".header-mobile-nav").slideToggle();
		$(this).toggleClass("active");
		$("body").toggleClass("overflow");
	});
	$(".header-mobile-menu__item .arrow").on("click", function (e) {
		e.preventDefault();
		$(this).closest(".header-mobile-menu__item").toggleClass("active");
		$(this).parent().next().slideToggle();
		$(this).toggleClass("active");
	});
});
