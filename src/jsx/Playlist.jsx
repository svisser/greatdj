 /**
  * @jsx React.DOM
  */

var React = require('react');

var PlaylistItem = require('./PlaylistItem');
var AnimatedScroll = require('./AnimatedScroll');

var Playlist = React.createClass({
  mixins: [AnimatedScroll],

  componentDidMount: function() {
    //this.getDOMNode().addEventListener('scroll', this.growListOnScroll);
  },

  growListOnScroll: function(e){ // @deprecated
    var ho = (this.props.playlist.length - this.props.position) * 48 + 6;
    var ha = parseInt(e.target.style.height);

    e.target.style.height = ha + (this.getAutoScrollPosition() - (e.target.scrollTop + (ha - ho))) + 'px';

    e.target.addEventListener('mouseout', this.resetScrollPosition, false);
  },

  componentWillUpdate: function(nextProps) {
    // noop
  },

  getAutoScrollPosition: function(){
    return 48 * this.props.position;
  },

  resetScrollPosition: function(e){
    if(e.relatedTarget.tagName !== 'TABLE'
      && e.relatedTarget.tagName !== 'IFRAME'
      && (e.relatedTarget.tagName !== 'DIV' || e.relatedTarget.attributes.id.value !== 'player-component'))
      return;

    this.ensureActiveSongOnTop();

    return false;
  },

  componentDidUpdate: function() {
    if(this.refs.playlist.getDOMNode()){
      this.ensureActiveSongOnTop();
    }

    this.refs.playlist.getDOMNode().style.height = (this.props.playlistToggled) ?
      48 * +this.props.playlist.length + 6 : 48 * (this.props.playlist.length - this.props.position) + 6;
  },

  ensureActiveSongOnTop: function(){
    var that = this;

    //this.getDOMNode().removeEventListener('scroll', this.growListOnScroll);

    this.refs.playlist.getDOMNode().style.height = 48 * (this.props.playlist.length - this.props.position) + 6;
    this.animatedScrollTo(this.refs.playlist.getDOMNode(), this.getAutoScrollPosition(), 150, function(){
      //that.getDOMNode().addEventListener('scroll', that.growListOnScroll);
    });
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
      var classNames = (i < this.props.position) ? 'old' :
        (i === this.props.position) ? 'active' : 'queued';

      return (
        <PlaylistItem
          video={video}
          position={i}
          classNames={classNames}
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
