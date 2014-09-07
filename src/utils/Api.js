
var request = require('superagent');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/AppConstants');
var io = require('socket.io-client');

function dispatch(key, response, params) {
    var payload = {actionType: key, response: response};
    if (params) {
        payload.queryParams = params;
    }
    AppDispatcher.handleServerAction(payload);
}

var Api = {
  savePlaylist: function(pl, plId) {
    var key = Constants.PLAYLIST_SAVED;
    var params = {playlist: pl, id: plId};

    dispatch(key, Constants.request.PENDING, params);

    request
      .post('/p')
      .send(params)
      .end(function(err, response){
        if(!err && response.body.id){
          dispatch(key, {playlistId: response.body.id}, params);

          console.log('save playlist register')
          Api.io.register(response.body.id);

        } else {
          dispatch(key, Constants.request.ERROR, params);
        }
      });

  },

  loadPlaylist: function(plId){
    var key = Constants.PLAYLIST_LOADED;
    var params = {id: plId};

    dispatch(key, Constants.request.PENDING, params);

    request
        .get('/p')
        .query(params)
        .end(function(err, response){
          if(!err && response.body.id){
            dispatch(key, {playlist: response.body.playlist, playlistId: response.body.id}, params);
          } else {
            dispatch(key, Constants.request.ERROR, params);
          }
        });

      }
};

Api.io = {
  socket: null,
  register: function(id){
    if(!this.socket){
      this.socket = io();

      this.socket.on('playlistChange', function(data){
        dispatch(Constants.PLAYLIST_LOADED, {playlist: data.playlist, playlistId: data.id}, {id: data.id});
      });
    }

    this.socket.emit('register', {id: id});
  },
  changedPlaylist: function(id, pl){
    this.socket.emit('changedPlaylist', {id: id, playlist: pl});
  },
  unregister: function(){
    if(this.socket){
      this.socket.emit('unregister');
      this.socket = null;
    }
  }
};


 module.exports = Api;