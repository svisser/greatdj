 /**
  * @jsx React.DOM
  */

var React = require('react');
var request = require('superagent');

var SearchResults = require('./SearchResults');
var ResultsComponent = require('./ResultsComponent');
var TopBar = require('./TopBar');

var API_KEY = 'AIzaSyDLwX06yG_73ImDEubOb5Yv0E_U1iIdTJs';

var SearchComponent = React.createClass({

  videoEnqueued: function(id, title, type){
    var evt = new CustomEvent('enqueue',
      {'detail': {
        'type': type,
        'title': title,
        'videoId': id,
      }
    });
    window.dispatchEvent(evt);
  },

  playNowHandler: function(id, title, type){
    var evt = new CustomEvent('playNow',
      {'detail': {
        'type': type,
        'title': title,
        'videoId': id,
      }
    });
    window.dispatchEvent(evt);
  },

  handleSubmit: function(q, hdOnly){
    var that = this,
        videoDef = hdOnly ? 'high' : 'any';

    request
      .get('https://www.googleapis.com/youtube/v3/search')
      .query({
        key: API_KEY,
        part: 'snippet',
        q: q,
        type: 'video',
        maxResults: 20,
        videoDefinition: videoDef
      })
      .end(function(err, response){
        that.props.setResults(response.body.items);
      });

  },

  render: function() {
    return (
      <div>
        <TopBar
          handleSubmit={this.handleSubmit}
          handleSavePlaylist={this.props.handleSavePlaylist}
          playlistId={this.props.playlistId}
          unsetPlaylistId={this.props.unsetPlaylistId}
          />
        <SearchResults videos={this.props.results} enqueueHandler={this.videoEnqueued} playNowHandler={this.playNowHandler} />
      </div>
    );
  },
});


module.exports = SearchComponent;

