
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
    console.log('load', plId, sync)

    Api.loadPlaylist(plId);
    if(sync)
      Api.io.register(plId);
    else
      Api.io.unregister();

  },

  changedPlaylist: function(plId, pl, pos){
    console.log('changed playlist', plId, pl, pos)
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

    Api.io.unregister();
  }

};

module.exports = PlaylistActions;
