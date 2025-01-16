$(document).ready(function () {
	$(".stories-slider").slick({
		dots: true,
		infinite: true,
		speed: 300,
		arrows: false,
		slidesToShow: 4,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
					infinite: true,
					dots: true,
				},
			},
		],
	});
	$(".services-slider").slick({
		dots: false,
		infinite: true,
		speed: 300,
		autoplaySpeed: 3000,
		autoplay: true,
		arrows: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		centerMode: true,
		variableWidth: true,
	});
	$(".about-slider").slick({
		dots: true,
		infinite: false,
		speed: 300,
		arrows: false,
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
				breakpoint: 1200,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
					infinite: true,
					dots: true,
				},
			},
		],
	});
});
