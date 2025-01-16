$(document).ready(function () {
	// Найти все <img> элементы с атрибутом data-svg
	$("img[data-svg]").each(function () {
		const $img = $(this); // Ссылка на текущий элемент
		const imgSrc = $img.attr("src"); // Получить путь к SVG

		if (imgSrc && imgSrc.endsWith(".svg")) {
			// Загрузить SVG через AJAX
			$.get(imgSrc, function (svgData) {
				const $svg = $(svgData).find("svg"); // Извлечь <svg> из ответа

				if ($svg.length) {
					// Скопировать атрибуты <img> в <svg>, кроме src и data-svg
					$.each($img[0].attributes, function () {
						if (this.name !== "src" && this.name !== "data-svg") {
							$svg.attr(this.name, this.value);
						}
					});

					// Заменить <img> на <svg>
					$img.replaceWith($svg);
				}
			}).fail(function () {
				console.error(`Ошибка загрузки SVG: ${imgSrc}`);
			});
		}
	});
});
