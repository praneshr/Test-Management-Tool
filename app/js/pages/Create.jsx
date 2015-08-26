var React = require('react/addons');
var _ = require('underscore');
var Loader = require('../components/Loader.jsx');
var classnames = require('classnames');

var TagApi = require('../api/get-tag-list-api');
var TagStore = require('../stores/get-tag-list-store');

var createTestCaseStore = require('../stores/create-testcase-store');
var createTestApi = require('../api/create-testcase-api');

var Create = React.createClass({
  getInitialState: function() {
    return {
      tagsLoading: true,
      title: '',
      description: '',
      selectedTags: [],
      adding: false
    };
  },
  componentDidMount: function() {
    TagStore.addChangeListener(this.onTagList);
    createTestCaseStore.addChangeListener(this.onAddSuccess);
    TagApi.getTagList();
  },
  onTagList: function(){
    this.isMounted() &&
    this.setState({
      tagsLoading: false
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
  handleSubmit: function(){
    data={};
    data.title = this.state.title;
    data.description = this.state.description;
    data.tags = this.state.selectedTags;
    createTestApi.createTestcase(data);
    this.setState({
      adding: true
    });
  },
  onInputChange: function(event){
    var type = event.target.getAttribute('data-type');
    var value = event.target.value;
    if(type === 'input')
      this.setState({
        title: value
      });
    if(type === 'textarea')
      this.setState({
        description: value
      });
  },
  onAddSuccess: function(){
    var newTag = JSON.parse(createTestCaseStore.getNewTestcase());
    window.toast.show({message: newTag.message});
    this.setState({
      adding: false,
    });
  },
  render: function() {
    var tagList = [];
    var _this = this;
    if(!this.state.tagsLoading){
      var tagArray = JSON.parse(TagStore.getTagList());
      tagArray.tags.map(function(tag, i) {
          tagList.push(<span className="tags" key={i} onClick={_this.tagClicked} value={tag}>{tag}</span>);
      });
    }
    return(
      <div className={classnames("create",{add:this.state.adding})}>
        {this.state.adding && <Loader />}
        <h1><i className="material-icons add">add</i> New Test Case</h1>
        <p>Title</p>
        <input data-type="input" type="text" onChange={this.onInputChange} value={this.state.title}/>
        <p>Description</p>
        <textarea data-type="textarea"  onChange={this.onInputChange} value={this.state.description}/>
        <p>{this.state.selectedTags.length ? 'Tagged with (' + this.state.selectedTags.length +')' : 'Tag with'}</p>
        <div className="tag-list">
          {
            (this.state.tagsLoading) ? <span><Loader /><div className="placeholder">
                          <div className="line"></div>
                          <div className="line"></div>
                          <div className="line"></div>
                          <div className="line"></div>
                        </div></span> : <span>{tagList}</span>
          }
        </div>
        <button onClick={this.handleSubmit} className="submit">+ Add</button>
      </div>
    );
  }

});

module.exports = Create;
