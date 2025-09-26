$(document).ready(function () {
	// Функция для получения CSRF-токена из куки
	function getCookie(name) {
		let cookieValue = null;
		if (document.cookie && document.cookie !== "") {
			const cookies = document.cookie.split(";");
			for (let i = 0; i < cookies.length; i++) {
				const cookie = cookies[i].trim();
				if (cookie.substring(0, name.length + 1) === name + "=") {
					cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
					break;
				}
			}
		}
		return cookieValue;
	}

	// Установка CSRF-токена для AJAX-запросов
	const csrftoken = getCookie("csrftoken");

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
	$('[name="sertificate_time"]').on("change", function () {
		if ($(this).is(":checked") && $(this).val() == "second") {
			$("#sertificate_date_field").removeClass("d-none");
		} else {
			$("#sertificate_date_field").addClass("d-none");
		}
	});
	$('[name="file_type"], [name="file_type_2"], [name="file_type_3"], [name="file_type_4"]').on("change", function () {
		if ($(this).is(":checked")) {
			let value = $(this).val();
			const block = $(this)
				.parents(".form__field")
				.siblings('[data-id="' + value + '"]');
			const hiddenFields = $(this).parents(".form__field").siblings(".hidden-field");

			hiddenFields.hide();
			block.show();
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

	$(".form__file + input").on("change", function () {
		// Получаем список выбранных файлов
		const files = $(this)[0].files;
		const input = $(this);

		if (input.hasClass("file_excel")) {
			if (files.length > 0) {
				let file = this.files[0];

				$(this).prev().find(".default").hide();
				$(this).prev().find(".upload-status .file-name").text(file.name);

				$(this).prev().find(".upload-status").addClass("active");
				let fileExt = file.name.split(".").pop().toLowerCase();
				let iconPath = "img/icons/file-icon.svg"; // Иконка по умолчанию
				let fileIcons = {
					pdf: "img/icons/pdf.svg",
					doc: "img/icons/doc.svg",
					docx: "img/icons/doc.svg",
					xls: "img/icons/excel.svg",
					xlsx: "img/icons/excel.svg",
					png: "img/icons/image.svg",
					jpg: "img/icons/image.svg",
					jpeg: "img/icons/image.svg",
					gif: "img/icons/image.svg",
					zip: "img/icons/zip.svg",
					rar: "img/icons/zip.svg",
				};

				if (fileIcons[fileExt]) {
					iconPath = fileIcons[fileExt];
				}

				$(this).prev().find(".file-icon").attr("src", iconPath);

				// Фейковая анимация загрузки
				let progress = 0;
				let interval = setInterval(function () {
					progress += 1;
					input
						.prev()
						.find(".progress")
						.css("width", progress + "%");
					input
						.prev()
						.find(".upload-percent")
						.text(progress + "%");

					if (progress >= 100) {
						clearInterval(interval);
					}
				}, 10);
			} else {
				$(this).prev().find(".default").show();
				$(this).prev().find(".upload-status").removeClass("active");
			}
		} else {
			if (files.length > 0) {
				// Формируем строку с именами файлов
				const fileNames = Array.from(files)
					.map((file) => file.name)
					.join(", ");
				// Обновляем текст в элементе #file-title
				$(this).prev().find(".default").hide();
				if (files.length > 1) {
					$(this).prev().find(".file-name").text(`Загружено ${files.length} файла(ов)`);
				} else {
					$(this).prev().find(".file-name").text(fileNames);
				}
				$(this).prev().find(".file-name").show();
			} else {
				$(this).prev().find(".file-name").hide();

				$(this).prev().find(".default").show();
			}
		}
	});

	function switchDownloadFields() {
		const downloadFields = $('.download-field');
		downloadFields.hide();

		let val = $('[name="download_type"]:checked').val();
		$('#'+ val).toggle()
		
	}
	switchDownloadFields()
	$('[name="download_type"]').on('change', switchDownloadFields)

	$(".form").each(function () {
		$(this).validate({
			submitHandler: function (form) {
				event.preventDefault();

				if ($(form).parents(".popup").is("#booking-popup")) {
					var data = {
						usersurname: $(form).find('[name="usersurname"]').val(),
						username: $(form).find('[name="username"]').val(),
						phone: $(form).find('[name="phone"]').val(),
						agentstvo: $(form).find('[name="agentstvo"]').val(),
						grm_member: $(form).find('[name="grm_member"]:checked').val(),
						event: $(form).find('[name="event"]').val(),
					};
					$.ajax({
						url: "/api/obuchsred-registration/",
						type: "POST",
						contentType: "application/json",
						data: JSON.stringify(data),

						beforeSend: function (xhr) {
							xhr.setRequestHeader("X-CSRFToken", csrftoken);
						},
						success: function (response) {
							successMessage();
						},
						error: function (xhr) {
							// Покажите ошибку
							alert("Ошибка при отправке. Проверьте данные.");
						},
					});
				}
				// $.ajax({
				// 	url: "submitHandler.php", // Ссылка на серверный обработчик
				// 	type: "POST",
				// 	data: $(form).serialize(),
				// 	success: function (response) {
				// 		successMessage();
				// 	},
				// 	error: function () {
				// 		alert("Произошла ошибка при отправке данных.");
				// 	},
				// });
				return false; // Останавливаем стандартное поведение формы
			},
		});
	});
	$(document).on("click", ".booking-btn", function () {
		var eventId = $(this).data("event-id");
		$("#popup-event-id").val(eventId);
	});

	// Письмо
	$(".letter-form").on("submit", function (e) {
		e.preventDefault();
		$(this).addClass("sent");
		setTimeout(() => {
			$(".letter-form-back-top").addClass("active");
			$(".letter-form-block").hide(300);
		}, 1300);
		setTimeout(successMessage, 1800);
	});

	// квиз
	$(".quiz").each(function () {
		let quiz = $(this);
		let form = quiz.find(".quiz-form");
		let steps = quiz.find(".step");
		let pagination = quiz.find(".pagination");
		let currentStep = 0;
		let totalSteps = steps.length;

		form.validate({
			errorElement: "div",
			errorClass: "error",
		});

		function showStep(index) {
			steps.removeClass("active");
			$(steps[index]).addClass("active");
			pagination.text(`  ${index + 1}/${totalSteps}`);
		}

		quiz.find(".next").click(function () {
			if (form.valid()) {
				currentStep++;
				if (pagination.length > 0) {
					if (currentStep < totalSteps) {
						showStep(currentStep);
					}
				}
			}
		});

		quiz.find(".prev").click(function () {
			currentStep--;
			showStep(currentStep);
		});

 
		showStep(currentStep);
	});

	function toggleDocs() {
		$('[data-for="Действительный член ГРМ"], [data-for="Деловой клуб ГРМ"]').addClass('d-none');
		if ($('[name="vid_chlenstva"]:checked').val() == "Действительный член ГРМ") {
			$(".quiz .doc-link").removeClass("active");
			$("#doc-for-grm").addClass("active");
			$('[data-for="Действительный член ГРМ"]').removeClass('d-none');
		} else {
			$(".quiz .doc-link").removeClass("active");
			$("#doc-for-club").addClass("active");
			$('[data-for="Деловой клуб ГРМ"]').removeClass('d-none');
		}
		console.log($('[name="vid_chlenstva"]:checked').val());
	}
	toggleDocs();
	$('[name="vid_chlenstva"]').on("change", toggleDocs);
	function successMessage() {
		$.fancybox.close();
		const customSwal = Swal.mixin({
			customClass: {
				confirmButton: "btn  ",
				cancelButton: "btn  ",
			},
			buttonsStyling: false,
		});
		console.log(customSwal);

		customSwal.fire({
			title: "Спасибо!",
			text: "Ваша заявка успешно отправлена!",
			icon: "success",
			// timer: 3000,
		});
		$(".btn").css("--deg", "68deg");
	}
});
