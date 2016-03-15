var $ = require('jquery');
var Promise = require('promise-polyfill');
var SimpleTpl = require('../lib/SimpleTpl');

require('jquery-bridget');

var Flickity = require('flickity');
require('flickity-as-nav-for');

$.bridget( 'flickity', Flickity );


var Gallery = function(o) {

    this.index = o.index || 0;
    this.offset = o.offset;
    this.url = o.url;
    this.tplBig = o.tplBig;
    this.tplSmall = o.tplSmall;

    this.overlay = $('<div />', {
        class: 'gallery-overlay'
    });

    this.gallery =  $('<div />', {
        class: 'b-gallery'
    });

    this.close =  $('<div />', {
        class: 'b-gallery__close'
    });

    this.carousel = null;
    this.thumbnailsCarousel = null;

    this.init();

};


Gallery.prototype.init = function () {
    this.build();

    this.overlay.on('click.gallery', function() {
        this.destroy()
    }.bind(this));

    this.close.on('click.gallery', function() {
        this.destroy()
    }.bind(this));


    $(document).on('keydown.gallery', function(e) {
        if(e.keyCode == 27){
            this.destroy()
        }
    }.bind(this));


};


Gallery.prototype.createGalleryGlobal = function () {

    this.gallery.appendTo('body');
    this.overlay.appendTo('body');
    this.close.appendTo(this.gallery);

    setTimeout(function() {
        this.gallery.addClass('visible')
        this.overlay.addClass('visible')
    }.bind(this), 350)

    // this.setHeight();
    this.onResize();

};

Gallery.prototype.destroy = function () {

    this.gallery.removeClass('visible');

    this.overlay.removeClass('visible');

    setTimeout(function() {
        this.gallery.remove();
        this.overlay.remove();
    }.bind(this), 350)

    $(window).off('resize.gallery');
    $(window).off('keypress.gallery');
    this.overlay.off('click.gallery');
    this.thumbnailsCarousel.off('click.gallery');


};


Gallery.prototype.loadData = function() {
    var self = this;
    return Promise.resolve($.getJSON(self.url));
};


Gallery.prototype.build = function () {

    var self = this;
    var loadedData = this.loadData();

        console.log(loadedData)

        loadedData.then(function(data) {

            var itemsBig = [];
            var itemsSmall = [];

            console.log(data)

            $(data).each(function(i, el) {
                var itemBig = SimpleTpl(self.tplBig, el);
                    itemsBig.push(itemBig);

                var itemSmall = SimpleTpl(self.tplSmall, el);
                    itemsSmall.push(itemSmall);
            });

            var carouselItems = {
                itemsBig: itemsBig,
                itemsSmall: itemsSmall
            };

            return carouselItems;

        }).then(function(carouselItems) {

            self.carousel  = $('<div />', {
                class: 'b-gallery-carousel b-carousel',
                id: 'gallery-carousel'
            });

            self.thumbnailsCarousel  = $('<div />', {
                class: 'b-gallery-carousel--thumbnail b-carousel',
                id: 'gallery-thumbnails-carousel'
            });

            $(self.carousel).append(carouselItems['itemsBig']);

            $(self.thumbnailsCarousel).append(carouselItems['itemsSmall']);

            $(self.gallery)
                .append(self.carousel)
                .append(self.thumbnailsCarousel);

        }).then(function() {

            self.createGalleryGlobal()

        }).then(function() {

            $(self.carousel).flickity({
                lazyLoad: true,
                draggable: true,
                arrowShape: '',
                pageDots: false,
                setGallerySize: false
            });

            $(self.thumbnailsCarousel).flickity({
                draggable: false,
                arrowShape: '',
                pageDots: false,
                prevNextButtons: false,
                contain: true,
                asNavFor: $(self.carousel)[0]
            });

            self.goTo( self.index , true);

            self.carousel.focus()

            $(self.thumbnailsCarousel).on('click.gallery', '.b-gallery__item--thumbnail', function() {
                var index = $(this).index();
                self.goTo( index )
            });


        }).then(function() {
            self.setHeight();
        });
};

Gallery.prototype.goTo = function (i, isInstant) {
    var self = this;
    var isInstant = isInstant || false;
    $(self.carousel).flickity( 'select', i, false, isInstant );
};

Gallery.prototype.setHeight = function () {
    var self = this;
    var thHeight = this.thumbnailsCarousel.height();
    var height = $(window).height() - this.offset;

    this.carousel.css({
        height: height - thHeight
    });

};

Gallery.prototype.onResize = function () {
    var self = this;

    $(window).on('resize.gallery', function() {
        clearTimeout(window.resizedFinished);
        window.resizedFinished = setTimeout(function(){
            self.setHeight()
        }, 250);
    });

};


$(function() {

    $(document).on('click.gallery.build', '.js-still-gallery', function(e) {
        e.preventDefault();
        var index = $(this).index();

        var gallery = new Gallery({
            index: index,
            offset: 60,
            url: 'assets/stills/data-popup.json',
            tplBig: '<div class="b-gallery__item"><img data-flickity-lazyload="<%this.big%>"></div>',
            tplSmall: '<div class="b-gallery__item--thumbnail"><img src="<%this.thumb%>"></div>'
        });

    });

});
