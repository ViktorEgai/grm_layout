$(document).ready(function () {
	function filter() {
		var $grid = $(".grid").isotope({
			itemSelector: ".grid-item",
			layoutMode: "fitRows",
			fitRows: {
				equalheight: true,
			},
		});

		$(".loyalty-nav, .individual-nav").on("click", "button", function () {
			var filterValue = $(this).attr("data-filter");
			$grid.isotope({
				filter: filterValue,
			});
		});
		$(".loyalty-item__tag").on("click", function (e) {
			e.preventDefault();
			var filterValue = $(this).attr("data-filter");
			$grid.isotope({
				filter: filterValue,
			});
			$(".loyalty-nav__item").each(function () {
				if ($(this).attr("data-filter") == filterValue) {
					$(this).addClass("active");
				} else {
					$(this).removeClass("active");
				}
			});
		});
		$(".loyalty-nav").each(function (i, buttonGroup) {
			var $buttonGroup = $(buttonGroup);
			$buttonGroup.on("click", "button", function () {
				$buttonGroup.find(".active").removeClass("active");
				$(this).addClass("active");
			});
		});
	}
	filter();
});
