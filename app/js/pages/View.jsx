/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var Loader = require('../components/Loader.jsx');


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
  componentWillUnmount: function() {
    // debugger;
    delete this.state;
  },
  renderCase: function(testcase,i){
    return <div className="row test-case" key={i}>
            <div className="lr-12 sm-12 md-12 id">{testcase.testId}</div>
            <div className="lr-12 sm-12 md-12 title">{testcase.testTitle}</div>
            <div className="lr-12 sm-12 md-12 description">{testcase.testDescription}</div>
            <div className="lr-12 sm-12 md-12 tags">{testcase.tags}</div>
          </div>;
  },

  render: function() {
    if(this.state.tagListLoading || this.state.testCaseListLoading)
      return <Loader />
    var _this = this;
    var filter = this.props.details.info.filter.toLowerCase();
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
        if (flag !== -1) 
          caseList.push(_this.renderCase(testcase,i));
      });
    }
    tagList.push(<a href={"/view/all"}>All</a>);
    tagListResponse.tags.map(function(tag, i){
      tagList.push(
        <a key={i} href={"/view/"+tag.toLowerCase()}>{tag}</a>
        )
    });
    <div className="row testcase">
    </div>
    if(caseList.length === 0)
          caseList.push(<div className="no-match"><span>No match found...</span></div>);

    return (
      <div className="view">
        {caseList}
        <div className="tag-list">
          <div className="heading">
            <span>Filter by tags</span>
          </div>
          <div className="content">
            {tagList}
          </div>
        </div>
      </div>
    );
  }

});

module.exports = View;