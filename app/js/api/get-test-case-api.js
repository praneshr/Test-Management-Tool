/**
 * @jsx React.DOM
 */

'use strict';

var $ = require('jquery');
var getTestCaseList = require('../actions/get-test-case-list-action');

module.exports = {
  getTestCaseList: function(tags){
    var param = $.param({tag: tags},true);
    console.log('getting--> /?',param);
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
            "f_planmanagement",
            "pranesh"
          ]
        },
        {
          "testId": "ID002",
          "testTitle": "Title2",
          "testDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel dignissim velit. Mauris vel neque imperdiet turpis sagittis commodo vel quis diam. Maecenas laoreet laoreet mi tincidunt ullamcorper. Nullam venenatis convallis leo, ut pharetra magna ultricies quis.",
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
          "testDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel dignissim velit. Mauris vel neque imperdiet turpis sagittis commodo vel quis diam. Maecenas laoreet laoreet mi tincidunt ullamcorper. Nullam venenatis convallis leo, ut pharetra magna ultricies quis.",
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
          "testDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel dignissim velit. Mauris vel neque imperdiet turpis sagittis commodo vel quis diam. Maecenas laoreet laoreet mi tincidunt ullamcorper. Nullam venenatis convallis leo, ut pharetra magna ultricies quis.",
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
          "testDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel dignissim velit. Mauris vel neque imperdiet turpis sagittis commodo vel quis diam. Maecenas laoreet laoreet mi tincidunt ullamcorper. Nullam venenatis convallis leo, ut pharetra magna ultricies quis.",
          "jiraBugId": "Bugid1",
          "tags": [
            "notrun",
            "pranesh"
          ]
        },
        {
          "testId": "ID002",
          "testTitle": "Title2",
          "testDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel dignissim velit. Mauris vel neque imperdiet turpis sagittis commodo vel quis diam. Maecenas laoreet laoreet mi tincidunt ullamcorper. Nullam venenatis convallis leo, ut pharetra magna ultricies quis.",
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
    },3000);
  }
};
