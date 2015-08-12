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

var getTagList = assign({}, EventEmitter.prototype, {
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

  setTagList: function(data){
    TagList = data || [];
  },

  getTagList: function(){
    return TagList;
  },
});

AppDispatcher.register(function(payload) {
  var action = payload.actionType;

  switch(action){
    case ActionsList.GET_TAG_LIST:
      getTagList.setTagList(payload.data);
      break;

    default:
      return true;
  }
  getTagList.emitChange();
  return true;
});

module.exports = getTagList;
