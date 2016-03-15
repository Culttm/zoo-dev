var $ = require('jquery');

$(function() {
	
	var gtmEvent = function(category, action, label) {

		var obj = {
	        'event': 'gaEvent',
	        'gaEventCategory': category,
	        'gaEventAction': action,
	        'gaEventLabel': label,
	        'gaEventValue': undefined
		};

		window.dataLayer.push(obj);

		// console.log(window.dataLayer)
	};


	// Запуск трейлера в первом экране
	$(document).on('click touchend', '#play-video-btn', function(e) {
		e.preventDefault();
		gtmEvent('trailer', 'played', 'zootopia main');
	});

	//Нажатие кнопки покупки билетов в первом экране 
	$(document).on('click touchend', '[data-buy="1"]', function(e) {
		e.preventDefault();
		gtmEvent('ticket', 'purchased', 'zootopia main');
	});

	// Нажатие кнопки покупки билетов в блоке описания фильма
	$(document).on('click touchend', '[data-buy="2"]', function(e) {
		e.preventDefault();
		gtmEvent('ticket', 'purchased', 'zootopia main');
	});

	// Запуск любого видео в блоке видео
	$(document).on('click touchend', '#video .media', function(e) {
		e.preventDefault();

		var title = $(this).closest('.b-video').find('.b-video__text').text();

		gtmEvent('video', 'played', title);
	});


	// Социальные шары в шапке
	$(document).on('click touchend', '.b-socials .b-socials__link', function(e) {
		e.preventDefault();

		var type = $(this).data('link-class');

		gtmEvent('content', 'shared', type);
	});


	// Клик в верхнее меню навигации
	$(document).on('click touchend', '.b-nav__link', function(e) {
		e.preventDefault();

		var type = $(this).attr('href');

		gtmEvent('menu', 'clicked', type);
	});

	// Карусель героев
	$('#characters .b-carousel').on('settle', function(e) {
		var index = $(this).data('flickity').selectedIndex;

		gtmEvent('content', 'viewed', 'Heroes Slot '+ index+1);
	});


	// Кадры
	$(document).on('click touchend', '.js-still-gallery', function(e) {
		e.preventDefault();

		var index = $(this).index();

		gtmEvent('content', 'viewed', 'Stills Slot '+index + 1);
	});	

	// Подвал
	$(document).on('click touchend', '.foo-nav a', function(e) {
		e.preventDefault();

		var index = $(this).parent('li').index();

		gtmEvent('link', 'clicked', index);
	});


	// Все виедо
	$(document).on('click touchend', '#video .js-load', function(e) {
		e.preventDefault();

		gtmEvent('content', 'viewed', 'All Videos');
	});

	// Все кадры
	$(document).on('click touchend', '#stills .js-load', function(e) {
		e.preventDefault();

		gtmEvent('content', 'viewed', 'All Stills');
	});

})