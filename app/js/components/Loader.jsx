var React = require('react');

var Loader = React.createClass({

  render: function() {
    return (
      <div className="loader-body">
        <div className="loader"></div>
      </div>
    );
  }

});

module.exports = Loader;