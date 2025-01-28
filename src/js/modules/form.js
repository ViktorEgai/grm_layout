$(document).ready(function () {
	if ($('[name="acceptance"]').is(":checked")) {
		$('[name="acceptance"]').parents("form").find("button").attr("disabled", false);
	} else {
		$('[name="acceptance"]').parents("form").find("button").attr("disabled", true);
	}
	$('[name="acceptance"]').on("change", function () {
		if ($(this).is(":checked")) {
			$(this).parents("form").find("button").attr("disabled", false);
		} else {
			$(this).parents("form").find("button").attr("disabled", true);
		}
	});
	$("#file_input").on("change", function () {
		// Получаем список выбранных файлов
		const files = $(this)[0].files;
		if (files.length > 0) {
			// Формируем строку с именами файлов
			const fileNames = Array.from(files)
				.map((file) => file.name)
				.join(", ");
			// Обновляем текст в элементе #file-title
			$("#file-title").text(fileNames);
		} else {
			// Если файлы не выбраны, отображаем стандартный текст
			$("#file-title").text("Прикрепить документы");
		}
	});
	$("form").validate({
		rules: {
			username: {
				required: true,
				minlength: 3,
			},
			email: {
				required: true,
				email: true,
			},
			phone: {
				required: true,
				minlength: 15,
			},
		},
		// submitHandler: function (form) {
		// 	$.ajax({
		// 		url: "submitHandler.php", // Ссылка на серверный обработчик
		// 		type: "POST",
		// 		data: $(form).serialize(),
		// 		success: function (response) {
		// 			swal;
		// 		},
		// 		error: function () {
		// 			alert("Произошла ошибка при отправке данных.");
		// 		},
		// 	});
		// 	return false; // Останавливаем стандартное поведение формы
		// },
	});

	const customSwal = Swal.mixin({
		customClass: {
			confirmButton: "btn  ",
			cancelButton: "btn  ",
		},
		buttonsStyling: false,
	});
	$(".letter-form").on("submit", function (e) {
		e.preventDefault();
		$(this).addClass("sent");
		setTimeout(() => {
			$(".letter-form-back-top").addClass("active");
			$(".letter-form-block").hide(300);
		}, 1300);
		setTimeout(() => {
			customSwal.fire({
				title: "Спасибо!",
				text: "Ваша заявка успешно отправлена!",
				icon: "success",
				// timer: 3000,
			});
			$(".btn").css("--deg", "68deg");
		}, 1800);
	});
});
