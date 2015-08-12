/**
 * @jsx React.DOM
 */

'use strict';

var AppDispatcher = require('../dispatcher/dispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require('underscore');
var ActionsList = require('../actions/action-list');

var TestCaseList = {};

var getTestCaseList = assign({}, EventEmitter.prototype, {
  emitChange: function(){
    this.emit('change');
  },

  addChangeListener: function(callback) {
    this.on('change', callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener('change', callback);
  },

  clear: function(){
    TestCaseList = [];
  },

  setTestCaseList: function(data){
    TestCaseList = data || [];
  },

  getTestCaseList: function(){
    return TestCaseList;
  },
});

AppDispatcher.register(function(payload) {
  var action = payload.actionType;

  switch(action){
    case ActionsList.GET_TEST_CASE_LIST:
      getTestCaseList.setTestCaseList(payload.data);
      break;

    default:
      return true;
  }
  getTestCaseList.emitChange();
  return true;
});

module.exports = getTestCaseList;
