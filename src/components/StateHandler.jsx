 /**
  * @jsx React.DOM
  */

var React = require('react');
var urllite = require('urllite');
var isMobile = require('ismobilejs');

var SearchComponent = require('./SearchComponent');
var ResultsComponent = require('./ResultsComponent');
var PlaylistStore = require('../stores/PlaylistStore');
var PlaylistActions = require('../actions/PlaylistActions');

var StateHandler = React.createClass({
  getInitialState: function(){
    return {
      playlist: PlaylistStore.getPlaylist(),
      results: [],
      position: PlaylistStore.getPosition(),
      playlistId: PlaylistStore.getPlaylistId(),
      sync: false,
    }
  },

  componentWillMount: function(){
    PlaylistStore.addChangeListener(this._onChange);

    var url = urllite(document.location.href),
        that = this;

    if(url.pathname.length > 1){
      // do a server request with url.hash
      var id = url.pathname.slice(1);
      PlaylistActions.load(id);
    }
  },

  setResults: function(res){
    this.setState({results: res});
  },

  toggleSync: function(){
    var sync = !this.state.sync;

    if(sync){
      if(!this.state.playlistId)
        PlaylistActions.save(this.state.playlist);

      PlaylistActions.sync(this.state.playlistId);

    } else {
      PlaylistActions.unsync();
    }

    this.setState({sync: sync});
  },

  setPlaylist: function(pl){ console.log('set playlist', pl)
    PlaylistActions.changedPlaylist(this.state.playlistId, pl, this.state.position);
  },

  setPosition: function(p){ console.log('set position', p)
    PlaylistActions.changedPlaylist(this.state.playlistId, this.state.playlist, p);
  },

  playerReady: function(){
    var that = this;
    if(this.state.playlist.length){
      setTimeout(function(){that.setPosition(0), 50});
    }
  },

  _onChange: function() {
    this.setState({
      playlist: PlaylistStore.getPlaylist(),
      playlistId: PlaylistStore.getPlaylistId(),
      position: PlaylistStore.getPosition(),
      sync: (PlaylistStore.getPlaylistId() ? this.state.sync : false)
    });
  },

  handleSavePlaylist: function(){
    PlaylistActions.save(this.state.playlist, this.state.playlistId);
  },

  render: function(){
    return (
      <div id="app">
        <div id="search-component">
          <SearchComponent
            results={this.state.results}
            setResults={this.setResults}
            handleSavePlaylist={this.handleSavePlaylist}
            mode={this.state.mode}
            playlistId={this.state.playlistId}
            toggleSync={this.toggleSync}
            sync={this.state.sync}
            />
        </div>
        <div id="player-component">
          <ResultsComponent
            playlist={this.state.playlist}
            setPlaylist={this.setPlaylist}
            position={this.state.position}
            setPosition={this.setPosition}
            onPlayerReady={this.playerReady}
            mode={this.state.mode} />
        </div>
        <a id="github-link" href="https://github.com/ruiramos/greatdj" target="_blank" className="desktop">GreatDJ on GitHub</a>
      </div>
    )
  }

});

React.renderComponent(
  <StateHandler />,
  document.body
);

module.exports = StateHandler;

