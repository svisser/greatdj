/**
 * @jsx React.DOM
 */

var React = require('react');

var AutoComplete = React.createClass({

  componentDidUpdate: function(){
    this.refs.theDiv.getDOMNode().style.left = document.querySelector('input.q').offsetLeft;
  },

  handleItemClick: function(e){
    this.props.setQuery(e.target.innerHTML);
  },

  render: function() {
    var items = this.props.complete.map(function(c, i){
      return (
        <li
          data-order={i}
          className={i === this.props.selected ? 'active' : ''}
          onClick={this.handleItemClick}
          onMouseEnter={this.props.handleMouseEnterOption}
          onMouseLeave={this.props.handleMouseLeaveOption} >{c[0]}</li>
      );
    }, this)

    var classNames = 'autocomplete ' + (this.props.complete.length ? '' : 'hide');

    return (
      <div className={classNames} ref="theDiv">
        <ul>{items}</ul>
      </div>
    );
  }

});

module.exports = AutoComplete;