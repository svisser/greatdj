 /**
  * @jsx React.DOM
  */

var React = require('react');

var PlaylistItem = require('./PlaylistItem');
var AnimatedScroll = require('./AnimatedScroll');

var Playlist = React.createClass({
  mixins: [AnimatedScroll],

  componentDidMount: function() {
    window.addEventListener('resize', function(e){
      console.log(e.target.scrollTop);
    });
  },

  componentWillUpdate: function(nextProps) {
    // noop
  },

  componentDidUpdate: function() {
     if(this.refs.playlist.getDOMNode()){
       this.refs.playlist.getDOMNode().style.height = 48 * (this.props.playlist.length - this.props.position) + 6;
       this.animatedScrollTo(this.refs.playlist.getDOMNode(), 52 * this.props.playlist.length, 150);
       //this.refs.playlist.getDOMNode().scrollTop = 52 * this.props.playlist.length;
     }

  },

  handlePlayNow: function(pos, video){
    this.props.handlePlayNow(pos, video);
    return false;
  },

  handleDeleteEntry: function(pos, video){
    this.props.handleDeleteEntry(pos, video);
    return false;
  },

  render: function(){
    var playlistElements = this.props.playlist.map(function(video, i){
      var key = video.videoId + '_' + i;

      return (
        <PlaylistItem
          video={video}
          position={i}
          active={i === this.props.position ? 'true' : ''}
          key={key}
          handleDeleteEntry={this.handleDeleteEntry}
          handlePlayNow={this.handlePlayNow} />
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
