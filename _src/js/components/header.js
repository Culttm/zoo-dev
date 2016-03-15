var $ = require('jquery');
var FastClick = require('fastclick');
var MobileDetect = require('mobile-detect');

$(function(){


	var md = new MobileDetect(window.navigator.userAgent);
	md.mobile() ? $('html').addClass('mobile') : $('html').addClass('not-mobile') 

	if ('addEventListener' in document) {
		document.addEventListener('DOMContentLoaded', function() {
			FastClick.attach(document.body);
		}, false);
	};

	$(document).on('click.navanchor', '[href^="#"]', function(e){
		e.preventDefault();


		var target = $(this).attr('href'),
		offset = $(target).offset(),
		minus = 50;

		if(offset){
			history.pushState(null, null, target);
			$('html, body').stop(true, true).animate({
				scrollTop: offset.top - minus
			}, 1000);

		};

	});

	$(window).on('scroll', function() {
		if($(window).scrollTop() > 0) {
			$('.header').addClass('scrolled');
		}else{
			$('.header').removeClass('scrolled');
		}
	})


});