 /**
  * @jsx React.DOM
  */

var React = require('react');

var PlaylistItem = require('./PlaylistItem');
var AnimatedScroll = require('./AnimatedScroll');

var liHeight = 42 + 6;

var Playlist = React.createClass({
  mixins: [AnimatedScroll],

  getAutoScrollPosition: function(){
    return liHeight * this.props.position;
  },

  componentDidMount: function(){
    this.getDOMNode().addEventListener('dragend', this.handleDragEnd, false);
  },

  componentWillReceiveProps: function(newProps){
    // If deleting an item and playlist in condensed mode, got to disable the height transition otherwise
    // the element disappear straights away and the playlist shows one more top item (before the scroll/height animation kicks in)
    if(this.playlistCount > this.props.playlist.length && !this.props.playlistToggled && this.props.position){
      this.refs.playlist.getDOMNode().style.transition = "none";
      this.refs.playlist.getDOMNode().style.height = liHeight * (this.props.playlist.length - this.props.position) + 6;
    } else {
      this.refs.playlist.getDOMNode().style.transition = "height 250ms ease-out";
    }
  },

  componentDidUpdate: function(oldProps) {
    if(this.refs.playlist.getDOMNode() && !this.props.playlistToggled && this.props.playlist.length){
      this.ensureActiveSongOnTop();
    }

    var position = this.props.position > 0 ? this.props.position : 0;

    this.refs.playlist.getDOMNode().style.height = (this.props.playlistToggled) ?
      liHeight * +this.props.playlist.length + 6 : liHeight * (this.props.playlist.length - position) + 6;

  },

  ensureActiveSongOnTop: function(){
    var that = this;

    this.refs.playlist.getDOMNode().style.height = liHeight * (this.props.playlist.length - this.props.position) + 6;
    this.animatedScrollTo(this.refs.playlist.getDOMNode(), this.getAutoScrollPosition(), 275);
  },

  handlePlayNow: function(pos, video){
    this.props.handlePlayNow(pos, video);
    return false;
  },

  handleDeleteEntry: function(pos, video){
    this.props.handleDeleteEntry(pos, video);
    return false;
  },

  switchPlaylistItems: function(from, to){
    this.props.switchPlaylistItems(from, to);
  },

  handleDragEnd: function(){
    var els = document.querySelectorAll('.dragged-over');
    Array.prototype.slice.apply(els).forEach(function(el){
      el.classList.remove('dragged-over');
    })
  },

  wasDelete: function(props, oldProps){
    return props.playlist.length < oldProps.playlist.length;
  },

  render: function(){
    this.playlistCount = this.props.playlist.length;

    var playlistElements = this.props.playlist.map(function(video, i){
      var key = video.videoId + '_' + i;
      var classNames = (i < this.props.position) ? 'old' :
        (i === this.props.position) ? 'active' : 'queued';

      return (
        <PlaylistItem
          video={video}
          position={i}
          classNames={classNames}
          key={key}
          handleDeleteEntry={this.handleDeleteEntry}
          handlePlayNow={this.handlePlayNow}
          switchPlaylistItems={this.switchPlaylistItems} />
      );
    }, this);


    return (
      <ul className="playlist" ref="playlist">
        {playlistElements}
      </ul>
    )
  }
});

module.exports = Playlist;
