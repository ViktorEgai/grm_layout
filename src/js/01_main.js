jQuery(document).ready(function ($) {
	$("input[type=tel]").inputmask("+7 999 999 99 99");
	$("[data-fancybox]").fancybox({
		autoFocus: false,
		touch: false,
	});

	if ($(window).width() < 992) {
		$(".info-item-services").after($(".about"));
		$(".single-vakancy-card").after($(".agent"));
	} else {
		$(".info").after($(".about"));
		$(".sidebar-banner").before($(".agent"));
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

	function AOSAnimation() {
		$(".section-title, .dropdown-item, .stories, .about-slider, .top__title, .top__text ").attr("data-aos", "fade-right");
		$(".hero-left, #map, .content-block-left, .agent-list-item").attr("data-aos", "fade-right");
		$(".map-block-right, .map-block-contacts, .sidebar").attr("data-aos", "fade-left");
		$(".sertificates-grid-item, .gallery-grid-item").attr("data-aos", "fade-up");
		$(".vakancy-card:not(.skip), .documents-block").each(function (index, item) {
			if (index % 2 == 0) {
				$(this).parent().attr("data-aos", "fade-right");
			} else {
				$(this).parent().attr("data-aos", "fade-left");
			}
		});

		setTimeout(function () {
			AOS.init({
				once: true,
				duration: 1600,
			});
		}, 200);
	}
	AOSAnimation();
});
