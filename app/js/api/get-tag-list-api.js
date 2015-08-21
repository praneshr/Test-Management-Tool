/**
 * @jsx React.DOM
 */

'use strict';

var $ = require('jquery');
var getTagListActions = require('../actions/get-tag-list-action');

module.exports = {
  getTagList: function(){
    $.get('/tags')
    .done(function(data){
      getTagListActions.getTagList(data);
    })
    .error(function(data){
      console.log(error);
    })
  }
};
