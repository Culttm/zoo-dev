var $ = require('jquery');
require('jquery-bridget');

var Expander = require('../modules/load-expander');
var Flickity = require('flickity');

$.bridget( 'flickity', Flickity );

$(function() {


    var stillExpander = new Expander({
        url: 'assets/stills/data.json',
        container: $('#stills'),
        countRows: 2,
        generalText: 'Показать все кадры',
        closeText: 'Скрыть кадры',
        tpl: '<div class="b-stills__item js-still-gallery loaded"><img src="<%this.thumb%>"></div>'
    });


    $('#stills').one('click.expander.stills', '.js-load', function(e) {
        stillExpander.firstLoad($(this));
    });

    $('#stills').on('click.expander.stills', '.js-open', function() {
        stillExpander.show($(this));
    });

    $('#stills').on('click.expander.stills', '.js-close', function() {
        stillExpander.hide($(this));
    });


    // Miobile stills carousel
    $('#stills_carousel').flickity({
        lazyLoad: true,
        draggable: false,
        wrapAround: true,
        arrowShape: '',
        watch: true
    });

});
