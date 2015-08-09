

var React = require('react');

var DefaultLayout = React.createClass({
  componentDidMount: function() {
    console.log("mounted");
  },

  render: function() {
    var pageName = this.props.info.pageName;
    var RenderPage = require('./pages/' + pageName + ".jsx");
    return (
      <div className="layout">
        <RenderPage />
      </div>
    );
  }

});

module.exports = DefaultLayout;