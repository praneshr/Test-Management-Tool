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

var getAnalytics = assign({}, EventEmitter.prototype, {
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

  setAnalytics: function(data){
    TagList = data || [];
  },

  getAnalytics: function(){
    return TagList;
  },
});

AppDispatcher.register(function(payload) {
  var action = payload.actionType;

  switch(action){
    case ActionsList.GET_ANALYTICS:
      getAnalytics.setAnalytics(payload.data);
      break;

    default:
      return true;
  }
  getAnalytics.emitChange();
  return true;
});

module.exports = getAnalytics;
