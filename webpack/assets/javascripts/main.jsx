require('bootstrap/dist/js/bootstrap.js');
if (typeof __TEST__ === 'undefined') require('bootstrap/dist/css/bootstrap.css');

const React = require('react');
const RB = require('react-bootstrap');

document.addEventListener('DOMContentLoaded', () => {
  React.render(
    <div className="container-fluid">
      <RB.Navbar brand={<a href="/">watif</a>} inverse />
      <h1>Hello World!</h1>
      <p>The answer is {gon.answer}</p>
    </div>,
    document.body
  );
});
