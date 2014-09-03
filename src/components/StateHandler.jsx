 /**
  * @jsx React.DOM
  */

var React = require('react');
var urllite = require('urllite');

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
    this.setState({playlist: pl});
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
    console.log({
      playlist: PlaylistStore.getPlaylist(),
      playlistId: PlaylistStore.getPlaylistId(),
    })
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
            handleSavePlaylist={this.handleSavePlaylist} />
        </div>
        <div id="player-component">
          <ResultsComponent
            playlist={this.state.playlist}
            setPlaylist={this.setPlaylist}
            position={this.state.position}
            setPosition={this.setPosition}
            onPlayerReady={this.playerReady}/>
        </div>
      </div>
    )
  }

});

React.renderComponent(
  <StateHandler />,
  document.body
);

module.exports = StateHandler;

