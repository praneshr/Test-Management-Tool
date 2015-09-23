/**
 * @jsx React.DOM
 */

'use strict';

var $ = require('jquery');
var getTestCaseDetails = require('../actions/get-test-case-details.js');
// var data = {
// "testId": "226",
// "testTitle": "Minimum match tests",
// "testDescription": "The minimum match percentage ensures the matches are returned with more relevance. 100% returns closest results in relevance  whereas 40% relaxes the rule and fuzzy searches with the title. Lesser the %, more the number of results",
// "jiraBugId": "none",
// "tags": [
// "notrun",
// "f_fuzzysearch",
// "p_sms1.5"
// ],
// "requestTags": null
// };
module.exports = {
  getTestCaseDetails: function(id){
    var data = {hello: "lorem ipsum"}
    $.get('/details/',{testCaseId: id})
      .done(function(data){
        getTestCaseDetails.getTestCaseDetails(data);
      })
      .error(function(error){
        console.log(error);
      });
  }
};
