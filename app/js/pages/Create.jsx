var React = require('react/addons');
var _ = require('underscore');
var Loader = require('../components/Loader.jsx');
var TagApi = require('../api/get-tag-list-api');
var TagStore = require('../stores/get-tag-list-store');

var Create = React.createClass({
  getInitialState: function() {
    return {
      tagsLoading: true,
      title: '',
      description: '',
      selectedTags: [] 
    };
  },
  componentDidMount: function() {
    TagStore.addChangeListener(this.onTagList);
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
    debugger;
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
  render: function() {
    var tagList = [];
    var _this = this;
    if(!this.state.tagsLoading){
      console.log('done')
      var tagArray = TagStore.getTagList();
      tagArray.tags.map(function(tag, i) {
          tagList.push(<span className="tags" onClick={_this.tagClicked} value={tag}>{tag}</span>);
      });
    }
    return(
      <div className="create">
        <h3>Create a new Test case</h3>
        <p>Name</p>
        <input data-type="input" type="text" onChange={this.onInputChange} value={this.state.title}/>
        <p>Description</p>
        <textarea data-type="textarea"  onChange={this.onInputChange} value={this.state.description}/>
        <p>{this.state.selectedTags.length ? 'Tagged with (' + this.state.selectedTags.length +')' : 'Tag with'}</p>
        <div className="tag-list">
          {
            (this.state.tagsLoading) ? <span><Loader /><div id='loading'>Loading...</div></span> : {tagList}
          }
        </div>
        <button onClick={this.handleSubmit} className="submit">Add</button>
      </div>
    );
  }

});

module.exports = Create;