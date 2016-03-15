var $ = jQuery = require('jquery');
var Promise = require('promise-polyfill');
var SimpleTpl = require('../lib/SimpleTpl');

var Expander = function(o) {
    this.data = null;
    this.url = o.url;
    this.tpl = o.tpl;
    this.container = o.container;
    this.countRows = o.countRows;
    this.generalText = o.generalText;
    this.closeText = o.closeText;
    this.appendTarget = $(this.container).find('.js-append');

    this.classNames = o.classNames || {
        "load"  : "js-load",
        "open"  : "js-open",
        "close" : "js-close"
    };

    this.onResize();
};


Expander.prototype.onResize = function () {
    var self = this;

    $(window).on('resize.expanders', function() {
        var el = $(self.container).find('.load-more__control');
        self.hide(el)
    });
};


Expander.prototype.loadData = function() {
    var self = this;
    return Promise.resolve($.getJSON(self.url));
};


Expander.prototype.firstLoad = function (el, callback) {
    var items = [];

    var self = this,
        loadedData = this.loadData();

    loadedData.then(function(data) {

        $(data).each(function(i, el) {
            var item = SimpleTpl(self.tpl, el);
                items.push(item);
        });

    }).then(function(){

        self.appendTarget.append(items);

        $(el)
            .removeClass(self.classNames['load'])
            .removeClass(self.classNames['open'])
            .addClass(self.classNames['close'])
            .find('span')
            .text(self.closeText)


    })
    .then(function() {
        var etalon = self.appendTarget.children().eq(0),
            h = (etalon.height() * self.countRows) + (parseInt(etalon.css('margin-bottom'))  * self.countRows);

        self.appendTarget.height(Math.floor(h));

        self.appendTarget.find('.loaded img').each(function() {
            $(this).attr('src', $(this).attr('src') )
        })

        self.appendTarget.find('img').on('load', function() {
            self.appendTarget.height(self.appendTarget.get(0).scrollHeight).addClass('open-container');
            self.appendTarget.find('.loaded').removeClass('loaded');
        });

    });

};

Expander.prototype.show = function (el) {

    var self = this;

    self.appendTarget
        .css({
            height: self.appendTarget.get(0).scrollHeight
        })
        .addClass('open-container');

        if(el){
            $(el)
            .removeClass(self.classNames['load'])
            .removeClass(self.classNames['open'])
            .addClass(self.classNames['close'])
            .find('span')
            .text(self.closeText)
        }

};

Expander.prototype.hide = function (el) {

    var self = this,
        etalon = self.appendTarget.children().eq(0),
        h = (etalon.height() * self.countRows) + (parseInt(etalon.css('margin-bottom'))  * self.countRows) - 1;

        self.appendTarget.css({
            height: h
        }).removeClass('open-container');

        if(el){
            this.hideClassess(el);
        }

};

Expander.prototype.hideClassess = function (el) {

    $(el)
        .removeClass(this.classNames['close'])
        .addClass(this.classNames['open'])
        .find('span')
        .text(this.generalText)

};

module.exports = Expander;
