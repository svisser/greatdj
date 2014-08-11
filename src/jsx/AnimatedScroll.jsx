/**
 * @jsx React.DOM
 */

var React = require('react');

var AnimatedScroll = {
  componentWillMount: function() {
    //this.intervals = [];
  },

  animatedScrollTo: function(element, to, duration, fn) {
      if (duration <= 0) {
        if(fn)
          return fn();
        return;
      }

      var difference = to - element.scrollTop;
      var perTick = difference / duration * 10;

      setTimeout(function () {
          element.scrollTop = element.scrollTop + perTick;
          AnimatedScroll.animatedScrollTo(element, to, duration - 10, fn);
      }, 10);
  },

  componentWillUnmount: function() {
    //this.intervals.map(clearInterval);
  }
};

module.exports = AnimatedScroll;