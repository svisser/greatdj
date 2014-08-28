window.React = require('react');

document.write('<html><head><//head><body></body></html>');

// head
document.querySelector('head').innerHTML += '<title>GREATDJ!</title><meta name="viewport" content="width=device-width, user-scalable=no">';
// body (app root)
document.querySelector('body').appendChild(document.createElement('div')).setAttribute('id', 'app');

require('./jsx/StateHandler');

