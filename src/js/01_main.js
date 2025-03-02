jQuery(document).ready(function ($) {
	$("input[type=tel]").inputmask("+7 999 999 99 99");
	$("[data-fancybox]").fancybox({
		autoFocus: false,
		touch: false,
	});

	if ($(window).width() < 992) {
		$(".info-item-services").after($(".about"));
		$(".single-vakancy-card").after($(".agent"));
		$(".calendar-wrapper").after($(".calendar__btn"));
		$(".tarif-slider").before($(".tarif__title"));
		// toggle widget
		$(".widget__logo").on("click", function (e) {
			e.preventDefault();
			$(".widget-block").slideToggle();
			$(".widget-block").toggleClass("active");
		});
	} else {
		$(".info").after($(".about"));
		$(".sidebar-banner").before($(".agent"));

		// toggle widget
		$(".widget__logo").on("mouseenter", function () {
			$(".widget-block").slideDown();
		});
		$(".widget").on("mouseleave", function () {
			$(".widget-block").slideUp();
		});

		$(".has-children").each(function () {
			const userBlock = $(".header-user-block");

			$(this).append(userBlock);
		});
	}
	$(window).resize(function () {
		if ($(window).width() < 992) {
			$(".info-item-services").after($(".about"));
			$(".single-vakancy-card").after($(".agent"));
		} else {
			$(".info").after($(".about"));
			$(".sidebar-banner").before($(".agent"));
		}
	});
	$(".cards-item__link").on("click", function (e) {
		e.preventDefault();

		$(this).closest(".cards-item").toggleClass("active");
	});
	$(".cards-item-close").on("click", function (e) {
		e.preventDefault();

		$(this).closest(".cards-item").toggleClass("active");
	});

	$(".dropdown-item__title").on("click", function () {
		$(this).next().slideToggle();
	});

	$(".header-mobile-submenu, .header-submenu").prev().append(`<span class="arrow"><svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.3333 1L5.66667 5.66667L1 1" stroke="white" stroke-opacity="0.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
</span>`);
	$(".header-submenu").parents(".header-menu__item").addClass("has-children");

	$(".header-menu-btn").on("click", function () {
		$(".header-nav").slideToggle();
		$(this).toggleClass("active");
		$("body").toggleClass("overflow");
	});
	$(".header-menu__item .arrow").on("click", function (e) {
		e.preventDefault();
		$(this).parents(".has-children").addClass("active");

		$(this).parent().next().slideToggle();
		$(this).toggleClass("active");
		if ($(this).parents(".has-children").find(".arrow.active").length == 0) {
			$(this).parents(".has-children").removeClass("active");
		}
	});
	let subMenuHeight = 0;
	$(".header-submenu").each(function () {
		if ($(this).outerHeight() > subMenuHeight) {
			subMenuHeight = $(this).outerHeight();
		}
	});

	$(".header").css("--mh", subMenuHeight + 150 + "px");
	$(window).resize(function () {
		$(".header").css("--mh", subMenuHeight + 150 + "px");
	});

	var individualGrid = $(".individual-grid .grid").isotope({
		itemSelector: ".grid-item",
		layoutMode: "fitRows",
		fitRows: {
			equalheight: true,
		},
	});
	$(".individual-nav").on("click", "button", function () {
		var filterValue = $(this).attr("data-filter");
		individualGrid.isotope({
			filter: filterValue,
		});
	});
	function partnersFilter() {
		var $grid = $(".loyalty-grid .grid").isotope({
			itemSelector: ".grid-item",
			layoutMode: "fitRows",
			fitRows: {
				equalheight: true,
			},
		});

		$(".loyalty-nav").on("click", "button", function () {
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
	// filter();
	// загрузка партнеров по API

	function loadPartners() {
		const partnersAPI = "http://212.193.30.89:8000/api/logo_partners/";
		const navBlock = $(".loyalty-nav");
		const contentBlock = $(".loyalty .grid");

		function getContentItem(item, data) {
			// let link = item.link ? '<a href="#" class="loyalty-item__title">LIGALT</a>' : '';
			// let description = '<div class="loyalty-item__text">Юридическая компания по спорам с застройщиками</div>';
			let tag = `<a href="#" class="loyalty-item__tag" data-filter=".${data.translit}">#${data.name} </a>`;
			let image = `	<div class="loyalty-item__image">
			<img src="${item.img}" alt="" />
		</div>`;
			let categorySlug = data.translit;
			let html = `<div class="grid-item ${categorySlug}">
				<div class="loyalty-item">					
					${image}	
					${tag}
				</div>
			</div>
			`;
			return html;
		}

		function getNavItem(item) {
			let slug = item.translit,
				name = item.name;
			let html = `<button data-filter=".${slug}" class="loyalty-nav__item">${name}</button>`;
			return html;
		}
		$.ajax({
			url: partnersAPI,
			dataType: "json",
			success: function (data) {
				console.log(data);

				data.forEach((item) => {
					navBlock.append(getNavItem(item));
					item.kategoriya.forEach((element) => {
						contentBlock.append(getContentItem(element, item));
					});
				});

				partnersFilter();
			},
		});
	}
	loadPartners();
});
