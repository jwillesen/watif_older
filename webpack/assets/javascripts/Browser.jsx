const React = require('react');
const {Grid, Row, Col} = require('react-bootstrap');

const Card = require('./browser/Card');

class Browser extends React.Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col xs={6} md={4}>
            <Card />
          </Col>
          <Col xs={6} md={4}>
            <Card />
          </Col>
          <Col xs={6} md={4}>
            <Card />
          </Col>
          <Col xs={6} md={4}>
            <Card />
          </Col>
          <Col xs={6} md={4}>
            <Card />
          </Col>
          <Col xs={6} md={4}>
            <Card />
          </Col>
          <Col xs={6} md={4}>
            <Card />
          </Col>
        </Row>
      </Grid>
    );
  }
};

module.exports = Browser;
