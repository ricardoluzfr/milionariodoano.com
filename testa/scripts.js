$.get("https://ssl.geoplugin.net/json.gp?k=292af9fb00c1353d", function (resp) {
    //var data = JSON.parse(resp);
    $("#locationJS").html(resp.geoplugin_city);
});

//Controle player Youtube 
var player;
var firstTimePlaying = true;
var isVideoLoaded = false;
var playerState;

(function () {
    $('#video').load(function () {
        player = new YT.Player('video', {
            width: '100%',
            //videoId: '_pu9wCjLXlw',

            events: {
                'onReady': function (event) {
                    $(document).trigger('player.video.loaded');
                    isVideoLoaded = true;

                    //console.log('automute');
                    player.unMute();
                    //$('.video-paused-btn').hide();
                },
                'onStateChange': function (event) {
                    playerState = event;
                    if (event.data === YT.PlayerState.PLAYING) {
                        $(document).trigger('player.video.started');
                        $('.youtube-overlay').attr('style', 'display:block!important');

                        $('.play-text').fadeOut(400);

                        if ($('body, html').width() > 1000 && firstTimePlaying === false) {
                            $('.new-video-container').addClass('new-video-fullscreen');
                        }

                        // Fix iOS YT player muted
                    }
                    if (event.data === YT.PlayerState.PAUSED) {
                        $(document).trigger('player.video.paused');
                        $('.video-pause').show();

                        $('.new-video-container').removeClass('new-video-fullscreen');

                        $('.new-video-container .video-border').height('auto');
                        $('.new-video-container .video-border, .new-video-container, .new-video-container .video, .new-video-container iframe').attr('style', '');

                        //console.log('paused');
                    }
                }
            }
        });

        $(document).on('player.video.loaded', function () {
            var playButton = document.getElementById("play-button-video");
            var videoStarted = false;

            //autoPlay
            if (playButton) {
                $("#play-button-video").css('background', 'none');

            }
            videoStarted = true;
            player.playVideo();

            // play button
            if (playButton) {
                playButton.addEventListener("click", function () {
                    if (!videoStarted) {
                        $("#play-button-video").css('background', 'none');
                        videoStarted = true;
                    }

                    if (player.getPlayerState() === 1 && firstTimePlaying === false) {
                        player.pauseVideo();
                        $('.video-paused-btn, .continue-text, #navbar, .headerContent').fadeIn(400);
                    } else {
                        player.unMute();
                        player.playVideo();
                        $('#navbar, .headerContent').hide();
                        $('.headerContent').hide();
                        $('.video-paused-btn, .continue-text').fadeOut(400);
                    }

                    firstTimePlaying = false;
                });
            }

            setInterval(function () {

                $(document).trigger('player.video.playing', [{
                    playbackTime: player.getCurrentTime(),
                    videoLength: player.getDuration()
                }]);
            }, 1000);
        });
    })
})();

var videoDivHeight;
var videoPaused = false;
var btnSoundClick = false;

$(document).ready(function () {


    $(document).trigger('player.video.play');

    countWrapperHeight();

    $(window).resize(function () {
        countWrapperHeight();
    });

    $('.wistia-video-container').click(function () {
        var that = $(this);
        fullScreenVideo(that);
    });

    $('.video-paused-btn, .continue-text, .yt-thumbnail').on('click', function () {

        var video = $('.wistia-video-container video');
        video.prop('muted', false);
        // video.get(0).play();

        if (typeof player !== 'undefined') {
            player.unMute();
            player.playVideo();
        }

        $('body').addClass('full-body-video');
        countWrapperHeight();
    });

    // concerta altura do video no mobile
    if ($('body').hasClass('mobile')) {
        var videoBoxHei = $('#video-box').height();
    }

    $(document).on("player.video.loaded", function () {
        videoDivHeight = $('.wistia-video-container').height();
        player.seekTo(0.1, true);
    });

    $(document).on("player.video.started", function () {

        $('#play-button-video').css('background', 'none');
        $('.continue-text').hide();
        videoPaused = false;
    });

    $(document).on("player.video.paused", function () {
        videoPaused = true;
        $('.video-paused-btn').show();

        var videoOffsetBottom = $('.video-absolute').offset().top + $('.video-absolute').height();

        if ($(window).scrollTop() < videoOffsetBottom)
            $('.continue-text').show();


        $('body').removeClass('full-body-video');
        countWrapperHeight();
    });

    function fullScreenVideo(that) {
        var video = that.find('video').get(0);
        $('.unmute-text').hide();

        if (btnSoundClick === true) {
            $('body').removeClass('full-body-video');
            player.pauseVideo();
            btnSoundClick = false;
        }

        if (videoPaused === true) {

            countWrapperHeight();
            $('.continue-text').show();
        } else {
            $('body').addClass('full-body-video');
            countWrapperHeight();
            $('.video-paused-btn, .btn-sound-on, .continue-text').hide();

            // Concerta erros na barra de endereÃ§os do iOS
            if ($('body').hasClass('mobile')) {
                $('html, body').animate({
                    scrollTop: -100
                }, 100);
            } else {
                window.scroll(0, 0);
            }
        }
    }

    function countWrapperHeight() {
        if ($('body').hasClass('full-body-video')) {
            var videoHei = $('.wistia-video-container').height() - $('#video-box .wrapper').offset().top;
            // Coloca conteudo abaixo do video
            $('#video-box .wrapper').height(videoHei);
        } else {
            $('#video-box .wrapper').height('auto');
        }
    }

});