/**
 * @jsx React.DOM
 */

'use strict';

var $ = require('jquery');
var getTestCaseList = require('../actions/get-test-case-list-action');

module.exports = {
  getTestCaseList: function(){
    var data =  {
      "totalnumber": 2,
      "testcases": [
        {
          "testId": "ID001",
          "testTitle": "Title",
          "testDescription": "Description",
          "jiraBugId": "Bugid",
          "tags": [
            "notrun",
            "passed",
            "failed",
            "u_embar",
            "p_apimanagement",
            "f_planmanagement"
          ]
        },
        {
          "testId": "ID002",
          "testTitle": "Title2",
          "testDescription": "2Description",
          "jiraBugId": "Bugid1",
          "tags": [
            "notrun",
            "passed",
            "failed",
            "u_embar",
            "p_apimanagement",
            "f_planmanagement"
          ]
        },
        {
          "testId": "ID002",
          "testTitle": "Title2",
          "testDescription": "2Description",
          "jiraBugId": "Bugid1",
          "tags": [
            "notrun",
            "passed",
            "failed",
            "u_embar",
            "p_apimanagement",
            "f_planmanagement"
          ]
        },
        {
          "testId": "ID002",
          "testTitle": "Title2",
          "testDescription": "2Description",
          "jiraBugId": "Bugid1",
          "tags": [
            "notrun",
            "passed",
            "failed",
            "u_embar",
            "p_apimanagement",
            "f_planmanagement"
          ]
        },
        {
          "testId": "ID002",
          "testTitle": "Title2",
          "testDescription": "2Description",
          "jiraBugId": "Bugid1",
          "tags": [
            "notrun",
          ]
        },
        {
          "testId": "ID002",
          "testTitle": "Title2",
          "testDescription": "2Description",
          "jiraBugId": "Bugid1",
          "tags": [
            "notrun",
            "failed",
            "u_embar",
            "p_apimanagement",
            "f_planmanagement"
          ]
        },
    ]};
    setTimeout(function(){
      getTestCaseList.getTestCaseList(data);
    },1000);
  }
};
