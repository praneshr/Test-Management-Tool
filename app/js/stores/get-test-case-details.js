/**
 * @jsx React.DOM
 */

'use strict';

var AppDispatcher = require('../dispatcher/dispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require('underscore');
var ActionsList = require('../actions/action-list');

var tagDetails = {};

var getTestCaseDetails = assign({}, EventEmitter.prototype, {
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
    tagDetails = [];
  },

  setTestCaseDetails: function(data){
    tagDetails = data || [];
  },

  getTestCaseDetails: function(){
    return tagDetails;
  },
});

AppDispatcher.register(function(payload) {
  var action = payload.actionType;

  switch(action){
    case ActionsList.GET_TEST_CASE_DETAILS:
      getTestCaseDetails.setTestCaseDetails(payload.data);
      break;

    default:
      return true;
  }
  getTestCaseDetails.emitChange();
  return true;
});

module.exports = getTestCaseDetails;
