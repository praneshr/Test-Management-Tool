/**
 * @jsx React.DOM
 */

'use strict';

var $ = require('jquery');
var getTagListActions = require('../actions/get-tag-list-action');

module.exports = {
  getTagList: function(){
    var data =  {
      "tags": [
        "notrun",
        "passed",
        "failed",
        "u_embar",
        "p_apimanagement",
        "f_planmanagement",
        "Pranesh"
      ]
    };
    setTimeout(function(){
      getTagListActions.getTagList(data);
    },4000);
  }
};
