/**
 * @jsx React.DOM
 */

'use strict';

var $ = require('jquery');
var updateTestCaseAction = require('../actions/update-test-case-action.js');

module.exports = {
  updateTestCase: function(data){
    var req = {};
    debugger;
    req.testId = data.testCaseID || 'none';
    req.title = data.title || 'none';
    req.description = data.description || 'none';
    req.jiraId = data.jira || 'none';
    req.tag = [];
    data.selectedTags.map(function(tag,i){req.tag.push(tag)});
    req = $.param(req,true);
    console.log(req);
    $.post('/update/',encodeURI(req))
      .done(function(data){
        updateTestCaseAction.updateTestCase(data);
      })
      .error(function(error){
        console.log(error);
      });
  }
};
