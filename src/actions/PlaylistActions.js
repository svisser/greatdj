
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
  load: function(plId, sync) {
    Api.loadPlaylist(plId);
    if(sync)
      Api.io.register(plId);
    else
      Api.io.unregister();

  },

  changedPlaylist: function(plId, pl){
    AppDispatcher.handleViewAction({
      actionType: Constants.PLAYLIST_CHANGE,
      response:{
        playlistId: plId,
        playlist: pl
      }
    });

    if(plId)
      Api.io.changedPlaylist(plId, pl);
  },

  unsetPlaylistId: function(){
    AppDispatcher.handleViewAction({
      actionType: Constants.UNSET_PLAYLIST_ID,
    });

    Api.io.unregister();
  }

};

module.exports = PlaylistActions;
