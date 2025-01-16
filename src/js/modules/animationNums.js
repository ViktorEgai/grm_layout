$(document).ready(function () {
	function numAnimation(block, elements, duration = 1500) {
		var $myElt = $(block); // whatever element you want to check

		var $window = $(window); // the window jQuery element
		var inWindow = false;
		if ($myElt.length > 0) {
			function startAnim() {
				var myTop = $myElt.offset().top; // the top (y) location of your element
				var windowTop = $window.scrollTop(); // the top of the window
				var windowBottom = windowTop + $window.height() - 100;

				if (myTop >= windowTop && myTop < windowBottom) {
					if (inWindow == false) {
						inWindow = true;
						if (inWindow) {
							$(elements).each(function () {
								var $this = $(this);
								jQuery({ Counter: 0 }).animate(
									{ Counter: $this.text() },
									{
										duration: duration,
										easing: "swing",
										step: function () {
											$this.text(Math.ceil(this.Counter));
										},
									}
								);
							});
						}
					}
					// element is in the window
				}
			}
			startAnim();

			$(window).on("scroll", function () {
				startAnim();
			});
		}
	}
	numAnimation(".hero", ".hero .num");
});
