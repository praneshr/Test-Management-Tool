/*
 * A singleton that operates as the central hub for application updates.
 * For more information visit https://facebook.github.io/flux/
 */

'use strict';

var Flux = require('flux');
var assign = require('object-assign');

var AppDispatcher = assign(new Flux.Dispatcher(), {
  getTagList: function(action) {
    this.dispatch(action);
  },
  getTestCaseList: function(action){
    this.dispatch(action);
  },
  getProjectList: function(action){
    this.dispatch(action);
  },
  getAnalytics: function(action){
    this.dispatch(action);
  },
  createTestcase: function(action){
    this.dispatch(action);
  },
  getTestCaseDetails: function(action){
    this.dispatch(action);
  },
  updateTestCase: function(action){
    this.dispatch(action);
  }
});

module.exports = AppDispatcher;
