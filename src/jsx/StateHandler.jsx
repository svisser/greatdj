 /**
  * @jsx React.DOM
  */

var React = require('react'),
    urllite = require('urllite');


var SearchComponent = require('./SearchComponent');
var ResultsComponent = require('./ResultsComponent');

var StateHandler = React.createClass({
  getInitialState: function(){
    return {
      playlist: [],
      results: [],
      position: -1
    }
  },

  componentWillMount: function(){
    var url = urllite(document.location.href),
        that = this;

    if(url.hash){
      // do a server request with url.hash
      var res = [];

      res=JSON.parse('[{"type":"youtube","title":"Beyoncé - Pretty Hurts","videoId":"LXXQLa-5n5w"},{"type":"youtube","title":"Beyoncé - Drunk in Love (Explicit) ft. JAY Z","videoId":"p1JPKLa-Ofc"},{"type":"youtube","title":"Beyoncé - Partition (Explicit Video)","videoId":"pZ12_E5R3qc"},{"type":"youtube","title":"Beyoncé - XO","videoId":"3xUfCUFPL-8"},{"type":"youtube","title":"Beyoncé - Run the World (Girls)","videoId":"VBmMU_iwe6U"},{"type":"youtube","title":"Beyoncé - Halo","videoId":"bnVUHWCynig"},{"type":"youtube","title":"Beyoncé - Love On Top","videoId":"Ob7vObnFUJc"}]');
      this.setPlaylist(res);
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
    this.setPosition(0);
  },

  handleSavePlaylist: function(){
    var pl = this.state.playlist;
    console.log(pl);

    //send server request and receive pl.id
    var plId = "F4TR0";

    history.pushState(null, null, '/#'+plId);

  },

  render: function(){
    return (
      <div>
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
  document.getElementById('app')
);

module.exports = StateHandler;