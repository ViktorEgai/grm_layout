document.addEventListener("DOMContentLoaded", function () {
	const calendarEl = document.getElementById("small-calendar");

	if (calendarEl !== undefined && calendarEl !== null) {
		const calendar = new FullCalendar.Calendar(calendarEl, {
			initialView: "dayGridMonth",
			locale: "ru",
			headerToolbar: {
				start: "prev",
				center: "title",
				end: "next",
			},
			showNonCurrentDates: false,
			events: [
				{
					start: "2025-01-06",

					title: "", // Название отображается здесь
					className: "event-day",
					display: "background",
				},
				// {
				// 	groupId: "1", // Объединяет два диапазона в одно событие
				// 	start: "2025-01-06",
				// 	end: "2025-01-12",
				// 	title: "", // Название отображается здесь
				// 	className: "start",
				// 	display: "background",
				// },
				// {
				// 	groupId: "1", // Та же группа, чтобы логически объединить
				// 	start: "2025-01-12",
				// 	end: "2025-01-17",
				// 	display: "background", // Фон, чтобы не показывать название второй раз
				// 	className: "end",
				// },
			],
		});

		calendar.render();
	}
	const smallCalendar = document.getElementById("small-calendar-2");
	const bigCalendar = document.getElementById("calendar");

	if (bigCalendar !== undefined && bigCalendar !== null && smallCalendar !== undefined && smallCalendar !== null) {
		const smallCal = new FullCalendar.Calendar(smallCalendar, {
			initialView: "dayGridMonth",
			locale: "ru",
			headerToolbar: {
				start: "prev",
				center: "title",
				end: "next",
			},
			events: [
				{
					start: "2025-02-06",
					title: "Московский Международный жилищный конгресс 2024 ", // Краткое название события
					className: "event-day",
					display: "background",
					extendedProps: {
						place: "Место: Aenean commodo ligula eget ",
						time: "08:00",
						date: "06.02",
						status: "Офлайн",
						description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.",
					},
				},
			],
			dateClick: function (info) {
				bigCal.gotoDate(info.date); // Переключаем большой календарь на выбранную дату
			},
			dateChange: function (info) {
				bigCal.gotoDate(info.view.currentStart); // Когда меняется месяц на маленьком календаре, обновляем большой
			},
			datesSet: function (info) {
				const currentMonth = info.view.currentStart.getMonth(); // Получаем месяц маленького календаря
				const currentYear = info.view.currentStart.getFullYear(); // Получаем год маленького календаря

				// Синхронизируем с большим календарем
				bigCal.gotoDate(new Date(currentYear, currentMonth, 1));
			},
			eventContent: function (arg) {
				return {
					html: `
                    <div class="event-content">
										<div class="event-content-top">
										<p class="event-content__date"> ${arg.event.extendedProps.date}</p>
										<p class="event-content__status"> ${arg.event.extendedProps.status}</p>
										<p class="event-content__time"> ${arg.event.extendedProps.time}</p>
										</div>
                        <p class="event-content__title">${arg.event.title}</p>
												<p class="event-content__description">${arg.event.extendedProps.description}</p>
                        <p class="event-content__place">${arg.event.extendedProps.place}</p>
												<a href="#" class="event-content__btn btn btn--white">Зарегистрироваться</a>
                    </div>
										
                `,
				};
			},
			eventClick: function (info) {
				if ($(window).width() < 992) {
					const eventContent = $(info.el).find(".event-content");

					$(".calendar-event-block").html(eventContent.clone());
					$(".calendar-event-block").toggle();
				}
			},
		});

		const bigCal = new FullCalendar.Calendar(bigCalendar, {
			initialView: "dayGridMonth",
			locale: "ru",
			headerToolbar: false,
			showNonCurrentDates: true,
			fixedWeekCount: false,
			contentHeight: "auto", // Устанавливаем авто-высоту
			height: "auto",
			events: [
				{
					start: "2025-02-06",
					title: "Московский Международный жилищный конгресс 2024 ", // Краткое название события
					className: "event-day",
					extendedProps: {
						place: "Место: Aenean commodo ligula eget ",
						time: "08:00",
						description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.",
					},
				},
			],
			eventContent: function (arg) {
				return {
					html: `
                    <div class="event-content">
										<p class="event-content__time"> ${arg.event.extendedProps.time}</p>
                        <p class="event-content__title">${arg.event.title}</p>
												<p class="event-content__description">${arg.event.extendedProps.description}</p>
                        <p class="event-content__place">${arg.event.extendedProps.place}</p>
												<a href="#" class="event-content__btn btn btn--white">Зарегистрироваться</a>
                    </div>
										
                `,
				};
			},
			eventClick: function (info) {
				$(info.el).toggleClass("active");
				$(info.el).parents(".fc-day").find(".fc-daygrid-day-top").toggleClass("active");
			},
		});

		smallCal.render();
		bigCal.render();
	}
});
