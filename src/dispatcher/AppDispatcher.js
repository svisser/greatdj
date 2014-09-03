var Dispatcher = require('./Dispatcher');
var Constants = require('../constants/AppConstants');

var copyProperties = require('react/lib/copyProperties');

var AppDispatcher = copyProperties(new Dispatcher(), {

  /**
   * A bridge function between the views and the dispatcher, marking the action
   * as a view action.  Another variant here could be handleServerAction.
   * @param  {object} action The data coming from the view.
   */
  handleViewAction: function(action) {
    this.dispatch({
      source: Constants.actionSource.VIEW,
      action: action
    });
  },

  handleServerAction: function(action){
    this.dispatch({
      source: Constants.actionSource.SERVER,
      action: action
    });
  }

});

module.exports = AppDispatcher;