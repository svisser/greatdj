

var Api = require('../utils/Api');

var PlaylistActions = {

  /**
   * @param  {string} text
   */
  save: function(pl, plId) {
    Api.savePlaylist(pl, plId);
  },

  /**
   * @param  {string} id
   */
  load: function(plId) {
    Api.loadPlaylist(plId);
  },

};

module.exports = PlaylistActions;
