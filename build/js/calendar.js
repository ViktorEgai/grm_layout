document.addEventListener("DOMContentLoaded", function () {
	const calendarEl = document.getElementById("small-calendar");

	const events = [
		{
			start: "2025-02-14",
			title: "День святого Валентина",
			className: "event-day offline",
			display: "background",
			extendedProps: {
				date: "14",
				place: "Место: Aenean commodo ligula eget ",
				time: "08:00",
				description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.",
				status: "Офлайн",
			},
		},
		{
			start: "2025-03-08",
			title: "Международный женский день",
			className: "event-day",
			display: "background",
			extendedProps: {
				date: "8",
				place: "Место: Aenean commodo ligula eget ",
				time: "08:00",
				description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.",
				status: "Онлайн",
			},
		},
		{
			start: "2025-04-01",
			title: "День смеха",
			className: "event-day",
			display: "background",
			extendedProps: {
				date: "1",
				place: "Место: Aenean commodo ligula eget ",
				time: "08:00",
				description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.",
				status: "Онлайн",
			},
		},
		{
			start: "2025-02-16",
			title: "Московский Международный жилищный конгресс 2024 ", // Краткое название события
			className: "event-day",
			display: "background",

			extendedProps: {
				date: "6",

				place: "Место: Aenean commodo ligula eget ",
				time: "08:00",
				description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.",
				status: "Онлайн",
			},
		},
	];

	const monthCases = {
		январь: "января",
		февраль: "февраля",
		март: "марта",
		апрель: "апреля",
		май: "мая",
		июнь: "июня",
		июль: "июля",
		август: "августа",
		сентябрь: "сентября",
		октябрь: "октября",
		ноябрь: "ноября",
		декабрь: "декабря",
	};
	if (calendarEl !== undefined && calendarEl !== null) {
		const infoDateEl = document.querySelector(".info-calendar-date__day p");
		const infoMonthEl = document.querySelector(".info-calendar-date__day span");
		const infoTextEl = document.querySelector(".info-calendar-date__text");

		// Создаем календарь
		const calendar = new FullCalendar.Calendar(calendarEl, {
			initialView: "dayGridMonth",
			locale: "ru",
			headerToolbar: {
				start: "prev",
				center: "title",
				end: "next",
			},
			showNonCurrentDates: false,
			events: events,
			eventClick: function (info) {
				console.log(info);

				updateEventInfo(info.event.start, info.event.title);
			},
		});

		calendar.render();

		// Функция для обновления блока с датой
		function updateEventInfo(date, title) {
			const eventDate = new Date(date);
			const day = eventDate.getDate();
			const month = eventDate.toLocaleString("ru", { month: "long" });
			const monthGenitive = monthCases[month] || month; // Склоняем месяц

			infoDateEl.textContent = day;
			infoMonthEl.textContent = monthGenitive;
			infoTextEl.innerHTML = title || "Событие без названия";
		}

		// Найти ближайшую дату события и обновить блок
		function setNearestEvent() {
			const today = new Date();
			let nearestEvent = null;

			events.forEach((event) => {
				const eventDate = new Date(event.start);
				if (eventDate >= today && (!nearestEvent || eventDate < new Date(nearestEvent.start))) {
					nearestEvent = event;
				}
			});

			if (nearestEvent) {
				updateEventInfo(nearestEvent.start, nearestEvent.title);
			}
		}

		setNearestEvent();
	}
	const smallCalendar = document.getElementById("small-calendar-2");
	const bigCalendar = document.getElementById("calendar");

	if (bigCalendar !== undefined && bigCalendar !== null && smallCalendar !== undefined && smallCalendar !== null) {
		const infoDateEl = document.querySelector(".info-calendar-date__day p");
		const infoMonthEl = document.querySelector(".info-calendar-date__day span");
		const infoTextEl = document.querySelector(".info-calendar-date__text");

		const smallCal = new FullCalendar.Calendar(smallCalendar, {
			initialView: "dayGridMonth",
			locale: "ru",
			headerToolbar: {
				start: "prev",
				center: "title",
				end: "next",
			},
			events: events,
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
												<a href="#popup" data-fancybox class="event-content__btn btn btn--white">Зарегистрироваться</a>
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
			events: events,
			eventContent: function (arg) {
				return {
					html: `
                    <div class="event-content">
										<div class="event-content-top">
											<p class="event-content__date"> ${arg.event.extendedProps.date}</p>
												<p class="event-content__time"> ${arg.event.extendedProps.time}</p>
										</div>
                        <p class="event-content__title">${arg.event.title}</p>
												<p class="event-content__description">${arg.event.extendedProps.description}</p>
                        <p class="event-content__place">${arg.event.extendedProps.place}</p>
												<a href="#popup" class="event-content__btn btn btn--white" data-fancybox>Зарегистрироваться</a>
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

		// Функция для обновления блока с датой
		function updateEventInfo(date, title) {
			const eventDate = new Date(date);
			const day = eventDate.getDate();
			const month = eventDate.toLocaleString("ru", { month: "long" });
			const monthGenitive = monthCases[month] || month; // Склоняем месяц

			infoDateEl.textContent = day;
			infoMonthEl.textContent = monthGenitive;
			infoTextEl.innerHTML = title || "Событие без названия";
		}

		// Найти ближайшую дату события и обновить блок
		function setNearestEvent() {
			const today = new Date();
			let nearestEvent = null;

			events.forEach((event) => {
				const eventDate = new Date(event.start);
				if (eventDate >= today && (!nearestEvent || eventDate < new Date(nearestEvent.start))) {
					nearestEvent = event;
				}
			});

			if (nearestEvent) {
				updateEventInfo(nearestEvent.start, nearestEvent.title);
			}
		}

		setNearestEvent();
	}
});
