document.addEventListener("DOMContentLoaded", function () {
	const calendarEl = document.getElementById("small-calendar");

	const events = [
		{
			start: "2025-04-14",
			title: "Мероприятие 1",
			className: "event-day offline",
			display: "background",
			extendedProps: {
				date: "14",
				place: "Место: Aenean commodo ligula eget ",
				time: "08:00",
				description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.",
				status: "Офлайн",
				statusClass: "offline",
			},
		},
		{
			start: "2025-04-14",
			title: "Мероприятие 2",
			className: "event-day online",
			display: "background",
			extendedProps: {
				date: "14",
				place: "Место: Aenean commodo ligula eget ",
				time: "08:00",
				description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.",
				status: "Офлайн",
				statusClass: "online",
			},
		},
		{
			start: "2025-04-14",
			title: "Мероприятие 2",
			className: "event-day online",
			display: "background",
			extendedProps: {
				date: "14",
				place: "Место: Aenean commodo ligula eget ",
				time: "08:00",
				description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.",
				status: "Офлайн",
				statusClass: "online",
			},
		},
		{
			start: "2025-04-14",
			title: "Мероприятие 2",
			className: "event-day online",
			display: "background",
			extendedProps: {
				date: "14",
				place: "Место: Aenean commodo ligula eget ",
				time: "08:00",
				description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.",
				status: "Офлайн",
				statusClass: "online",
			},
		},
		{
			start: "2025-04-14",
			title: "Мероприятие 2",
			className: "event-day online",
			display: "background",
			extendedProps: {
				date: "14",
				place: "Место: Aenean commodo ligula eget ",
				time: "08:00",
				description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.",
				status: "Офлайн",
				statusClass: "online",
			},
		},
		{
			start: "2025-04-14",
			title: "Мероприятие 2",
			className: "event-day online",
			display: "background",
			extendedProps: {
				date: "14",
				place: "Место: Aenean commodo ligula eget ",
				time: "08:00",
				description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.",
				status: "Офлайн",
				statusClass: "online",
			},
		},
		{
			start: "2025-04-17",
			title: "Мероприятие 4",
			className: "event-day offline",
			display: "background",
			extendedProps: {
				date: "14",
				place: "Место: Aenean commodo ligula eget ",
				time: "09:00",
				description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.",
				status: "Офлайн",
				statusClass: "offline",
			},
		},
		{
			start: "2025-04-17",
			title: "Мероприятие 3",
			className: "event-day offline",
			display: "background",
			extendedProps: {
				date: "14",
				place: "Место: Aenean commodo ligula eget ",
				time: "11:00",
				description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.",
				status: "Офлайн",
				statusClass: "online",
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

				eventDate.setHours(0, 0, 0, 0);
				today.setHours(0, 0, 0, 0);
				if (eventDate >= today && (!nearestEvent || eventDate < new Date(nearestEvent.start))) {
					nearestEvent = event;
				}
			});

			if (nearestEvent) {
				updateEventInfo(nearestEvent.start, nearestEvent.title);
			} else {
				const today = new Date();
				const day = today.getDate();
				const month = today.toLocaleString("ru", { month: "long" });
				const monthGenitive = monthCases[month] || month;
				infoDateEl.textContent = day;
				infoMonthEl.textContent = month;
				infoTextEl.innerHTML = "Мероприятия на ближайшие даты отсутствуют.";
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
		const calendarEventBlock = document.querySelector(".calendar-event-block");
		const calendarSection = document.querySelector(".calendar");
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

			eventClick: function (info) {
				if ($(window).width() < 992) {
					$(".calendar-event-block").show();
				}
			},
		});

		const bigCal = new FullCalendar.Calendar(bigCalendar, {
			initialView: "dayGridMonth",
			locale: "ru",
			headerToolbar: false,
			showNonCurrentDates: true,
			fixedWeekCount: false,
			contentHeight: "auto",
			height: "auto",
			events: events,
			eventContent: function (arg) {
				const multipleEvents = arg.view.calendar.getEvents().filter((event) => event.startStr === arg.event.startStr);
				const earliestTime = multipleEvents.reduce((min, event) => {
					return event.extendedProps.time < min ? event.extendedProps.time : min;
				}, multipleEvents[0].extendedProps.time);

				const visibleEvents = multipleEvents.slice(0, 2); // Ограничиваем до двух мероприятий
				const hiddenEventsCount = multipleEvents.length - visibleEvents.length;

				return {
					html: `
                <div class="event-time-start"> ${earliestTime}</div>
                ${visibleEvents.map((event) => `<p class="event-title">${event.title}</p>`).join("")}
                 
                <div class="event-total">${multipleEvents.length} мероприятий</div>

            `,
				};
			},
			datesSet: function () {
				document.querySelectorAll(".fc-daygrid-day").forEach((dayCell) => {
					dayCell.addEventListener("click", function () {
						const date = this.getAttribute("data-date");
						const dayEvents = events.filter((event) => event.start === date);

						if (dayEvents.length > 0) {
							const eventListHtml = dayEvents
								.map(
									(event) => `
                        <div class="event-content ${event.extendedProps.statusClass}">
                            <div class="event-content-top">
                                <p class="event-content__date">${event.extendedProps.date}</p>
                                <p class="event-content__time">${event.extendedProps.time}</p>
                            </div>
                            <p class="event-content__title">${event.title}</p>
                            <p class="event-content__description">${event.extendedProps.description}</p>
                           <div class="event-content-bottom">
                           	 <p class="event-content__place">${event.extendedProps.place}</p>
	                            <a href="#event-popup" data-title="${event.title}" class="event-content__btn btn btn--white" data-fancybox>Зарегистрироваться</a>
                           </div>
                        </div>
                    `
								)
								.join("");

							calendarEventBlock.innerHTML = eventListHtml;
							calendarEventBlock.style.display = "block";
						}
					});
				});
			},
		});

		smallCal.render();
		bigCal.render();

		calendarSection.addEventListener("click", function (e) {
			const t = e.target;

			if (!t.closest(".calendar-event-block") && !t.closest(".fc-event")) {
				calendarEventBlock.style.display = "none";
			}
		});

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
		// // Найти ближайшую дату события и обновить блок
		function setNearestEventForSmallCal() {
			const today = new Date();
			let nearestEvent = null;

			events.forEach((event) => {
				const eventDate = new Date(event.start);

				eventDate.setHours(0, 0, 0, 0);
				today.setHours(0, 0, 0, 0);

				if (eventDate >= today && (!nearestEvent || eventDate < new Date(nearestEvent.start))) {
					nearestEvent = event;
				}
			});

			if (nearestEvent) {
				updateEventInfo(nearestEvent.start, nearestEvent.title);
			} else {
				const today = new Date();
				const day = today.getDate();
				const month = today.toLocaleString("ru", { month: "long" });
				const monthGenitive = monthCases[month] || month;
				infoDateEl.textContent = day;
				infoMonthEl.textContent = month;
				infoTextEl.innerHTML = "Мероприятия на ближайшие даты отсутствуют.";
			}
		}
		setNearestEventForSmallCal();

		// Функция для отображения мероприятий в блоке
		function showEventsForDate(date) {
			const dayEvents = events.filter((event) => event.start === date);
			const calendarEventBlock = document.querySelector(".calendar-event-block");
			console.log(dayEvents.length);

			if (dayEvents.length > 0) {
				const eventListHtml = dayEvents
					.map(
						(event) => `
            <div class="event-content  ${event.extendedProps.statusClass}">
                <div class="event-content-top">
                    <p class="event-content__date">${event.extendedProps.date}</p>
                    <p class="event-content__time">${event.extendedProps.time}</p>
                </div>
                <p class="event-content__title">${event.title}</p>
                <p class="event-content__description">${event.extendedProps.description}</p>
                <p class="event-content__place">${event.extendedProps.place}</p>
                <a href="#popup" class="event-content__btn btn btn--white" data-fancybox>Зарегистрироваться</a>
            </div>
        `
					)
					.join("");

				calendarEventBlock.innerHTML = eventListHtml;
				if ($(window).width() < 992) {
					calendarEventBlock.style.display = "block";
				}
			}
		}

		// Найти ближайшую дату с мероприятиями и отобразить их при загрузке
		function setNearestEvent() {
			const today = new Date().toISOString().split("T")[0];
			const futureEvents = events.filter((event) => event.start >= today);

			if (futureEvents.length > 0) {
				const nearestDate = futureEvents[0].start;

				showEventsForDate(nearestDate);
			}
		}

		setNearestEvent();
	}
});
