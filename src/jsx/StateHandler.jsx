 /**
  * @jsx React.DOM
  */

var React = require('react');
var urllite = require('urllite');
var request = require('superagent');

var SearchComponent = require('./SearchComponent');
var ResultsComponent = require('./ResultsComponent');

var StateHandler = React.createClass({
  getInitialState: function(){
    return {
      playlist: [],
      results: [],
      position: -1,
      playlistId: null,
    }
  },

  componentWillMount: function(){
    var url = urllite(document.location.href),
        that = this;

    if(url.pathname.length > 1){
      // do a server request with url.hash
      var id = url.pathname.slice(1);

      request
        .get('/p')
        .query({
          id: id,
        })
        .end(function(err, response){
          that.setState({playlist: response.body.playlist, playlistId: id});
        });
    }
  },

  componentWillUpdate: function(nextProps, nextState){

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

  handleSavePlaylist: function(){
    var pl = this.state.playlist,
        id = this.state.playlistId,
        that = this;

    request
      .post('/p')
      .send({playlist:pl, id: id})
      .end(function(err, response){
        if(!err && response.body.id){
          var playlistId = response.body.id;

          that.setState({playlistId: playlistId});
          history.pushState(null, null, '/'+playlistId);
        }
      });

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

