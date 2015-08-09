

var React = require('react');

var DefaultLayout = React.createClass({

  render: function() {
    return (
      <div className="layout">
        {this.props.info}
      </div>
    );
  }

});

module.exports = DefaultLayout;