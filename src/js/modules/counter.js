$(document).ready(function () {
	// Функция для склонения слов
	function declensionNum(num, words) {
		return words[num % 100 > 4 && num % 100 < 20 ? 2 : [2, 0, 1, 1, 1, 2][num % 10 < 5 ? num % 10 : 5]];
	}

	// Получаем дату из data-атрибута
	var endDate = $("#counter").data("date");

	if ($("#counter").length > 0) {
		// Разбиваем дату на части (день, месяц, год)
		var dateParts = endDate.split(".");
		var targetDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);

		// Массивы для склонения
		var daysWords = ["день", "дня", "дней"];
		var hoursWords = ["час", "часа", "часов"];
		var minsWords = ["минута", "минуты", "минут"];
		var secsWords = ["секунда", "секунды", "секунд"];

		// Обновляем счетчик каждую секунду
		var timer = setInterval(function () {
			var now = new Date();
			var diff = targetDate - now;

			// Если дата прошла
			if (diff <= 0) {
				clearInterval(timer);
				$("#days").text("0").attr("data-text", daysWords[2]);
				$("#hours").text("0").attr("data-text", hoursWords[2]);
				$("#mins").text("0").attr("data-text", minsWords[2]);
				$("#secs").text("0").attr("data-text", secsWords[2]);
				return;
			}

			// Вычисляем дни, часы, минуты, секунды
			var days = Math.floor(diff / (1000 * 60 * 60 * 24));
			var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
			var seconds = Math.floor((diff % (1000 * 60)) / 1000);

			// Обновляем значения
			$("#days").text(days).attr("data-text", declensionNum(days, daysWords));
			$("#hours").text(hours).attr("data-text", declensionNum(hours, hoursWords));
			$("#mins").text(minutes).attr("data-text", declensionNum(minutes, minsWords));
			$("#secs").text(seconds).attr("data-text", declensionNum(seconds, secsWords));
		}, 1000);
	}
});
