'use strict';

var AppDispatcher = require('../dispatcher/dispatcher');
var ActionsList = require('./action-list');

module.exports = {
  getTestCaseList: function(data){
    AppDispatcher.getTestCaseList({
      actionType: ActionsList.GET_TEST_CASE_LIST,
      data: data
    });
  }
};
