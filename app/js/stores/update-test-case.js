/**
 * @jsx React.DOM
 */

'use strict';

var AppDispatcher = require('../dispatcher/dispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require('underscore');
var ActionsList = require('../actions/action-list');

var TagList = {};

var updateTestCase = assign({}, EventEmitter.prototype, {
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
    TagList = [];
  },

  setTestCase: function(data){
    TagList = data || [];
  },

  getNewTestcase: function(){
    return TagList;
  },
});

AppDispatcher.register(function(payload) {
  var action = payload.actionType;

  switch(action){
    case ActionsList.UPDATE_TEST_CASE:
      updateTestCase.setTestCase(payload.data);
      break;

    default:
      return true;
  }
  updateTestCase.emitChange();
  return true;
});

module.exports = updateTestCase;
