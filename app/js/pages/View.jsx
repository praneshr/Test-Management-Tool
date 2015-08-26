/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var Loader = require('../components/Loader.jsx');
var classnames = require('classnames');
var page = require('page');
var _ = require('underscore');

var TagApi = require('../api/get-tag-list-api');
var TagStore = require('../stores/get-tag-list-store');

var TestCaseListApi = require('../api/get-test-case-api');
var TestCaseListStore = require('../stores/get-test-case-list-store');

var $ = require('jquery');

var View = React.createClass({
  getInitialState: function() {
    var selectedTags = this.props.details.info.filter.split('&');
    $('body').css('overflow-y','hidden');
    return {
      tagListLoading: true,
      testCaseListLoading: true,
      selectedTags:  selectedTags
    };
  },
  componentDidMount: function() {
    TagStore.addChangeListener(this.onTagList);
    TestCaseListStore.addChangeListener(this.onTestCaseList);
    TestCaseListApi.getTestCaseList(this.props.details.info.filter.split('&'));
    TagApi.getTagList();
  },
  componentWillReceiveProps: function(nextProps) {
    TestCaseListStore.clear();
    var tags;
    if(!this.state.selectedTags.length || this.state.selectedTags.indexOf('all') > -1)
      tags = ['all']
    else
      tags = this.state.selectedTags;
    TestCaseListApi.getTestCaseList(tags);
    this.setState({
      testCaseListLoading: true,
    });
    $('body').css('overflow-y','hidden');
  },

  onTagClick: function(event){
    var selected =event.target.getAttribute('value');
    var index = this.state.selectedTags.indexOf(selected)
    if( index > -1){
      this.state.selectedTags.splice(index,1);
      this.setState({
        selectedTags:  this.state.selectedTags
      });
    }
    else{
      if(selected !== 'all'){
        this.state.selectedTags.push(selected);
        var index = this.state.selectedTags.indexOf('all');
        if(index > -1){
          this.state.selectedTags.splice(index,1);
          this.setState({
            selectedTags: this.state.selectedTags
          });
        }
      }else{
        this.state.selectedTags.push('all')
      }
    }
    var index = this.state.selectedTags.indexOf('all');
    if(this.state.selectedTags.length && index === -1){
      var url = this.state.selectedTags.join('&');
    }else{
      var url = 'all';
      this.setState({
        selectedTags: ['all']
      });
    }
      page('/view/'+url);
  },
  onTagList: function(){
    if(this.isMounted())
      this.setState({
        tagListLoading: false
      });
  },
  onTestCaseList: function(){
    if(this.isMounted()){
      this.setState({
        testCaseListLoading: false
      });
      $('body').css('overflow-y','initial');
    }
  },
  renderCase: function(testcase,i){
    return <div className="row test-case" key={i}>
            <a href={'/teat-case/'+testcase.testId}>
              <div className="lr-12 sm-12 md-12 id">{testcase.testId}</div>
              <div className="lr-12 sm-12 md-12 title">{testcase.testTitle}</div>
            </a>
            <div className="lr-12 sm-12 md-12 description">{testcase.testDescription}</div>
            <div className="lr-12 sm-12 md-12 tags">{testcase.tags}</div>
          </div>;
  },

  render: function() {
    var _this = this;
    if(this.state.tagListLoading)
      return <Loader />
    var tagList = [];
    var tagListResponse = JSON.parse(TagStore.getTagList());
    var isSelected = _this.state.selectedTags.indexOf('all') > -1 ? true : false;
    tagList.push(<a onClick={_this.onTagClick} className={classnames('all', {selected: isSelected})} value='all'>All</a>);
    tagListResponse.tags.map(function(tag, i){
      var tagClass = tag.replace(' ','-');
      var isSelected = _this.state.selectedTags.indexOf(tag.toLowerCase()) > -1 ? true : false;
      tagList.push(
        <a key={i} onClick={_this.onTagClick} className={classnames(tagClass.toLowerCase(), {selected: isSelected})} value={tag.toLowerCase()}>{tag.toLowerCase()}</a>
        )
    });
    var caseListResponse = JSON.parse(TestCaseListStore.getTestCaseList());
    var caseList = [];
    if(this.state.testCaseListLoading){
      var placeholder = <div className="placeholder">
                          <div className="line"></div>
                          <div className="line"></div>
                          <div className="line"></div>
                          <div className="line"></div>
                          <hr/>
                        </div>
      for(var i=0; i< 7; i++){
        caseList.push(placeholder);
      }
    }else{
      caseListResponse.map(function(testcase, i){
          caseList.push(_this.renderCase(testcase,i));
      });
    }
    if(caseList.length === 0){
      caseList.push(<p>No results found...</p>);
    }
    return (
      <div className="row view">
      {this.state.testCaseListLoading && <Loader />}
        <div className="lr-8 md-8 sm-12 same-row">
          {caseList}
        </div>
        <div className="tag-list visible-on-medium-up lr-3 md-3 sm-12 same-row">
          <div className="holder" ref="holder">
            <div className="heading">
              <span>Filter by tags</span>
            </div>
            <div className="content">
              {tagList}
            </div>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = View;
