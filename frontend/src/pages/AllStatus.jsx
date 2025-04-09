// eslint-disable-next-line no-unused-vars
import React from 'react';
import AllStatusSingleCard from '../components/AllStatusSingleCard'; // Importing the AllStatusSingleCard component
import NavBar from '../components/NavBar';
import SideUserPanel from '../components/SideUserPanel';
import SideNotoficationPanel from '../components/SideNotoficationPanel';

import { Container, Row, Col, Button } from 'react-bootstrap';

const AllStatus = () => {
  return (
    <div style={{ background:'linear-gradient(to right, rgb(252, 252, 252), rgb(114 102 201 / 62%))' }}>
      <NavBar />

      <Row>
        <Col>
          <SideUserPanel />
        </Col>
        <Col xs={7}>
          <AllStatusSingleCard />
        </Col>
        <Col>
          <SideNotoficationPanel />
        </Col>
      </Row>

    </div>
  );
};

export default AllStatus;
