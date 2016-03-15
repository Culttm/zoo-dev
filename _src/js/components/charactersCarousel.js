var $ = require('jquery');
require('jquery-bridget');
require('../lib/onScreen.js');
var Flickity = require('flickity');

$.bridget( 'flickity', Flickity );


$(function() {
    var chCarousel = $('.full-width-carousel').flickity({
        lazyLoad: true,
        draggable: true,
        wrapAround: true,
        arrowShape: ''
    });

})
