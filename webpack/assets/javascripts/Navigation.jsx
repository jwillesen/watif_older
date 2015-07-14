const React = require('react');
const RB = require('react-bootstrap');
const Navbar = RB.Navbar;

class Navigation extends React.Component {
  render() {
    return <Navbar brand={<a href="/">watif</a>} inverse />;
  }
  
};

module.exports = Navigation;
