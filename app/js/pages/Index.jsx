var React = require('react');

var Index = React.createClass({
  getInitialState: function() {
    return {
      project: 'All Projects' 
    };
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
    this.setState({
      project: event.target.value 
    });
  },

  render: function() {
    var totalTC = 117;
    var passed = 96;
    var failed = 4;
    var notRun = 12;
    var blocker = 5;
    return (
      <div className="main">
      <div className="bgi">
        <h1>Well, Hello There!</h1>
      </div>
        <div className="analytics">
          <div className="select-wrapper" onClick={this.openHiddenDropdown}>
            <span>{this.state.project}</span>
            <img src="/img/down_arrow.png" alt=""/>
          </div>
          <div className="select-container">
            <select value={this.state.project} onChange={this.onSelectChnage} ref="select">
              <option value="All Projects">All Projects</option>
              <option value="project 1">Project 1</option>
              <option value="project 2">Project 2</option>
              <option value="project 3">Project 3</option>
              <option value="project 4">Project 4</option>
              <option value="project 5">Project 5</option>
            </select>
          </div>
          <div className="stats">
            <div className="row">
              <div className="lr-12 md-12 sm-12 outer bottom-border">
                <div className="body">
                  <p className="title">Total test cases</p>
                  <p className="number">{totalTC}</p>
                </div>
              </div>
            </div>
            <div className="row row-2">
              <div className="lr-3 md-3 sm-3 outer same-row">
                <div className="body">
                  <p className="title">Passed</p>
                  <p className="number">{passed}</p>
                </div>
              </div>
              <div className="lr-3 md-3 sm-3 outer same-row">
                <div className="body">
                  <p className="title">Not-run</p>
                  <p className="number">{notRun}</p>
                </div>
              </div>
              <div className="lr-3 md-3 sm-3 outer same-row">
                <div className="body">
                  <p className="title">Failed</p>
                  <p className="number">{failed}</p>
                </div>
              </div>
              <div className="lr-3 md-3 sm-3 outer same-row">
                <div className="body">
                  <p className="title">Blocker</p>
                  <p className="number">{blocker}</p>
                </div>
              </div>
            </div>
          </div>
          <p id="info">*click on the dropdown button to see the project list</p>
        </div>
      </div>
    );
  }

});

module.exports = Index;