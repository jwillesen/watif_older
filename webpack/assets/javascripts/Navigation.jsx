import React from 'react';
import {Link} from 'react-router';
import {Navbar, Nav} from 'react-bootstrap';
import {NavItemLink} from 'react-router-bootstrap';

export default class Navigation extends React.Component {
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
