const React = require('react');
const RouteHandler = require('react-router').RouteHandler;

const Navigation = require('./Navigation');

class App extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <Navigation />
        <RouteHandler />
      </div>
    );
  }
};

module.exports = App;