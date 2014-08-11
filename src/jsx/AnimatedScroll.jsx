/**
 * @jsx React.DOM
 */

var React = require('react');

var AnimatedScroll = {
  componentWillMount: function() {
    //this.intervals = [];
  },

  animatedScrollTo: function(element, to, duration) {
      if (duration <= 0) return;
      var difference = to - element.scrollTop;
      var perTick = difference / duration * 10;

      setTimeout(function () {
          element.scrollTop = element.scrollTop + perTick;
          AnimatedScroll.animatedScrollTo(element, to, duration - 10);
      }, 10);
  },

  componentWillUnmount: function() {
    //this.intervals.map(clearInterval);
  }
};

module.exports = AnimatedScroll;