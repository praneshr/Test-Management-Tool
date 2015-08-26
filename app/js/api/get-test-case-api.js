/**
 * @jsx React.DOM
 */

'use strict';

var $ = require('jquery');
var getTestCaseList = require('../actions/get-test-case-list-action');

module.exports = {
  getTestCaseList: function(tags){
    if(tags.indexOf('all') === 0){
      var param = 'alltestcases';
    }else{
      var param = $.param({tag: tags},true);
    }
    $.get('/testcases?'+param)
    .done(function(data){
      getTestCaseList.getTestCaseList(data);
    })
    .error();
  }
};
