
'use strict';

var React = require('react');
var _ = require('underscore');
var $ = require('jquery');

var Header = React.createClass({

  componentDidMount: function() {
    var _this = this;
    this.move();
    $(window).resize(function(event) {
      _this.move();
    });
  },
  componentDidUpdate: function(prevProps, prevState) {
    this.move();
  },
  move: function(){
    var _this = this;
    var pnt = React.findDOMNode(this.refs.parent).childNodes;
    var line = React.findDOMNode(this.refs.line);
    pnt = _.toArray(pnt);
    pnt.map(function(child, i){
      var childValue = child.getAttribute('value').toLowerCase();
      child.classList.remove('highlight');
      if(childValue === _this.props.highlight){
        child.classList.add('highlight');
        var width = child.offsetWidth;
        var offset = child.offsetLeft;
        line.style.width = width + 'px';
        line.style.left = offset + 'px';
      }
    });
  },

  render: function() {
    return (
      <div className="header" >
        <a href="/home" className="logo">
          <span>ixcase</span>
        </a>
        <div className="frame" ref='parent'>
          <a href="/home" value="index">Home</a>
          <a href="/view" value="view">View all test cases</a>
          <a href="/create" value="create" className="create">
            <i className="material-icons add">add</i>
            <span>New test case</span>
          </a>
        </div>
        <div className="line" ref="line"></div>
      </div>
    );
  }

});

module.exports = Header;
