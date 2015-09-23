/**
 * @jsx React.DOM
 */

'use strict';

var $ = require('jquery');
var updateTestCaseAction = require('../actions/update-test-case-action.js');

module.exports = {
  updateTestCase: function(data){
    var req = {};
    req.testId = data.testCaseID || null;
    req.title = data.title || null;
    req.description = data.description || null;
    req.jiraId = data.jira || null;
    req.tag = [];
    data.selectedTags.map(function(tag,i){req.tag.push(tag)});
    req = $.param(req,true);
    console.log(req);
    $.post('/update/',req)
      .done(function(data){
        updateTestCaseAction.updateTestCase(data);
      })
      .error(function(error){
        console.log(error);
      });
  }
};
