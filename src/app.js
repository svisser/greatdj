window.React = require('react');

document.write('<html><head><//head><body></body></html>');
document.querySelector('head').innerHTML += '<title>GREATDJ!</title><meta name="viewport" content="width=device-width, user-scalable=no">';

// some things should just work...
NodeList.prototype.forEach = Array.prototype.forEach;
HTMLCollection.prototype.forEach = Array.prototype.forEach;

require('./components/StateHandler');

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-38568098-2', 'auto');
ga('send', 'pageview');

