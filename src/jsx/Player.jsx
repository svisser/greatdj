/**
 * @jsx React.DOM
 */

var React = require('react');
var sdk = require('require-sdk')('https://www.youtube.com/iframe_api', 'YT');
var loadTrigger = sdk.trigger();

// YT API requires global ready event handler
window.onYouTubeIframeAPIReady = function () {
  loadTrigger();
  delete window.onYouTubeIframeAPIReady;
};


var Player = React.createClass({
  getInitialState: function(){
    return {player: {}};
  },

  componentDidMount: function() {
    var that = this;
    // called once API has loaded.
    sdk(function(err, youtube) {
      var player = new youtube.Player("youtube-player", {
        videoId: that.props.videoId,
        events: {
          'onStateChange': that._handlePlayerStateChange
        }
      });

      that.setState({player: player});
    });

    window.addEventListener('restartVideo', function(e){
      that._restartCurrentVideo();
    });
  },

  componentWillUpdate: function(nextProps) {
    if (this.props.videoId !== nextProps.videoId) {
      this._loadNewUrl(nextProps.videoId);
    } else if (this.props.position !== nextProps.position && !this.state.player.getPlayerState()){
      this._loadNewUrl(nextProps.videoId);
    }
  },

  _loadNewUrl: function(videoId) {
    this.props.autoplay
      ? this.state.player.loadVideoById(videoId, 0)
      : this.state.player.cueVideoById(videoId);
  },

  _restartCurrentVideo: function(){
    this.state.player.seekTo(0);
  },

  _handlePlayerStateChange: function(event) {
    switch(event.data) {
      case 0:
        this.props.ended();
        break;

      case 1:
        this.props.playing();
        break;

      case 2:
        this.props.stopped();
        break;

      default:
        return;
    }
  },

  render: function() {
    return (
      <div id="youtube-player">
        <div></div>
      </div>
    );
  }

});

module.exports = Player;
