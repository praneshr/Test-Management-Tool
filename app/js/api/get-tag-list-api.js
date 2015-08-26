/**
 * @jsx React.DOM
 */

'use strict';

var $ = require('jquery');
var getTagListActions = require('../actions/get-tag-list-action');
var data =  {
"tags": [
"notrun",
"passed",
"failed",
"u_embar",
"p_apimanagement",
"p_apiportal",
"f_planmanagement",
"pranesh ravi"
]
};
module.exports = {
  getTagList: function(){
      getTagListActions.getTagList(JSON.stringify(data));
    // $.get('/tags')
    // .done(function(data){
    // })
    // .error(function(data){
    //   console.log(error);
    // })
  }
};
