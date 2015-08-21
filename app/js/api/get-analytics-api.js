/**
 * @jsx React.DOM
 */

'use strict';

var $ = require('jquery');
var getAnalyticsActions = require('../actions/get-analytics.js');

module.exports = {
  getAnalytics: function(project){
    $.get('/analytics/',{projectName: project})
      .done(function(data){
        getAnalyticsActions.getAnalytics(data);
      })
      .error(function(error){
        console.log(error);
      });
  }
};
