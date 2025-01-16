document.addEventListener("DOMContentLoaded", function () {
	const calendarEl = document.getElementById("small-calendar");
	if (calendarEl !== undefined || calendarEl !== null) {
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
					groupId: "1", // Объединяет два диапазона в одно событие
					start: "2025-01-06",
					end: "2025-01-12",
					title: "", // Название отображается здесь
					className: "start",
					display: "background",
				},
				{
					groupId: "1", // Та же группа, чтобы логически объединить
					start: "2025-01-12",
					end: "2025-01-17",
					display: "background", // Фон, чтобы не показывать название второй раз
					className: "end",
				},
			],
		});

		calendar.render();
	}
});
