'use strict';

var AppDispatcher = require('../dispatcher/dispatcher');
var ActionsList = require('./action-list');

module.exports = {
  getTestCaseDetails: function(data){
    AppDispatcher.getTestCaseDetails({
      actionType: ActionsList.GET_TEST_CASE_DETAILS,
      data: data
    });
  }
};
