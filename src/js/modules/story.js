$(document).ready(function () {
	$(".stories-slider__item").on("click", function (e) {
		e.preventDefault();

		var storyId = $(this).data("id"); // Получаем ID истории

		// Отправляем AJAX-запрос на сервер
		$.ajax({
			url: "ajax_stories.html", // Серверный обработчик
			// type: "POST",
			data: { id: storyId },
			dataType: "html",

			success: function (data) {
				if ($("#story-item-slider").hasClass("slick-initialized")) {
					$("#story-item-slider").slick("unslick");
				}

				$("#story-container").html(data); // Загружаем HTML

				$.fancybox.close(); // Закрываем прошлый Fancybox
				const arrowRight = `<button class="next"><img src="img/icons/arrow-right.svg" data-src></button>`;
				const arrowLeft = `<button class="prev"><img src="img/icons/arrow-left.svg" data-src></button>`;
				$.fancybox.open({
					src: "#story-popup",
					type: "inline",
					touch: false,
					beforeShow: function () {
						// Убираем autoplay при переключении на видео
						$("#story-item-slider").on("init", function () {
							setTimeout(() => {
								$("#story-item-slider video").each(function () {
									this.pause(); // Останавливаем все видео
									this.currentTime = 0; // Сбрасываем на начало
									console.log("Видео остановлено:", this);
								});
							}, 500); // Даем время слайдеру отрендериться
						});

						$("#story-item-slider").slick({
							infinite: false, // Не зацикливаем
							arrows: true, // Отключаем стрелки
							prevArrow: arrowLeft,
							nextArrow: arrowRight,
							dots: true, // Показываем точки
							autoplay: true, // Включаем автоматическое перелистывание
							autoplaySpeed: 5000, // Переключение каждые 5 секунд
							fade: true, // Плавное появление слайдов
							cssEase: "linear", // Линейное изменение
							speed: 600, // Скорость анимации
							pauseOnHover: false, // Не останавливать при наведении
							pauseOnFocus: false, // Не останавливать при фокусе
						});

						$("#story-item-slider").on("beforeChange", function (event, slick, currentSlide, nextSlide) {
							console.log("beforeChange", currentSlide);

							var currentVideo = $(slick.$slides[currentSlide]).find("video");
							var nextVideo = $(slick.$slides[nextSlide]).find("video");

							// Останавливаем текущее видео перед переключением
							if (currentVideo.length) {
								currentVideo[0].pause();
								currentVideo[0].currentTime = 0; // Сбрасываем к началу
							}

							// Если следующий слайд содержит видео — отключаем autoplay
							if (nextVideo.length) {
								slick.slickSetOption("autoplay", false, true);
							}
						});

						// После переключения проверяем, есть ли видео
						$("#story-item-slider").on("afterChange", function (event, slick, currentSlide) {
							var currentVideo = $(slick.$slides[currentSlide]).find("video");

							if (currentVideo.length) {
								currentVideo[0].play();
								slick.slickSetOption("autoplay", false, true); // Останавливаем autoplay пока играет видео

								// Ждём окончания видео
								currentVideo[0].onended = function () {
									slick.slickSetOption("autoplay", true, true); // Включаем autoplay снова
									slick.slickNext(); // Переключаемся на следующий слайд
								};
							} else {
								slick.slickSetOption("autoplay", true, true); // Включаем autoplay для изображений
							}
						});
					},

					beforeClose: function () {
						$("#story-item-slider").slick("unslick"); // Уничтожаем слайдер перед закрытием
					},
				});
			},
			error: function () {
				alert("Ошибка загрузки данных.");
			},
		});
	});
});
