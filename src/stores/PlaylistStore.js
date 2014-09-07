
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/AppConstants');
var merge = require('react/lib/merge');
var request = require('superagent');

var CHANGE_EVENT = 'change';

var _playlist = [];
var _playlistId = null;

function saved(plId){
  _playlistId = plId;
  history.pushState(null, null, '/'+plId);
}

function loaded(pl, plId){
  _playlist = pl;
  _playlistId = plId;
}

var PlaylistStore = merge(EventEmitter.prototype, {

  getPlaylist: function(){
    return _playlist;
  },

  getPlaylistId: function(){
    return _playlistId;
  },

  emitChange: function(){
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

});

// Register to handle all updates
AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.actionType) {
    case Constants.PLAYLIST_SAVED:
      if(action.response === Constants.request.PENDING){
        /// tururur
      } else if(action.response.playlistId){
        saved(action.response.playlistId);
        PlaylistStore.emitChange();
      }
      break;

    case Constants.PLAYLIST_LOADED:
      if(action.response === Constants.request.PENDING){
        /// tururur
      } else if(action.response.playlistId){
        loaded(action.response.playlist, action.response.playlistId);
        PlaylistStore.emitChange();
      }
      break;

    case Constants.PLAYLIST_CHANGE:
      loaded(action.response.playlist, action.response.playlistId);
      PlaylistStore.emitChange();
      break;

    case Constants.UNSET_PLAYLIST_ID:
      _playlistId = null;
      history.pushState(null, null, '/');
      PlaylistStore.emitChange();
      break;

    default:
      return true;
  }

  // This often goes in each case that should trigger a UI change. This store
  // needs to trigger a UI change after every view action, so we can make the
  // code less repetitive by putting it here.  We need the default case,
  // however, to make sure this only gets called after one of the cases above.

  return true; // No errors.  Needed by promise in Dispatcher.
});

module.exports = PlaylistStore;
