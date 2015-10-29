var React = require('react');
var Loader = require('../components/Loader.jsx');
var classnames = require('classnames');
var _ = require('underscore');
var Page = require('page');

var TagApi = require('../api/get-tag-list-api');
var TagStore = require('../stores/get-tag-list-store');

var TestCaseDetailsApi = require('../api/get-test-case-details');
var TestCaseDetailsStore = require('../stores/get-test-case-details');

var UpdateTestCaseStore = require('../stores/update-test-case');
var UpdateTestCaseApi = require('../api/update-test-case');

var TestCaseDetails = React.createClass({
  getInitialState: function() {
    return {
      testCaseID: this.props.details.info.testId,
      tagsLoading: true,
      detailsLoading: true,
      selectedTags: [],
      showInput: {},
      title: null,
      description: null,
      jira: null
    };
  },
  componentDidMount: function() {
    TagStore.addChangeListener(this.onTagList);
    TestCaseDetailsStore.addChangeListener(this.onTestCaseDetails);
    UpdateTestCaseStore.addChangeListener(this.onUpdate);
    TagApi.getTagList();
    TestCaseDetailsApi.getTestCaseDetails(this.state.testCaseID);
  },
  componentDidUpdate: function(prevProps, prevState) {
    var tagParent = React.findDOMNode(this.refs.tagParent);
    if(tagParent && this.state.selectedTags.length === 0){
      var children = _.toArray(tagParent.childNodes);
      var selectedTags = [];
      children.map(function(child,i){
         _.toArray(child.classList).indexOf('selected') > 0 && selectedTags.push(child.innerHTML);
      });
      this.setState({
        selectedTags: selectedTags
      });
    }
  },
  onTagList: function(){
    this.isMounted() &&
    this.setState({
      tagsLoading: false
    });
  },
  onTestCaseDetails: function(){
    this.isMounted() &&
    this.setState({
      detailsLoading: false
    });
  },
  tagClicked: function(event){
    var selected =event.target.getAttribute('value');
    var index = this.state.selectedTags.indexOf(selected)
    if( index > -1){
      event.target.classList.remove('selected');
      this.state.selectedTags.splice(index,1);
      this.setState({
        selectedTags:  this.state.selectedTags
      });
    }
    else{
      event.target.classList.add('selected');
      this.state.selectedTags.push(selected);
      this.setState({
        selectedTags: this.state.selectedTags
      });
    }
  },
  onEnter: function(event){
    event.which === 13 && this.inputBlur(event)
  },
  showInput: function(event){
    var value = event.target.getAttribute('value').toLowerCase();
    switch(value){
      case 'title':
      React.findDOMNode(this.refs.title).focus()
      this.setState({
        showInput: {titleInput: true},
        title: event.target.innerHTML
      });
      break;
      case 'description':
      React.findDOMNode(this.refs.description).focus();
      this.setState({
        showInput:{description: true},
        description: event.target.innerHTML
      });
      break;
      case 'jira':
      React.findDOMNode(this.refs.jira).focus();
      this.setState({
        showInput:{jiraInput: true},
        jira: event.target.innerHTML
      });
    }
  },
  inputChange: function(event){
    var target = event.target.getAttribute('data-value').toLowerCase();
    var value = event.target.value;
    var temp = {};
    temp[target] = value
    this.setState(temp);
  },
  inputBlur: function(event){
    var value = event.target.getAttribute('data-value').toLowerCase();
    switch(value){
      case 'title':
      this.setState({
        showInput: {titleInput: false}
      });
      React.findDOMNode(this.refs.title).blur()
      break;
      case 'description':
      this.setState({
        showInput: {description: false}
      });
      React.findDOMNode(this.refs.description).blur();
      break;
      case 'jira':
      this.setState({
        showInput: {jiraInput: false}
      });
      React.findDOMNode(this.refs.jira).blur();
    }
  },
   onUpdate: function(){
    window.toast.autoHide({message: "TestCase "+this.state.testCaseID+" updated"});
    Page('/view/all');
  },
  handleUpdate: function(){
    UpdateTestCaseApi.updateTestCase(this.state);
  },
  goBack: function() {
    history.back();
  },

  render: function() {
    if(this.state.tagsLoading || this.state.detailsLoading)
      return (<span>
                <Loader />
                <div className="placeholder">
                  <div className="line"></div>
                  <div className="line"></div>
                  <div className="line"></div>
                  <div className="line"></div>
                </div>
              </span>);
    var tagList = [];
    var _this = this;
    if(!(this.state.tagsLoading && this.state.detailsLoading)){
      var tagArray = JSON.parse(TagStore.getTagList());
      var testCaseDetails = JSON.parse(TestCaseDetailsStore.getTestCaseDetails());
      tagArray.tags.map(function(tag, i) {
        var flag = testCaseDetails.tags.indexOf(tag);
        tagList.push(<span className={classnames("tags",{selected: (flag > -1)})} key={i} onClick={_this.tagClicked} value={tag}>{tag}</span>);
      });
    }
    return (
      <div className="test-case-details">
        <i className="material-icons back" onClick={this.goBack}>keyboard_arrow_left</i><h2 id="title">Test Case: {this.state.testCaseID}</h2>
        <p className="topic">Title</p>
        <div className="title-holder">
          <input type="text" tabIndex="-1" className={classnames('title-input', {show: this.state.showInput.titleInput})} value={this.state.title} onChange={this.inputChange} data-value="title" onBlur={this.inputBlur} onKeyPress={this.onEnter} ref="title"/>
          <p className={classnames("title",{show: !this.state.showInput.titleInput})} onClick={this.showInput} value="title" title="Click to edit">{this.state.title || testCaseDetails.testTitle}</p>
        </div>
        <p className="topic">Description</p>
        <div className="description-holder">
          <textarea tabIndex="-1" className={classnames('description-input', {show: this.state.showInput.description})} value={this.state.description} onChange={this.inputChange} data-value="description" onBlur={this.inputBlur} onKeyPress={this.onEnter} ref="description"/>
          <p className={classnames("description",{show: !this.state.showInput.description})} onClick={this.showInput} value="description" title="Click to edit">{this.state.description || testCaseDetails.testDescription}</p>
        </div>
        <p className="topic">Jira Bug ID</p>
        <div className="jira-holder">
          <input type="text" tabIndex="-1" className={classnames('jira-input', {show: this.state.showInput.jiraInput})} value={this.state.jira} onChange={this.inputChange} data-value="jira" onBlur={this.inputBlur} onKeyPress={this.onEnter} ref="jira"/>
          <p className={classnames("jira",{show: !this.state.showInput.jiraInput})} onClick={this.showInput} value="jira" title="Click to edit">{this.state.jira || testCaseDetails.jiraBugId}</p>
        </div>
        <p className="topic">Tagged with ({this.state.selectedTags.length})</p>
        <div className="tag-list" ref="tagParent">
          {tagList}
        </div>
        <button onClick={this.handleUpdate} className="update">Update</button>
      </div>
    );
  }

});

module.exports = TestCaseDetails;
