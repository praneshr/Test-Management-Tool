'use strict';

var AppDispatcher = require('../dispatcher/dispatcher');
var ActionsList = require('./action-list');

module.exports = {
  getAnalytics: function(data){
    AppDispatcher.getTagList({
      actionType: ActionsList.GET_ANALYTICS,
      data: data
    });
  }
};
