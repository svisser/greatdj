
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
    Api.loadPlaylist(plId);
    Api.io.register(plId);
  },

  changedPlaylist: function(plId, pl){
    Api.io.changedPlaylist(plId, pl);
  }

};

module.exports = PlaylistActions;
