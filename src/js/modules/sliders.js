$(document).ready(function () {
	const arrowRight = `<button class="next"><img src="/static/img/icons/arrow-right.svg" data-src></button>`;
	const arrowLeft = `<button class="prev"><img src="/static/img/icons/arrow-left.svg" data-src></button>`;

	$(".stories-slider").slick({
		dots: true,
		infinite: true,
		speed: 300,

		arrows: true,
		prevArrow: arrowLeft,
		nextArrow: arrowRight,
		slidesToShow: 4,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
					infinite: true,
					dots: true,
					speed: 1000,
					autoplaySpeed: 4000,
					autoplay: true,
					arrows: false,
					cssEase: "linear",
				},
			},
		],
	});
	$(".services-slider").slick({
		dots: false,
		infinite: true,
		speed: 2000,
		autoplaySpeed: 10,
		autoplay: true,
		arrows: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		centerMode: true,
		variableWidth: true,
		cssEase: "linear",
	});
	$(".about-slider").slick({
		dots: true,
		infinite: false,
		speed: 300,
		arrows: false,
		fade: false,
		slidesToShow: 1,
		slidesToScroll: 1,
	});
	$(".news-slider").slick({
		dots: true,
		infinite: false,
		speed: 300,
		arrows: false,
		slidesToShow: 3,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 9999,
				settings: "unslick",
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
					dots: true,
				},
			},
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					dots: true,
				},
			},
		],
	});
	$(".vakancy-cards-slider").slick({
		dots: true,
		infinite: false,
		speed: 300,
		arrows: false,
		slidesToShow: 3,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 9999,
				settings: "unslick",
			},

			{
				breakpoint: 576,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					dots: true,
				},
			},
		],
	});
	$(".comitet-members-slider").slick({
		dots: true,
		infinite: false,
		speed: 300,
		arrows: false,
		slidesToShow: 2,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					dots: true,
				},
			},
		],
	});
	$(".member-cards-slider").slick({
		dots: true,
		infinite: false,
		speed: 300,
		arrows: false,
		slidesToShow: 2,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					dots: true,
				},
			},
		],
	});
	$(".tarif-slider").slick({
		dots: true,
		infinite: false,
		speed: 300,
		arrows: false,
		slidesToShow: 2,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					dots: true,
				},
			},
		],
	});
	$(".service-hero-sliders").removeClass("d-none");
	$(".service-hero-slider").each(function (index) {
		let $args = {
			dots: false,
			infinite: true,
			speed: 5000,
			autoplaySpeed: 10,
			autoplay: true,
			arrows: false,
			slidesToShow: 1,
			slidesToScroll: 1,
			centerMode: true,
			variableWidth: true,
			cssEase: "linear",
		};
		if (index % 2 !== 0) {
			$args["rtl"] = true;
			$(this).attr("dir", "rtl");
		}

		$(this).slick($args);
	});

	$(".service-hero-partners-slider").slick({
		dots: false,
		infinite: true,
		speed: 5000,
		autoplaySpeed: 10,
		autoplay: true,
		arrows: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		centerMode: true,
		variableWidth: true,
		cssEase: "linear",
	});
});
