jQuery(document).ready(function ($) {
	$("[data-fancybox]").fancybox({
		autoFocus: false,
		touch: false,
	});

	if ($(window).width() < 768) {
		$(".info-item-services").after($(".about"));
	} else {
		$(".info").after($(".about"));
	}
	$(window).resize(function () {
		if ($(window).width() < 992) {
			$(".info-item-services").after($(".about"));
		} else {
			$(".info").after($(".about"));
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
		$(".hero-left, #map").attr("data-aos", "fade-right");
		$(".map-block__form").attr("data-aos", "fade-left");
		$(".sertificates-grid-item, .gallery-grid-item").attr("data-aos", "fade-up");
		$(".vakancy-card, .documents-block").each(function (index, item) {
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
