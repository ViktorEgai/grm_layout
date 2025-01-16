$(document).ready(function () {
	function adjustFooterMenu() {
		if ($(window).width() < 1200) {
			// Если меньше 1200px, распределяем элементы поровну между двумя списками
			if ($(".footer-menu").length === 3) {
				// Сливаем все элементы в один массив
				const allItems = [];
				$(".footer-menu").each(function () {
					$(this)
						.find("li")
						.each(function () {
							allItems.push($(this));
						});
				});

				// Удаляем текущие списки
				$(".footer-menu").remove();

				// Создаем два новых списка
				const half = Math.ceil(allItems.length / 2);
				const firstHalf = allItems.slice(0, half);
				const secondHalf = allItems.slice(half);

				const menuContainer = $(".footer-nav");
				const firstMenu = $('<ul class="footer-menu"></ul>');
				const secondMenu = $('<ul class="footer-menu"></ul>');

				firstHalf.forEach((item) => firstMenu.append(item));
				secondHalf.forEach((item) => secondMenu.append(item));

				menuContainer.append(firstMenu).append(secondMenu);
				$("#footer-menu-container").append(menuContainer); // Добавляем списки в футер
			}
		} else {
			// Если больше или равно 1200px, возвращаем три списка
			if ($(".footer-menu").length === 2) {
				// Сливаем все элементы обратно в массив
				const allItems = [];
				$(".footer-menu").each(function () {
					$(this)
						.find("li")
						.each(function () {
							allItems.push($(this));
						});
				});

				// Удаляем текущие списки
				$(".footer-menu").remove();

				// Создаем три новых списка
				const third = Math.ceil(allItems.length / 3);
				const firstThird = allItems.slice(0, third);
				const secondThird = allItems.slice(third, third * 2);
				const thirdThird = allItems.slice(third * 2);

				const menuContainer = $(".footer-nav");
				const firstMenu = $('<ul class="footer-menu"></ul>');
				const secondMenu = $('<ul class="footer-menu"></ul>');
				const thirdMenu = $('<ul class="footer-menu"></ul>');

				firstThird.forEach((item) => firstMenu.append(item));
				secondThird.forEach((item) => secondMenu.append(item));
				thirdThird.forEach((item) => thirdMenu.append(item));

				menuContainer.append(firstMenu).append(secondMenu).append(thirdMenu);
				$("#footer-menu-container").append(menuContainer); // Добавляем списки в футер
			}
		}
	}

	// Запуск функции при загрузке страницы
	adjustFooterMenu();

	// Запуск функции при изменении размера окна
	$(window).resize(function () {
		adjustFooterMenu();
	});
});
