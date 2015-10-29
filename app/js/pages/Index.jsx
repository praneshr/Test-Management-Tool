var React = require('react');
var Loader = require('../components/Loader.jsx');
var classnames = require('classnames');

var AnalyticsStore = require('../stores/get-analytics-store');
var AnalyticsApi = require('../api/get-analytics-api');

var TagApi = require('../api/get-tag-list-api');
var TagStore = require('../stores/get-tag-list-store');

var Index = React.createClass({
  getInitialState: function() {
    return {
      project: 'all',
      projectLoading: true,
      statsLoading: true
    };
  },
  componentDidMount: function() {
    AnalyticsStore.addChangeListener(this.onAnalyticsData);
    TagStore.addChangeListener(this.onTagList);
    TagApi.getTagList();
    AnalyticsApi.getAnalytics(this.state.project);
  },
  openHiddenDropdown: function(event){
    console.log('triggered');
    var element = React.findDOMNode(this.refs.select);
    var worked = false;
    if (document.createEvent) {
        var e = document.createEvent("MouseEvents");
        e.initMouseEvent("mousedown", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        worked = element.dispatchEvent(e);
    } else if (element.fireEvent) {
        worked = element.fireEvent("onmousedown");
    }
    if (!worked) {
        alert("Please click on the dropdown arrow.");
    }
  },
  onSelectChnage: function(event){
    var data = event.target.value;
    this.setState({
      project: data,
      statsLoading: true
    });
    AnalyticsApi.getAnalytics(data);
  },
  onAnalyticsData: function(){
    this.setState({
      statsLoading: false
    });
  },
  onTagList: function(){
    this.setState({
      projectLoading: false
    });
  },
  render: function() {
    if(this.state.projectLoading)
      return <Loader />
    var random = Math.floor(Math.random() * 700);
    var totalTC = 00;
    var passed = 00;
    var failed = 00;
    var notRun = 00;
    var percentage = 0;
    if(!this.state.statsLoading){
      var stats = JSON.parse(AnalyticsStore.getAnalytics());
      stats = stats.projects[0];
      totalTC = stats.totalCases;
      percentage = stats.passPercentage === 'NaN'? 0 : stats.passPercentage.toFixed(2);
      notRun = stats.notrun;
      passed = stats.passed;
      failed = stats.failed;
    }
    var TagList = JSON.parse(TagStore.getTagList());
    var options = [];
    options.push(<option value="all">All Projects</option>);
    TagList.tags.map(function(tag,i){
      if(tag.indexOf('p_') === 0){
        options.push(<option value={tag} key={i}>{tag}</option>);
      }
    });
    return (
      <div className="main">
      {this.state.statsLoading && <Loader/>}
      <div className="bgi" >
        <h1>Well, Hello There!</h1>
      </div>
        <div className="analytics">
          <div className="select-wrapper" onClick={this.openHiddenDropdown}>
            <span>{this.state.project}</span>
            <img src="/img/down_arrow.png" alt=""/>
          </div>
          <div className="select-container">
            <select value={this.state.project} onChange={this.onSelectChnage} ref="select">
              {options}
            </select>
          </div>
          <div className="stats">
            <div className="row">
            <a href={this.state.project === 'all' ? '/view/all' : '/view/'+this.state.project}>
              <div className="lr-12 md-12 sm-12 outer bottom-border">
                <div className="body">
                  <p className="title">Total test cases</p>
                  <p className="number">{totalTC}</p>
                </div>
              </div>
              </a>
            </div>
            <div className="row row-2">
              <a href={this.state.project === 'all' ? '/view/passed' : '/view/'+this.state.project+'&passed'}>
              <div className="lr-4 md-4 sm-4 outer same-row">
                <div className="body">
                  <p className="title">Passed <span className={classnames("percentage",{danger: percentage < 70})}>({percentage + '%'})</span></p>
                  <p className="number">{passed}</p>
                </div>
              </div>
              </a>
              <a href={this.state.project === 'all' ? '/view/notrun' : '/view/'+this.state.project+'&notrun'}>
              <div className="lr-4 md-4 sm-4 outer same-row">
                <div className="body">
                  <p className="title">Not-run</p>
                  <p className="number">{notRun}</p>
                </div>
              </div>
              </a>
              <a href={this.state.project === 'all' ? '/view/failed' : '/view/'+this.state.project+'&failed'}>
              <div className="lr-4 md-4 sm-4 outer same-row">
                <div className="body">
                  <p className="title">Failed</p>
                  <p className="number">{failed}</p>
                </div>
              </div>
              </a>
            </div>
          </div>
          <p id="info">*click on the dropdown button to see the project list</p>
        </div>
        <div className="with-love"><div className="love material-icons">favorite_border</div>Made with Love at <a href="http://indix.com">Indix</a></div>
      </div>
    );
  }

});

module.exports = Index;
