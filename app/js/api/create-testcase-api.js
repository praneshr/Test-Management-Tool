/**
 * @jsx React.DOM
 */

'use strict';

var $ = require('jquery');
var createTeatcaseActions = require('../actions/create-testcase-action');

module.exports = {
  createTestcase: function(data){
    var req = {};
    req.title = data.title;
    req.description = data.description;
    req.tag = [];
    data.tags.map(function(tag,i){req.tag.push(tag)});
    req = $.param(req,true)
    console.log(req);
    debugger;
    $.post('/create/',encodeURI(req))
      .done(function(data){
        createTeatcaseActions.createTestcase(data);
      })
      .error(function(error){
        console.log(error);
      });
  }
};
