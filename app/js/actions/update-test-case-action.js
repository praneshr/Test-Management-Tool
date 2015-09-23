'use strict';

var AppDispatcher = require('../dispatcher/dispatcher');
var ActionsList = require('./action-list');

module.exports = {
  updateTestCase: function(data){
    AppDispatcher.updateTestCase({
      actionType: ActionsList.UPDATE_TEST_CASE,
      data: data
    });
  }
};
