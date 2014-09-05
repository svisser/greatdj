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
      position: -1,
      playlistId: PlaylistStore.getPlaylistId(),
      mode: isMobile.any ? 'client' : 'server',
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

  setPlaylist: function(pl){
    this.setState({playlist: pl}); // @todo flux - PlaylistActions.setPlaylist(pl)
    if(this.state.playlistId)
      PlaylistActions.changedPlaylist(this.state.playlistId, pl)
  },

  setPosition: function(p){
    this.setState({position: p});
  },

  playerReady: function(){
    console.log('player ready')
    if(this.state.playlist.length){
      this.setPosition(0);
    }
  },

  _onChange: function() {
    this.setState({
      playlist: PlaylistStore.getPlaylist(),
      playlistId: PlaylistStore.getPlaylistId(),
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
            mode={this.state.mode}/>
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
        <a id="github-link" href="https://github.com/ruiramos/greatdj" target="_blank">GreatDJ on GitHub</a>
      </div>
    )
  }

});

React.renderComponent(
  <StateHandler />,
  document.body
);

module.exports = StateHandler;

