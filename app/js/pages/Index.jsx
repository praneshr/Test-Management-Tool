var React = require('react');

var Index = React.createClass({
  getInitialState: function() {
    return {
      project: 'project 1' 
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
        <h1>Well, Hello There!</h1>
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
            
          </div>
        </div>
      </div>
    );
  }

});

module.exports = Index;