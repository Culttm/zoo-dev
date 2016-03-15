var $ = jQuery = require('jquery');
var MobileDetect = require('mobile-detect');

var TrailerYoutube = require('../modules/youtube-trailer');
var Wistia_overlay = require('../modules/wistia-embed.js');


var Trailer = function(options) {
    this.wistia_id = options.wistia;
    this.youtube_id = options.youtube;
    this.youtubeContainer = options.youtubeContainer;
    this.trailerYoutube = null;
    this.wistiaOverlay = null;
}

Trailer.prototype.create = function() {

    var self = this;

    this.trailerYoutube = new TrailerYoutube({
        id: self.youtube_id,
        player: self.youtubeContainer
    });

    this.wistiaOverlay = new Wistia_overlay({
        id: self.wistia_id
    });
};

Trailer.prototype.play = function () {
    this.trailerYoutube.playVideo()
    this.wistiaOverlay.pause()
};

Trailer.prototype.stop = function () {
    this.trailerYoutube.pauseVideo()
    this.wistiaOverlay.play()
};

$(function() {


    if($(window).width() > 540){

        var wistia = $('#wistiaEmbed-wrapper'),
            youtube = $('#youtubeEmbed-wrapper');

        var trailer = new Trailer({
            wistia: wistia.data('vid'),
            youtube: youtube.data('vid'),
            youtubeContainer: "player"
        });

        trailer.create();


        $(document).on('click.trailer.play', '#play-video-btn' ,function() {
            youtube.addClass('show')
            trailer.play();
        });

        $(document).on('click.trailer.stop', '#youtubeEmbed-close', function() {
            youtube.removeClass('show')
            trailer.stop();
        });

        $(document).on('keydown', function(e) {
            if(e.keyCode == 27){
                $('#youtubeEmbed-close').trigger('click.trailer.stop');
            }
        });
        
    }


})
