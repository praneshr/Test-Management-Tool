
'use strict';

var React = require('react');
var _ = require('underscore');

var Header = React.createClass({

  componentDidMount: function() {
    this.move();
  },
  componentDidUpdate: function(prevProps, prevState) {
    this.move();
  },
  move: function(){
    var _this = this;
    var pnt = React.findDOMNode(this.refs.parent).childNodes;
    pnt = _.toArray(pnt);
    pnt.map(function(child, i){
      var childValue = child.getAttribute('value').toLowerCase();
      child.classList.remove('highlight');
      if(childValue === _this.props.highlight){
        child.classList.add('highlight');
      }
    });
  },

  render: function() {
    return (
      <div className="header" >
        <div className="frame" ref='parent'>
          <a href="/home" value="index">Home</a>
          <a href="/view" value="view">View all test cases</a>
        </div>
      </div>
    );
  }

});

module.exports = Header;