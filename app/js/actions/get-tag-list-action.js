'use strict';

var AppDispatcher = require('../dispatcher/dispatcher');
var ActionsList = require('./action-list');

module.exports = {
  getTagList: function(data){
    AppDispatcher.getTagList({
      actionType: ActionsList.GET_TAG_LIST,
      data: data
    });
  }
};
