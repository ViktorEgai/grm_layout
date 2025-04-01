$(document).ready(function () {
	let newsTitleMaxHeight = 0;
	$(".news-item__title").each(function () {
		if ($(this).height() > newsTitleMaxHeight) {
			newsTitleMaxHeight = $(this).height();
		}
	});
	$(".news-item__title").css("height", newsTitleMaxHeight);
	$(window).resize(function () {
		$(".news-item__title").css("height", newsTitleMaxHeight);
	});

	$(document).on("click", 'a[href="#event-popup"]', function () {
		let event_title = $(this).data("title");
		console.log("Клик по кнопке регистрации:", event_title);

		$('[name="event_name"]').val(event_title);
	});
});
