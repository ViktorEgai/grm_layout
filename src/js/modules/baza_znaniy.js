$(document).ready(function () {
	// Константы для селекторов
	const SELECTORS = {
		bazaNavItem: ".baza-nav__item",
		bazaItem: ".baza-item",
		playlistNavItem: ".playlist-nav__item",
		playlistItem: ".playlist-item",
		playlistVideoNavItem: ".playlist-video-nav__item",
		playlistVideoItem: ".playlist-video",
		bazaSlider: ".baza-item-slider",
		videoDescrMore: ".playlist-video-descr-top__more",
		videoDescrText: ".playlist-video-descr__text",
		videoIframe: ".playlist-video iframe, .playlist-video video",
	};

	// Функция для остановки всех видео в указанном элементе
	function stopAllVideos(container) {
		container.find(SELECTORS.videoIframe).each(function () {
			const $media = $(this);

			// Для iframe (YouTube, Vimeo и т.д.)
			if ($media.is("iframe")) {
				const src = $media.attr("src");
				$media.attr("src", "").attr("src", src); // Сброс src останавливает видео
			}

			// Для HTML5 video
			if ($media.is("video")) {
				$media.get(0).pause();
				$media.get(0).currentTime = 0;
			}
		});
	}

	// Инициализация всех компонентов
	function init() {
		initYearsTabs();
		initSlider();
		initVideoDescriptionToggle();
	}

	// Работа с табами годов
	function initYearsTabs() {
		const $bazaNavItems = $(SELECTORS.bazaNavItem);
		const $bazaItems = $(SELECTORS.bazaItem);

		// Активируем первый элемент по умолчанию
		activateTab($bazaNavItems, $bazaItems, 0);

		$bazaNavItems.on("click", function (e) {
			e.preventDefault();
			const index = $(this).index();
			activateTab($bazaNavItems, $bazaItems, index);
			$(SELECTORS.bazaSlider).slick("setPosition", 0);
		});
	}

	// Активация таба
	function activateTab(navItems, contentItems, index) {
		// Останавливаем видео в неактивных табах
		contentItems.filter(".active").each(function () {
			stopAllVideos($(this));
		});

		navItems.eq(index).addClass("active").siblings().removeClass("active");
		contentItems.eq(index).addClass("active").siblings().removeClass("active");

		// Инициализируем плейлисты для активного таба
		initPlaylistTabs(contentItems.eq(index));
	}

	// Инициализация табов плейлистов
	function initPlaylistTabs(activeBlock) {
		const $playlistNavItems = activeBlock.find(SELECTORS.playlistNavItem);
		const $playlistItems = activeBlock.find(SELECTORS.playlistItem);

		// Активируем первый элемент по умолчанию
		activatePlaylistTab($playlistNavItems, $playlistItems, 0);

		$playlistNavItems.on("click", function (e) {
			e.preventDefault();
			const index = $(this).index();
			activatePlaylistTab($playlistNavItems, $playlistItems, index);
		});
	}

	// Активация таба плейлиста
	function activatePlaylistTab(navItems, contentItems, index) {
		// Останавливаем видео в неактивных табах
		contentItems.filter(".active").each(function () {
			stopAllVideos($(this));
		});

		navItems.eq(index).addClass("active").siblings().removeClass("active");
		contentItems.eq(index).addClass("active").siblings().removeClass("active");

		// Инициализируем видео для активного плейлиста
		initPlaylistVideoTabs(contentItems.eq(index));
	}

	// Инициализация табов видео в плейлисте
	function initPlaylistVideoTabs(activePlaylistTab) {
		const $videoNavItems = activePlaylistTab.find(SELECTORS.playlistVideoNavItem);
		const $videoItems = activePlaylistTab.find(SELECTORS.playlistVideoItem);

		// Активируем первый элемент по умолчанию
		activateVideoTab($videoNavItems, $videoItems, 0);

		$videoNavItems.on("click", function (e) {
			e.preventDefault();
			const index = $(this).index();
			activateVideoTab($videoNavItems, $videoItems, index);
		});
	}

	// Активация таба видео
	function activateVideoTab(navItems, contentItems, index) {
		// Останавливаем все видео в текущей группе
		contentItems.filter(".active").each(function () {
			stopAllVideos($(this));
		});

		navItems.eq(index).addClass("active").siblings().removeClass("active");
		contentItems.eq(index).addClass("active").siblings().removeClass("active");
	}

	// Инициализация слайдера
	function initSlider() {
		$(SELECTORS.bazaSlider).slick({
			speed: 300,
			arrows: false,
			slidesToShow: 3,
			slidesToScroll: 1,
			responsive: [
				{
					breakpoint: 992,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 1,
						dots: true,
					},
				},
				{
					breakpoint: 576,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
						dots: true,
					},
				},
			],
		});
	}

	// Переключение описания видео
	function initVideoDescriptionToggle() {
		$(document).on("click", SELECTORS.videoDescrMore, function () {
			const $descrText = $(this).closest(".playlist-video-descr").find(SELECTORS.videoDescrText);
			$descrText.slideToggle();
			$(this).hide();
		});
	}

	// Запуск инициализации
	init();
});
