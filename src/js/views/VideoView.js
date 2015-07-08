define(
  [
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'config',
    'jquery_ui',
    'jquery_ui_touch_punch'
  ],
  function(jQuery, _, Backbone, templates, config) {
    return Backbone.View.extend({
        initialize: function() {
            this.listenTo(Backbone, "window:resize", this.resizeVideo);
            this.listenTo(Backbone, "video:show", this.showVideo);
            this.listenTo(Backbone, "router:search", this.skipVideo);
            this.listenTo(Backbone, "router:detail", this.skipVideo);
            this.listenTo(Backbone, "router:info", this.skipVideo);
        },
        render: function(data) {
            this.$el.html(this.template({ video_name: "RapeKitsFinal", isMobile: config.isMobile, isTablet: config.isTablet }));
            this.$video = this.$('#introvid');
            this.video = this.$video[0];
            this.addVideoListeners();
            this.resizeVideo();
            return this;
        },
        template: templates["IntroVideo.html"],
        resizeVideo: function() {
            if (!config.isMobile && !config.isTablet) {
                var $videoEl = this.$('video');
                if (window.innerWidth / window.innerHeight < 1920 / 1080) {
                    var numWidth = 100 * ((1920 / 1080) / (window.innerWidth / window.innerHeight));
                    $videoEl.css({"width" : numWidth.toString() + "%", "left" : ((100 - numWidth) / 2).toString() + "%"});
                } else {
                    $videoEl.css({"width" : "100%", "left" : "0%"});
                }
            }
            
        },
        events: {
            "click .iapp-video-skip-button": "skipVideo",
            "click .iapp-tablet-play-button": "play"
        },
        play: function() {
            console.log("play");
            this.video.play();
        },
        onVideoEnd: function() {
            this.$('.video-wrap').fadeOut();
            Backbone.trigger('video:end');
        },
        showVideo: function() {
            this.video.play();
            this.$('.video-wrap').fadeIn();
        },
        skipVideo: function() {
            this.$('.video-wrap').hide();
            Backbone.trigger('video:end');
            this.video.pause();
        },
        addVideoListeners: function() {
            var video = this.video,
                $video = this.$video,
                onVideoEnd = this.onVideoEnd,
                $videoPlayButton = this.$("#play-pause"),
                $videoContainer = this.$(".video-wrap"),
                $videoControls = this.$("#video-controls"),
                $touchVideoControls = this.$(".touch-video-controls"),
                $videoPlayFallback = this.$("#video-play-fallback"),
                $videoCloseButton = this.$(".video-close-button"),
                $videoSeekBar = this.$("#seek-bar"),
                $videoSeekDot = this.$("#video-dot");
                $tabletPlayButton = this.$('.iapp-tablet-play-button');


            // Event listener for the play/pause button
            $videoPlayButton.on("click", function() {
              if (video.paused === true) {
                // Play the video
                video.play();

              } else {
                // Pause the video
               video.pause();

              }
            });

            //enable seeking with control dot
            $videoSeekDot.draggable({ 
              containment: "parent",
              axis: "x",
              stop: function( event, ui ) {
                dotWidth = $videoSeekDot.outerWidth();
                range = $videoSeekBar.outerWidth() - dotWidth;
                position = ui.position.left;
                currentPercent = position / range;
                newTime = currentPercent * video.duration;
                video.currentTime = newTime;
              }
            });

            //updates position of video control dot
            video.addEventListener("timeupdate", function(e) {
              dotWidth = $videoSeekDot.outerWidth();
              range = $videoSeekBar.outerWidth() - dotWidth;
              currentProgress = video.currentTime / video.duration;
              newPosition = range * currentProgress;
              $videoSeekDot.css("left", newPosition + "px");
            });

            $videoSeekBar.on("click", function(e) {
              var newPosition = 0;
              if (e.offsetX !== undefined) {
                newPosition = e.offsetX;
              }
              else {
                newPosition = e.originalEvent.layerX;
              }

              range = $videoSeekBar.outerWidth() - dotWidth;
              newPercent = newPosition/range;
              newTime = newPercent * video.duration;
              video.currentTime = newTime;
            });

            //keep the controls updated to whether or not video is playing
            video.addEventListener("playing", function(e) {
              $videoPlayButton.addClass("pause");
              $videoPlayButton.removeClass("play");
              $tabletPlayButton.hide();

            });

            video.addEventListener("pause", function(e) {
              $videoPlayButton.removeClass("pause");
              $videoPlayButton.addClass("play");
              $tabletPlayButton.show();
            });

            video.addEventListener("ended", onVideoEnd.bind(this));

            $videoContainer.on("mouseover", function(e) {
                $videoControls.fadeIn();
            });

            $videoContainer.on("mouseleave", function(e) {
                $videoControls.fadeOut();
            });

            $videoCloseButton.click(function(e) {
                video.pause();
                $videoContainer.fadeOut();
                Backbone.trigger("video:end");
           });
        }
    });


});
