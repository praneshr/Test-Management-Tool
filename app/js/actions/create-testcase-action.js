'use strict';

var AppDispatcher = require('../dispatcher/dispatcher');
var ActionsList = require('./action-list');

module.exports = {
  createTestcase: function(data){
    AppDispatcher.createTestcase({
      actionType: ActionsList.CREATE_TESTCASE,
      data: data
    });
  }
};
