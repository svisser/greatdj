 /**
  * @jsx React.DOM
  */

var React = require('react');
var request = require('superagent');

var SearchResults = require('./SearchResults');
var ResultsComponent = require('./ResultsComponent');

var API_KEY = 'AIzaSyBtZzG2fInuoAsvrLfYi9jIsLgSdoE4JTs';

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

  handleSubmit: function(e){
    e.preventDefault();

    var q = this.refs.query.getDOMNode().value.trim(),
        that = this;

    var videoDef = this.refs.hd.getDOMNode().checked ? 'high' : 'any';

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
        <form onSubmit={this.handleSubmit}>
          <span className="logo"><a href="/">GREAT DJ<span className="it">!</span></a></span>
          <input type="text" ref="query" />
          <input type="submit" value="Search" />
          <input type="checkbox" value="HD Only" ref="hd" id="hd-checkbox" /><label htmlFor="hd-checkbox"> HD Only </label>

          <button className="save-button flat" type="button" onClick={this.props.handleSavePlaylist}><i className="fa fa-save"></i></button>
        </form>
        <SearchResults videos={this.props.results} enqueueHandler={this.videoEnqueued} playNowHandler={this.playNowHandler} />
      </div>
    );
  },
});

// React.renderComponent(
//   <SearchComponent />,
//   document.getElementById('search-component')
// );

module.exports = SearchComponent;

