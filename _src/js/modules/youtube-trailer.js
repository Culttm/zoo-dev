var $ = jQuery = require('jquery');

var YTPlayer = function(options){

    this.id = options.id;
    this.player = options.player;
    this.initialized = !1,
    this.playerYoutube = null ,
    this.vidID = null ,
    this.dur = null ,
    this.state = -1,
    this.midTracked = null ,
    this.timeout = null ,
    this.initialPlayed = !1,
    this.playerReady = !1,
    this.trackID = null ,
    this.autoplayOnReady = !1,
    this.events = {
        start: [],
        midpoint: [],
        end: [],
        pause: [],
        resume: []
    };

    this.initPlayer(this.id)

};


YTPlayer.prototype.initPlayer = function(n) {

    var $this = this;

    $this.vidID = n;


    if ($this.initialized) {
        $this.onYouTubeIframeAPIReady(n);
        return
    }
    window.onYouTubeIframeAPIReady = function(n) {
        $this.onYouTubeIframeAPIReady(n)
    }
    //
    if (typeof window.YT !== 'function') {
        $.getScript("//www.youtube.com/iframe_api")
    }

};


YTPlayer.prototype.onYouTubeIframeAPIReady = function(n) {
    var $this = this;


    $this.playerYoutube = new YT.Player(this.player,{
        height: "100%",
        width: "100%",
        videoId: $this.vidID,
        playerVars: {
            enablejsapi: 1,
            // origin: document.domain,
            rel: 0,
            autohide: 1,
            controls: 2,
            wmode: "transparent",
            autoplay: 0
        },
        events: {
            onReady: $this.onPlayerReady,
            onStateChange: $this.onPlayerStateChange
        }
    });
};


YTPlayer.prototype.onPlayerReady = function() {
    this.initialized = 1;
    console.log('ready!');
};

YTPlayer.prototype.onPlayerStateChange = function(e) {
    if(e.data === 0) {
        this.playerYoutube.stop();
    }
};


YTPlayer.prototype.playVideo = function(){
    this.playerYoutube.playVideo();
}


YTPlayer.prototype.pauseVideo = function(){
    this.playerYoutube.pauseVideo();
}

YTPlayer.prototype.stopVideo = function(){
    this.playerYoutube.stopVideo();
}

module.exports =  YTPlayer;
