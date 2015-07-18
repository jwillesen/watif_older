const React = require('react');
const {Link} = require('react-router');
const {Navbar, Nav} = require('react-bootstrap');
const {NavItemLink} = require('react-router-bootstrap');

class Navigation extends React.Component {
  render() {
    return (
      <Navbar brand={<Link to="home">watif</Link>} inverse>
        <Nav>
          <NavItemLink to="browse">Browse</NavItemLink>
        </Nav>
      </Navbar>
    );
  }
  
};

module.exports = Navigation;
