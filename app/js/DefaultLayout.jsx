/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');

var DefaultLayout = React.createClass({
  componentDidMount: function() {
    
  },

  render: function() {
    var pageName = this.props.info.pageName;
    var RenderPage = require('./pages/' + pageName + ".jsx");
    return (
      <div className="layout">
        <RenderPage info={this.props.info}/>
      </div>
    );
  }

});

module.exports = DefaultLayout;