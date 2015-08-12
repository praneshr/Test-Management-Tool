/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var TagApi = require('../api/get-tag-list-api');
var TagStore = require('../stores/get-tag-list-store');

var TestCaseListApi = require('../api/get-test-case-api');
var TestCaseListStore = require('../stores/get-test-case-list-store');

var View = React.createClass({
  getInitialState: function() {
    return {
      tagListLoading: true,
      testCaseListLoading: true 
    };
  },
  componentDidMount: function() {
    TagStore.addChangeListener(this.onTagList);
    TestCaseListStore.addChangeListener(this.onTestCaseList);
    TagApi.getTagList();
    TestCaseListApi.getTestCaseList();
  },
  componentDidUpdate: function(prevProps, prevState) {

  },
  onTagList: function(){
    this.setState({
      tagListLoading: false 
    });
  },

  onTestCaseList: function(){
    this.setState({
      testCaseListLoading: false 
    });
  },
  renderCase: function(testcase,i){
    return <div className="row" key={i}>
            <div className="lr-12 sm-12 md-12"><p>{testcase.testId}</p></div>
            <div className="lr-12 sm-12 md-12"><p>{testcase.testTitle}</p></div>
            <div className="lr-12 sm-12 md-12"><p>{testcase.testDescription}</p></div>
            <div className="lr-12 sm-12 md-12"><p>{testcase.tags}</p></div>
          </div>;
  },

  render: function() {
    if(this.state.tagListLoading || this.state.testCaseListLoading)
      return <div>Loading</div>
    var _this = this
    var hash = window.location.hash;
    var filter = hash.split('#')[1];
    var tagListResponse = TagStore.getTagList();
    var caseListResponse = TestCaseListStore.getTestCaseList();
    var tagList = [];
    var caseList = [];
    var filteredCase = [];
    if(filter === 'all'){
      caseListResponse.testcases.map(function(testcase, i){
        caseList.push(_this.renderCase(testcase,i));
      });
    }
    if(tagListResponse.tags.indexOf(filter)+1){
      caseListResponse.testcases.map(function(testcase, i){
        var flag = testcase.tags.indexOf(filter);
        if(flag !== -1)
          filteredCase.push(i);
      });
      caseListResponse.testcases.map(function(testcase, i){
        var flag = filteredCase.indexOf(i);
        if (flag !== -1) {
          caseList.push(_this.renderCase(testcase,i));
        };
      });
    }
    tagList.push(<a href={"/view#all"}>All</a>);
    tagListResponse.tags.map(function(tag, i){
      tagList.push(
        <a href={"/view#"+tag.toLowerCase()}>{tag}</a>
        )
    });
    <div className="row testcase">
    </div>
    return (
      <div className="view">
        {caseList}
        <div className="tag-list">
          {tagList}
        </div>
      </div>
    );
  }

});

module.exports = View;