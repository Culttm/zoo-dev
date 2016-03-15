var $ = require('jquery');
var Expander = require('../modules/load-expander');

$(function() {

    // ====================================================
    var videoExpander = new Expander({
        url: 'assets/videos/data.json',
        container: $('#video'),
        countRows: 1,
        generalText: 'Показать все трейлеры',
        closeText: 'Скрыть трейлеры',
        tpl:'<div class="b-video loaded">' +
                '<a href="<%this.url%>" class="media fancybox.iframe b-video__placeholder__wrapper">' +
                    '<img class="b-video__placeholder" src="<%this.thumb%>" >' +
                '</a>' +
                '<div class="b-video__caption">' +
                    '<div class="b-video__time"><%this.time%></div>' +
                    '<div class="b-video__text"><%this.caption%></div>' +
                '</div>' +
            '</div>'
    });

    $('#video').one('click.expander.video', '.js-load', function(e) {
        videoExpander.firstLoad($(this));
    });

    $('#video').on('click.expander.video', '.js-open', function() {
        videoExpander.show($(this));
    });

    $('#video').on('click.expander.video', '.js-close', function() {
        videoExpander.hide($(this));
    });

});
