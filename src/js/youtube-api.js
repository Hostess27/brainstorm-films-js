var exports = {};
// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = 'https://www.youtube.com/iframe_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady(filmId) {
  player = new YT.Player('player', {
      playerVars: {
        'autoplay': 0,
        'enablejsapi': 1,
        'origin': '',
        'playsinline': 1,
        'rel': 0,
        'showinfo': 0,
      },
    videoId: filmId,
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  // event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) 
{
  if (event.data == YT.PlayerState.PLAYING || event.data == YT.PlayerState.PAUSED) 
  {
    //снимаю фокус с проигрователя, чтобы можно было 
    //закрыть модалку по ESC когда видео воспроизводится
    document.getElementById('player').blur();
  }
}
function stopVideo() {
  player.stopVideo();
}

export { onYouTubeIframeAPIReady, onPlayerStateChange, stopVideo}