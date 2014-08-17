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
      playing: false,
      playlistToggled: false
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

  toggleFullPlaylist: function(){
    if(this.refs.playlistToggle.getDOMNode().classList.contains('disabled')) return;
    var p = !this.state.playlistToggled;
    this.setState({playlistToggled: p});
  },

  // ------
  // ------ f
  // xxxxxx
  // ------
  // ------ t
  //        (f)
  // ------
  switchPlaylistItems: function(fromIndex, toIndex){
    var pl = this.state.playlist,
        moving = this.state.playlist[fromIndex],
        newPos = this.state.position,
        fromIndex = +fromIndex,
        toIndex = +toIndex;

    if(fromIndex === toIndex) return;

    var newToIndex = (toIndex < fromIndex) ? +toIndex + 1 : toIndex;
    console.log(fromIndex, toIndex, newToIndex)

    var from = pl.splice(fromIndex, 1)[0];
    pl.splice(newToIndex, 0, from);

    console.log(this.state.position)

    if (this.state.position === fromIndex){
      newPos = newToIndex;
    } else if(fromIndex < this.state.position && this.state.position <= toIndex){
      newPos--;
    } else if(fromIndex > this.state.position && this.state.position > toIndex){
      newPos++;
    }

    console.log(pl, newPos);

    this.setState({playlist: pl, position: newPos});

  },

  noop: function(){},

  render: function() {
    var btnClassName = 'playlist-toggle flat ' + (!this.state.playlist.length ? 'hide' : (!this.state.position ? 'disabled' : ''));
    var icoClassName = this.state.playlistToggled ? 'fa fa-chevron-down' : 'fa fa-chevron-up';
    return (
      <div>
        <Player
          autoplay="true"
          videoId={this.state.videoId}
          position={this.state.position}
          type={this.state.type}
          playing={this.noop} stopped={this.noop}
          ended={this.handleVideoEnded}
          switchPlaylistItems={this.props.switchPlaylistItems} />

        <button className={btnClassName} ref="playlistToggle" onClick={this.toggleFullPlaylist} ><i className={icoClassName}></i></button>

        <Playlist
          playlist={this.state.playlist}
          position={this.state.position}
          playlistToggled={this.state.playlistToggled}
          switchPlaylistItems={this.switchPlaylistItems}
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