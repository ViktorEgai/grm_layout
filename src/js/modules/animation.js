$(document).ready(function () {
	setTimeout(function () {
		// Рассчитываем высоту динамически
		var $arrowBlock = $(".arrow-block");
		var $arrowWrapper = $(".arrow-block-wrapper");
		var $arrowBottom = $(".arrow-block-bottom");
		var $arrowBottomFront = $(".arrow-block-bottom-front");

		if ($arrowBlock.length && $arrowWrapper.length && $arrowBottom.length) {
			// $(".arrow-block__bolt").css("height", $arrowWrapper.innerHeight() * 0.48 + "px");
			if ($(window).width() > 992) {
				// Инициализация GSAP и ScrollTrigger
				ScrollTrigger.create({
					trigger: $arrowBottom[0],
					start: "top 80%",
					end: "+=" + $arrowWrapper.innerHeight() + "px bottom",
					pin: true,
					scrub: true,
				});
				ScrollTrigger.create({
					trigger: $arrowBottomFront[0],
					start: "top 80%",
					end: "+=" + $arrowWrapper.innerHeight() + "px bottom",
					pin: true,
					scrub: true,
				});

				// Анимация для болта (стрелы)
				gsap.from(".arrow-block__bolt", {
					scrollTrigger: {
						trigger: $arrowBlock[0],
						start: "top 20%",
						end: "+=" + $arrowBlock.innerHeight() / 2, // Пример динамической высоты
					},
					y: "-100%",
					duration: 0.6,
				});

				// // Анимация для линии
				// gsap.fromTo(
				// 	".arrow-block__bolt",
				// 	{
				// 		height: $arrowWrapper.innerHeight() * 0.48 + "px", // Начальная высота
				// 	},
				// 	{
				// 		height: "100%", // Конечная высота, включая padding
				// 		// height: $arrowWrapper.innerHeight() + "px", // Конечная высота, включая padding
				// 		scrollTrigger: {
				// 			trigger: $arrowWrapper[0],
				// 			start: "top 80%", // Начало анимации
				// 			end: () => "+=" + $arrowWrapper.innerHeight() + "px", // Конец анимации
				// 			scrub: 0.2, // Скроллинг плавный
				// 		},
				// 	}
				// );

				// Анимация для тени
				gsap.from(".shadow", {
					scrollTrigger: {
						trigger: $arrowBlock[0],
						start: "top 20%",
						end: "+=" + $arrowBlock.innerHeight() / 2,
					},
					y: "-100%",
					opacity: 0,
					duration: 0.6,
				});
				$(".arrow-block__item").each(function (index) {
					let item = $(this);
					let x = "";
					if (index % 2 == 0) {
						x = "-10%";
					} else {
						x = "10%";
					}
					gsap.from(item, {
						scrollTrigger: {
							trigger: item,
							start: "-20% 30%",
							end: "center 40%",
							scrub: 1,
						},
						x: x,
						opacity: 0,
					});
				});
			} else {
				ScrollTrigger.create({
					trigger: $arrowBottom[0],
					start: "top 83%",
					end: "+=" + $arrowWrapper.innerHeight() + "px bottom",
					pin: true,
					scrub: true,
				});
				ScrollTrigger.create({
					trigger: $arrowBottomFront[0],
					start: "top 83%",
					end: "+=" + $arrowWrapper.innerHeight() + "px bottom",
					pin: true,
					scrub: true,
				});
				// Анимация для болта (стрелы)
				gsap.from(".arrow-block__bolt", {
					scrollTrigger: {
						trigger: $arrowBlock[0],
						start: "top 70%",
						end: "+=300px", // Пример динамической высоты
					},
					y: "-200%",
					duration: 0.6,
				});
				// Анимация для линии
				gsap.fromTo(
					".arrow-block__bolt",
					{
						height: $(".arrow-block__bolt").innerHeight() + "px", // Начальная высота
					},
					{
						// height: "100%", // Конечная высота, включая padding
						height: $arrowWrapper.innerHeight() + "px", // Конечная высота, включая padding
						scrollTrigger: {
							trigger: $arrowWrapper[0],
							start: "top 80%", // Начало анимации
							end: () => "+=" + $arrowWrapper.innerHeight() + "px", // Конец анимации
							scrub: 0.2, // Скроллинг плавный
						},
					}
				);
				gsap.from(".shadow", {
					scrollTrigger: {
						trigger: $arrowBlock[0],
						start: "top 70%",
						end: "+=" + $arrowBlock.innerHeight() / 2,
					},
					y: "-100%",
					opacity: 0,
					duration: 0.6,
				});
				$(".arrow-block__item").each(function (index) {
					let item = $(this);

					gsap.from(item, {
						scrollTrigger: {
							trigger: item,
							start: "-20% center",
							end: "center 40%",
							scrub: 0.1,
						},
						x: "-10%",
						opacity: 0,
					});
				});
			}
		} else {
			console.error("Не удалось найти элементы для анимации.");
		}

		$(".service-hero__title, .section-title, .dropdown-item, .stories, .about-slider, .top__title, .top__text, .hero-left, #map, .content-block-left, .agent-list-item, .steps-item").each(function () {
			let item = $(this);

			gsap.fromTo(
				item[0],
				{
					opacity: 0,
					x: "-100",
				},
				{
					opacity: 1,
					x: "0",
					scrollTrigger: item[0],
					duration: 1.2,
				}
			);
		});
		$(".map-block-right, .map-block-contacts, .sidebar, .service-hero-block__img").each(function () {
			let item = $(this);
			gsap.fromTo(
				item[0],
				{
					opacity: 0,
					x: " 100",
				},
				{
					opacity: 1,
					x: "0",
					scrollTrigger: item[0],
					duration: 1.2,
				}
			);
		});
		$(".sertificates-grid-item, .gallery-grid-item").each(function () {
			let item = $(this);
			gsap.fromTo(
				item[0],
				{
					opacity: 0,
					y: "-100",
				},
				{
					opacity: 1,
					y: "0",
					scrollTrigger: item[0],
					duration: 0.5,
				}
			);
		});

		$(".vakancy-card:not(.skip), .documents-block").each(function (index) {
			let item = $(this);

			if (index % 2 == 0) {
				gsap.fromTo(
					item[0],
					{
						opacity: 0,
						x: "-100",
					},
					{
						opacity: 1,
						x: "0",
						scrollTrigger: item[0],
						duration: 1.2,
					}
				);
			} else {
				gsap.fromTo(
					item[0],
					{
						opacity: 0,
						x: "100",
					},
					{
						opacity: 1,
						x: "0",
						scrollTrigger: item[0],
						duration: 1.2,
					}
				);
			}
		});

		gsap.fromTo(
			".circle",
			{
				opacity: 0,
				scale: "0",
			},
			{
				opacity: 1,
				scale: "1",
				scrollTrigger: ".circle",
				duration: 1.2,
			}
		);

		// Обновляем триггеры после загрузки
		ScrollTrigger.refresh();
	}, 200);
});
