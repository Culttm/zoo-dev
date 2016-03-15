var $ = require('jquery');
var MobileDetect = require('mobile-detect');


$(function() {

	
	if($(window).width() > 500){

		$('.zoo-carousel-lg').flickity({
	        lazyLoad: true,
	        draggable: false,
	        wrapAround: true,
	        arrowShape: '',
	        pageDots: false
	    });

	} else if ($(window).width() >= 320 && $(window).width() <= 500){

		$('.zoo-carousel-md').flickity({
	        lazyLoad: true,
	        draggable: true,
	        wrapAround: true,
	        arrowShape: '',
	        pageDots: true
	    });

	}else if($(window).width() <= 320) {

		$('.zoo-carousel-sm').flickity({
	        lazyLoad: true,
	        draggable: true,
	        wrapAround: true,
	        arrowShape: '',
	        pageDots: true
	    });

	};
	

 	$(document).on('click', '.js-map-toggle', function() {
 		
 		$(this).toggleClass('active-btn');
 		$('.js-map').toggleClass('vis');

 	});



 	$(document).on('mouseenter', '[data-location]', function(e) {
 		
 		var target = $(this).data('location');

 			$('.'+ target).addClass('active')

 	}).on('mouseleave', '[data-location]', function(e) {
 		
 		var target = $(this).data('location');

 			$('.'+ target).removeClass('active')

 	})

 	$(document).on('click', '[data-map-destination]', function () {
 		var index = $(this).data('map-destination');

 		$('.zoo-carousel-lg').flickity( 'select', index, false, true );

 		$('.js-map').removeClass('vis');
 		$('.js-map-toggle').removeClass('active-btn');

 	});





})