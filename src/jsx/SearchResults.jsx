 /**
  * @jsx React.DOM
  */

var React = require('react');

var SearchResults = React.createClass({
  handleVideoEnqueue: function(video){
    this.props.enqueueHandler(video.id.videoId, video.snippet.title, 'youtube');
  },

  handlePlayNow: function(video){
    this.props.playNowHandler(video.id.videoId, video.snippet.title, 'youtube');
  },

  render: function() {
    var resultsList = this.props.videos.map(function(res, i){
      var rowClassName = 'row ' + (i % 2 ? 'odd' : 'even');
      return (
        <tr key={res.id.videoId} className={rowClassName}>
          <td className="imgTd"><img className="thumbnail" src={ res.snippet.thumbnails.medium.url } /></td>
          <td className="descTd">{ res.snippet.title }</td>
          <td className="buttonTd">
            <button ref="enq" className="primary" onClick={this.handleVideoEnqueue.bind(this, res)}>Enqueue</button>
            <button ref="play" onClick={this.handlePlayNow.bind(this, res)}>Play now</button>
          </td>
        </tr>
      )
    }, this)

    return (
      <div className="results-containter">
        <table className="results">
          <thead>
          </thead>
          <tbody>
            { resultsList }
          </tbody>
        </table>
      </div>
    );
  }

 });

module.exports = SearchResults;

