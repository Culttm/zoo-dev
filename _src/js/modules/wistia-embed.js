var $ = jQuery = require('jquery');
var loadExtScript = require('../lib/loadExtScript');

var Wistia_overlay = function(options) {
    this.ID = options.id;
    this.wistiaEmbed = null;
    this.loaded = false;

    var self = this;

    loadExtScript({
        src: 'http://fast.wistia.com/assets/external/E-v1.js',
        charset: 'ISO-8859-1',
        test: function() {
            return (typeof Wistia === 'object');
        },
        callback: function() {
            self.init();
        }
    });
}

Wistia_overlay.prototype.init = function () {
    this.create();
    this.onEnd();
};

Wistia_overlay.prototype.create = function () {
    var ID = this.ID


    this.wistiaEmbed = Wistia.embed(ID, {
        autoPlay: true,
        videoFoam: true,
        volume: 0,
        googleAnalytics: false,
        playButton: false,
        playbar: false,
        fullscreenButton: false,
        controlsVisibleOnLoad: false,
        smallPlayButton: false,
        volume: false,
        plugin: {
            cropFill: {
                src: "http://fast.wistia.com/labs/crop-fill/plugin.js"
            }
        }
    });
};

Wistia_overlay.prototype.play = function () {
    this.setToStart();
    this.wistiaEmbed.play()
};


Wistia_overlay.prototype.pause = function () {
    this.wistiaEmbed.pause();
};

Wistia_overlay.prototype.stop = function () {
    this.setToStart();
    this.wistiaEmbed.pause();
};

Wistia_overlay.prototype.setToStart = function () {
    this.wistiaEmbed.time(0);
};


Wistia_overlay.prototype.onEnd = function () {
    this.wistiaEmbed.bind('end', function() {
        this.play();
    }.bind(this));
};

Wistia_overlay.prototype.remove = function () {
    this.wistiaEmbed.remove();
};



module.exports = Wistia_overlay;
