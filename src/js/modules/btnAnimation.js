$(document).ready(function () {
	$(".btn").css("--deg", "68deg");

	$(".btn:not([disabled])").on("mouseenter", function () {
		const btn = $(this);

		let degree = parseInt(btn.css("--deg")) || 68; // начальное значение
		let animationFrame;

		function increase() {
			if (degree < 300) {
				degree += 5;
				btn.css("--deg", degree + "deg");
				animationFrame = requestAnimationFrame(increase);
			} else {
				cancelAnimationFrame(animationFrame);
			}
		}

		animationFrame = requestAnimationFrame(increase);
	});

	$(".btn:not([disabled])").on("mouseout", function () {
		const btn = $(this);
		let degree = parseInt(btn.css("--deg")) || 300; // начальное значение
		let animationFrame;

		function decrease() {
			if (degree > 68) {
				degree -= 5;
				btn.css("--deg", degree + "deg");
				animationFrame = requestAnimationFrame(decrease);
			} else {
				cancelAnimationFrame(animationFrame);
			}
		}

		animationFrame = requestAnimationFrame(decrease);
	});
});
