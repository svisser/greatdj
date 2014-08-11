/**
 * @jsx React.DOM
 */

var React = require('react');

var PlaylistItem = React.createClass({

  handlePlayNow: function(){
    this.props.handlePlayNow(this.props.position, this.props.video);
    return false;
  },

  handleDeleteEntry: function(){
    this.props.handleDeleteEntry(this.props.position, this.props.video);
    return false;
  },

  render: function() {
    return (
      <li draggable="true" onClick={this.handlePlayNow} className={this.props.active ? 'active': ''}>
        <span className="bars"><i className="fa fa-bars"></i></span>
        <span className="title" onClick={this.handlePlayNow}>{ this.props.video.title }</span>
        <span className="delete" onClick={this.handleDeleteEntry}><i className="fa fa-trash-o"></i></span>
      </li>
    );
  }

});

module.exports = PlaylistItem;