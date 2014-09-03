/**
 * @jsx React.DOM
 */

var React = require('react');

var AutoComplete = require('./AutoComplete');

var request = require('superagent');

// URL for the youtube autocomplete (EN/GB locale)
var youtubeCompleteUrl = 'https://clients1.google.com/complete/search?client=youtube&hl=en&gl=gb&gs_rn=23&gs_ri=youtube&ds=yt&cp=2&gs_id=1a&callback=showAutocompleteOptions&q=';
var autoCompleteTimeout;

var TopBar = React.createClass({
  getInitialState: function(){
    return {
      complete: [],
      selected: -1,
    };
  },

  componentDidMount: function(){
    var that = this;
    window.showAutocompleteOptions = function(res){
      that.setState({complete: res[1] || []});
    };
  },

  handleSubmit: function(e){
    if(e) e.preventDefault();
    this.props.handleSubmit(this.refs.query.getDOMNode().value.trim(), this.refs.hd.getDOMNode().checked);

    // reset autocomplete
    this.setState({complete: [], selected: -1});

  },

  // for the autocomplete clicks/selections
  setQuery: function(q){
    this.refs.query.getDOMNode().value = q;
    this.handleSubmit();
  },

  handleInputChange: function(){
    var q = this.refs.query.getDOMNode().value.trim(),
        that = this;

    if(autoCompleteTimeout){
      clearTimeout(autoCompleteTimeout);
    }

    autoCompleteTimeout = setTimeout(function(){
      // remove old script tags
      document.querySelectorAll('script.autocompleteJSONP').forEach(function(s){
        s.parentNode.removeChild(s);
      });

      // if there's a query get a new one, otherwise clear
      if(q) {
        var script = document.createElement("script");
        script.setAttribute('class', 'autocompleteJSONP');
        script.setAttribute("src", youtubeCompleteUrl+q);
        document.head.appendChild(script);
      } else {
        that.setState({complete: [], selected: -1});
      }

    }, 250);
  },

  // Autocomplete event handler
  handleInputKeyDown: function(e){
    if(e.keyCode === 38){ //up
      if(this.state.selected >= 0){
        this.setState({selected: this.state.selected - 1});
      }
      // always returning false on up - no 'go to beggining' behaviour
      return false;
    } else if(e.keyCode === 40){ //down
      if(this.state.selected < this.state.complete.length - 1){
        this.setState({selected: this.state.selected + 1});
        return false;
      }
    } else if(e.keyCode === 13 && this.state.selected >= 0){ //enter
      this.setQuery(this.state.complete[this.state.selected][0]);
      return false;
    } else if(e.keyCode === 27){ //esc
      this.setState({complete: [], selected: -1});
      return false;
    }
  },

  handleMouseEnterOption: function(e){
    this.setState({selected: +e.target.getAttribute('data-order')});
  },

  handleMouseLeaveOption: function(e){
    this.setState({selected: -1});
  },

  render: function() {
    return (
      <form onSubmit={this.handleSubmit}>
        <span className="logo desktop"><a href="/">GREAT DJ<span className="it">!</span></a></span>
        <input type="text" className="q" ref="query" onChange={this.handleInputChange} onKeyDown={this.handleInputKeyDown}
        placeholder="Search for music videos here..." />
        <input type="submit" value="Search" />
        <input type="checkbox" value="HD Only" ref="hd" id="hd-checkbox" /><label htmlFor="hd-checkbox"> HD Only </label>
        <button className="save-button flat" type="button" onClick={this.props.handleSavePlaylist}><i className="fa fa-save"></i></button>

        <AutoComplete
          complete={this.state.complete}
          selected={this.state.selected}
          setQuery={this.setQuery}
          handleMouseEnterOption={this.handleMouseEnterOption}
          handleMouseLeaveOption={this.handleMouseLeaveOption} />

      </form>
    );
  }

});

module.exports = TopBar;