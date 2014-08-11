/**
 * @jsx React.DOM
 */

var React = require('react');
var Player = require('./Player');
var Playlist = require('./Playlist');

var ResultsComponent = React.createClass({
  getInitialState: function() {
    return {
      playlist: [],
      position: -1,
      playing: false
    };
  },

  componentDidMount: function(){
    var that = this;

    window.addEventListener('enqueue', function(e){
      var playlist = that.state.playlist;
      playlist.push(e.detail);
      that.setState({playlist: playlist});
      that.handlePlaylistAdd(playlist);
    }, false);

    window.addEventListener('playNow', function(e){
      var playlist = that.state.playlist,
          currPos = that.state.position;

      console.log(playlist)
      playlist.splice(currPos + 1, 0, e.detail);
      console.log(playlist)
      that.setState({playlist: playlist});

      that.playVideoByPos(currPos + 1);
    }, false);
  },


  handlePlaylistAdd: function(newPlaylist){
    var pos = this.state.position;
    if(pos < newPlaylist.length && !this.state.playing){
      this.playVideoByPos(pos + 1);
    }
  },

  handleVideoEnded: function(){
    var pos = this.state.position + 1,
        pl = this.state.playlist;
    if(pos < pl.length){
      this.setState({videoId: pl[pos].videoId, type: 'youtube', position: pos});
    } else {
      this.setState({playing: false});
    }
  },

  playVideoByPos: function(pos){
    this.setState({videoId: this.state.playlist[pos].videoId, type: 'youtube', position: pos, playing: true});
  },

  handlePlayNow: function(pos, video){
    if(pos !== this.state.position){
      this.playVideoByPos(pos);
    } else {
      // clicked on the currently playing video
      window.dispatchEvent(new CustomEvent('restartVideo'));
    }
  },

  handleDeleteEntry: function(pos, video){
    var pl = this.state.playlist,
        currPos = this.state.position;

    // if deleting from history, decrease the position of the playing video on the playlist
    if(pos < currPos){
      currPos -= 1;
    }

    // remove the element from the playlist
    pl.splice(pos, 1);

    this.setState({playlist: pl, position: currPos});
  },

  noop: function(){},

  render: function() {
    return (
      <div>
        <Player
          autoplay="true"
          videoId={this.state.videoId}
          position={this.state.position}
          type={this.state.type}
          playing={this.noop} stopped={this.noop}
          ended={this.handleVideoEnded} />

        <Playlist
          playlist={this.state.playlist}
          position={this.state.position}
          handleDeleteEntry={this.handleDeleteEntry}
          handlePlayNow={this.handlePlayNow} />
      </div>
    );
  }

});

React.renderComponent(
  <ResultsComponent />,
  document.getElementById('player-component')
);


module.exports = ResultsComponent;