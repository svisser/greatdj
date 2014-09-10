
var Api = require('../utils/Api');
var Constants = require('../constants/AppConstants');
var AppDispatcher = require('../dispatcher/AppDispatcher');

var PlaylistActions = {

  /**
   * @param  {string} text
   */
  save: function(pl, plId) {
    AppDispatcher.handleViewAction({
      actionType: Constants.PLAYLIST_SAVE
    });

    Api.savePlaylist(pl, plId);

  },

  /**
   * @param  {string} id
   */
  load: function(plId) {
    console.log('load', plId);
    Api.loadPlaylist(plId);
  },

  sync: function(plId){
    console.log('sync', plId);
    Api.io.register(plId);
  },

  unsync: function(){
    console.log('unsync');
    Api.io.unregister();
  },

  changedPlaylist: function(plId, pl, pos){
    AppDispatcher.handleViewAction({
      actionType: Constants.PLAYLIST_CHANGE,
      response:{
        playlistId: plId,
        playlist: pl,
        position: pos
      }
    });

    if(plId){
      console.log('sending changedPlaylist', plId, pl, pos)
      Api.io.changedPlaylist(plId, pl, pos);
    }
  },

  unsetPlaylistId: function(){
    AppDispatcher.handleViewAction({
      actionType: Constants.UNSET_PLAYLIST_ID,
    });

    PlaylistActions.unsync();
  }

};

module.exports = PlaylistActions;
