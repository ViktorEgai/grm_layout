$(document).ready(function () {
	$(".scroll").each(function () {
		new SimpleBar($(this)[0]);
	});

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

	$(".cards-item").each(function () {
		$(this).data("hoverToggle", false);
	});

	$(".cards-item").on("mouseenter", function () {
		if ($(this).find(".cards-item-back").length > 0) {
			console.log($(this).find(".cards-item-back"));

			let toggle = $(this).data("hoverToggle");

			if (toggle) {
				$(this).removeClass("active");
			} else {
				$(this).addClass("active");
			}

			$(this).data("hoverToggle", !toggle);
		}
	});

	$(".baza-item-slider").slick({
		speed: 300,
		arrows: false,
		slidesToShow: 3,
		slidesToScroll: 1,
		responsive: [
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
	$(".playlist-video-descr-top__more ").on("click", function () {
		$(this).parents(".playlist-video-descr").find(".playlist-video-descr__text").slideToggle();

		$(this).hide();
	});
	$(".rieltor-card-content__text").each(function () {
		// Находим все элементы внутри текущего контейнера
		var elements = $(this).children();

		// Скрываем все элементы кроме первого
		elements.not(":first").hide();

		// Добавляем кнопку "Читать полностью", если есть скрытые элементы
		if (elements.length > 1) {
			var readMoreBtn = $('<a href="#" class="rieltor-card-content__read-all">Читать полностью</a>');
			$(this).append(readMoreBtn);

			// Обработчик клика на кнопку
			readMoreBtn.click(function (e) {
				e.preventDefault();

				if ($(this).text() === "Читать полностью") {
					elements.show();
					$(this).text("Свернуть");
				} else {
					elements.not(":first").hide();
					$(this).text("Читать полностью");
				}
			});
		}
	});

	if ($(".rieltor-card__tag").length > 12) {
		$(".rieltor-card__tag:gt(11)").hide();

		// Добавляем кнопку "Ещё"
		$(".rieltor-card-tags").append('<div class="rieltor-card-tags__more">Ещё</div>');

		// Обработчик клика на кнопку "Ещё"
		$(".rieltor-card-tags").on("click", ".rieltor-card-tags__more", function () {
			// Проверяем текущее состояние
			if ($(this).text() === "Ещё") {
				// Показываем все скрытые теги
				$(".rieltor-card__tag:hidden").show();
				$(this).text("Свернуть");
			} else {
				// Снова скрываем теги, начиная с 13-го
				$(".rieltor-card__tag:gt(11)").hide();
				$(this).text("Ещё");
			}
		});
	}
	if ($(window).width() < 992) {
		$(".rieltor-card-col:last-child").append($(".rieltor-card-buttons"));
		$(".rieltor-card-col:first-child").prepend($(".agent-title"));
	}
	$(".await .programs-card__link").text("Ожидание");

	$(".reviews-nav__item").on("click", function () {
		$(".reviews-block.active .slick-slider").slick("setPosition", 0);
	});

	function toggleReviewMessage() {
		if ($("#video_review").is(":checked")) {
			$("#text_message").hide();
			$("#video_message").show();
			console.log(1);
		} else {
			$("#text_message").show();
			$("#video_message").hide();
		}
	}
	toggleReviewMessage();
	$("#video_review").on("change", toggleReviewMessage);

	$(".booking-btn").on("click", function () {
		const parentBlock = $(this).parents(".schedule-item");
		let name = parentBlock.find(".schedule-item__name").text();
		let date = parentBlock.find(".schedule-item__date").text();
		let week = parentBlock.find(".schedule-item__time .week").text();
		let hours = parentBlock.find(".schedule-item__time .time").text();
		let theme = parentBlock.find(".schedule-item__title").text();
		let time = `${date} (${week}) ${hours}`;
		$("#speaker-name").text(name);
		$("#speaker-time").text(time);
		$("#speaker-theme").text(theme);
		$("[name='speaker-name']").val(name);
		$("[name='speaker-time']").val(time);
		$("[name='speaker-theme']").val(theme);
	});

	$(".speaker-btn").on("click", function () {
		const data = $(this).data("speaker");
		console.log(typeof data);

		const html = `<div class="row">
						<div class="col-sm-6">
							<div class="speaker-popup__image">
								<img src="${data.image}" alt="" />
							</div>
						</div>
						<div class="col-sm-6">
							<div class="speaker-popup-info">
								<div class="speaker-popup__date">${data.date}</div>
								<div class="speaker-popup__time">${data.time}</div>

								<div class="speaker-popup-content">
									<div class="speaker-popup__name">${data.name}</div>
									${data.content}
								</div>
							</div>
						</div>
					</div>`;
		$(".speaker-popup-wrapper").html(html);
	});
});
