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
		if ($(window).width() < 768) {
			$(".info-item-services").after($(".about"));
		} else {
			$(".info").after($(".about"));
		}
	});
	$(".cards-item__link").on("click", function (e) {
		e.preventDefault();

		$(this).closest(".cards-item").toggleClass("active");

		if ($(this).closest(".cards-item").hasClass("active")) {
			$(this).text("Свернуть");
		} else {
			$(this).text("Развернуть");
		}
	});

	$(".dropdown-item__title").on("click", function () {
		$(this).next().slideToggle();
	});
	function AOSAnimation() {
		$(".section-title, .dropdown-item").attr("data-aos", "fade-right");
		$(".hero-left, #map").attr("data-aos", "fade-right");
		$(".map-block__form").attr("data-aos", "fade-left");
		$(".stories, .about-slider").attr("data-aos", "fade-down");

		setTimeout(function () {
			AOS.init({
				once: true,
				duration: 1000,
			});
		}, 200);
	}
	AOSAnimation();
});
