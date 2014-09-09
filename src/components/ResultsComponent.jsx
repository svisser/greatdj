/**
 * @jsx React.DOM
 */

var React = require('react'),
    Player = require('./Player'),
    Playlist = require('./Playlist');

var ResultsComponent = React.createClass({
  getInitialState: function() {
    return {
      playing: false,
      playlistToggled: false
    };
  },

  componentDidMount: function(){
    var that = this;

    window.addEventListener('enqueue', function(e){
      var playlist = that.props.playlist;
      playlist.push(e.detail);
      that.props.setPlaylist(playlist);
      that.handlePlaylistAdd(playlist);
    }, false);

    window.addEventListener('playNow', function(e){
      var playlist = that.props.playlist,
          currPos = that.props.position;

      playlist.splice(currPos + 1, 0, e.detail);
      that.props.setPlaylist(playlist);

      that.playVideoByPos(currPos + 1);
    }, false);
  },

  componentDidUpdate: function(oldProps){
    if(this.props.position !== oldProps.position){
      this.playVideoByPos(this.props.position);
    }
  },

  handlePlaylistAdd: function(newPlaylist){
    var pos = this.props.position;
    if(pos < newPlaylist.length && !this.state.playing){
      this.props.setPosition(pos + 1);
    }
  },

  handleVideoEnded: function(){
    var pos = this.props.position + 1,
        pl = this.props.playlist;
    if(pos < pl.length){
      this.setState({videoId: pl[pos].videoId, type: 'youtube'});
      this.props.setPosition(pos);
    } else {
      this.setState({playing: false});
    }
  },

  playVideoByPos: function(pos){
    this.setState({videoId: this.props.playlist[pos].videoId, type: 'youtube', playing: true});
  },

  handlePlayNow: function(pos, video){
    if(pos !== this.props.position){
      this.props.setPosition(pos);
    } else {
      // clicked on the currently playing video
      window.dispatchEvent(new CustomEvent('restartVideo'));
    }
  },

  handleDeleteEntry: function(pos, video){
    var pl = this.props.playlist,
        currPos = this.props.position;

    // if deleting from history, decrease the position of the playing video on the playlist
    if(pos < currPos){
      currPos -= 1;
    }

    // remove the element from the playlist
    pl.splice(pos, 1);

    this.props.setPlaylist(pl);
    this.props.setPosition(currPos);
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
    var pl = this.props.playlist,
        moving = this.props.playlist[fromIndex],
        newPos = this.props.position,
        fromIndex = +fromIndex,
        toIndex = +toIndex;

    if(fromIndex === toIndex) return;

    var newToIndex = (toIndex < fromIndex) ? +toIndex + 1 : toIndex;

    var from = pl.splice(fromIndex, 1)[0];
    pl.splice(newToIndex, 0, from);

    if (this.props.position === fromIndex){
      newPos = newToIndex;
    } else if(fromIndex < this.props.position && this.props.position <= toIndex){
      newPos--;
    } else if(fromIndex > this.props.position && this.props.position > toIndex){
      newPos++;
    }

    this.props.setPosition(newPos);
    this.props.setPlaylist(pl);

  },

  noop: function(){},

  render: function() {
    var btnClassName = 'playlist-toggle flat ' + (!this.props.playlist.length ? 'hide' : (!this.props.position ? 'disabled' : ''));
    var icoClassName = this.state.playlistToggled ? 'fa fa-chevron-down' : 'fa fa-chevron-up';
    return (
      <div>
        <Player
          autoplay="true"
          videoId={this.state.videoId}
          position={this.props.position}
          type={this.state.type}
          playing={this.noop} stopped={this.noop}
          ended={this.handleVideoEnded}
          switchPlaylistItems={this.props.switchPlaylistItems}
          playerReady={this.props.onPlayerReady}/>

        <button className={btnClassName} ref="playlistToggle" onClick={this.toggleFullPlaylist} ><i className={icoClassName}></i></button>

        <Playlist
          playlist={this.props.playlist}
          position={this.props.position}
          playlistToggled={this.state.playlistToggled}
          switchPlaylistItems={this.switchPlaylistItems}
          handleDeleteEntry={this.handleDeleteEntry}
          handlePlayNow={this.handlePlayNow} />
      </div>
    );
  }

});


module.exports = ResultsComponent;