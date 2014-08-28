window.React = require('react');

document.write('<html><head><//head><body></body></html>');
document.querySelector('head').innerHTML += '<title>GREATDJ!</title><meta name="viewport" content="width=device-width, user-scalable=no">';
document.querySelector('body').appendChild(document.createElement('div')).setAttribute('id', 'app');

// some things should just work...
NodeList.prototype.forEach = Array.prototype.forEach;
HTMLCollection.prototype.forEach = Array.prototype.forEach;

require('./jsx/StateHandler');