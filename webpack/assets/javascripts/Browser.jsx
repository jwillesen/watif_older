import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';

import Card from './browser/Card';

export default class Browser extends React.Component {
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
