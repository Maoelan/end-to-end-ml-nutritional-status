import React from 'react';
import { Container, Row, Col, Card, CardHeader, CardBody, NavLink, Table } from 'reactstrap';
import Sidebar from './Sidebar/Sidebar';
import Navbar from './Navbars/AuthNavbar';
import Header from './Headers/Header';

const Dashboard = ({ handleLogout }) => {
  return (
    <>
      <Sidebar />
      <div className="main-content" id="panel">
        <Navbar handleLogout={handleLogout} />
        <Header />
        <Container className="mt--7" fluid>
          <Row>
            <Col className="mb-5 mb-xl-0" xl="8">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <Col>
                      <h3 className="mb-0">Page visits</h3>
                    </Col>
                    <Col className="text-right">
                      <NavLink
                        href="#pablo"
                        color="primary"
                        onClick={(e) => e.preventDefault()}
                      >
                        See all
                      </NavLink>
                    </Col>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Page name</th>
                      <th scope="col">Visitors</th>
                      <th scope="col">Unique users</th>
                      <th scope="col">Bounce rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td scope="row">/argon/</td>
                      <td>4,569</td>
                      <td>340</td>
                      <td>
                        <i className="fas fa-arrow-up text-success mr-3" />{' '}
                        46.53%
                      </td>
                    </tr>
                    <tr>
                      <td scope="row">/argon/index.html</td>
                      <td>3,985</td>
                      <td>319</td>
                      <td>
                        <i className="fas fa-arrow-down text-warning mr-3" />{' '}
                        46.53%
                      </td>
                    </tr>
                    <tr>
                      <td scope="row">/argon/charts.html</td>
                      <td>3,513</td>
                      <td>294</td>
                      <td>
                        <i className="fas fa-arrow-down text-warning mr-3" />{' '}
                        36.49%
                      </td>
                    </tr>
                    <tr>
                      <td scope="row">/argon/tables.html</td>
                      <td>2,050</td>
                      <td>147</td>
                      <td>
                        <i className="fas fa-arrow-up text-success mr-3" />{' '}
                        50.87%
                      </td>
                    </tr>
                    <tr>
                      <td scope="row">/argon/profile.html</td>
                      <td>1,795</td>
                      <td>190</td>
                      <td>
                        <i className="fas fa-arrow-down text-danger mr-3" />{' '}
                        46.53%
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Card>
            </Col>
            <Col xl="4">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <Col>
                      <h3 className="mb-0">Social traffic</h3>
                    </Col>
                    <Col className="text-right">
                      <NavLink
                        href="#pablo"
                        color="primary"
                        onClick={(e) => e.preventDefault()}
                      >
                        See all
                      </NavLink>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <div className="chart">
                    <canvas id="chart-bars" className="chart-canvas" />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          {/* Rest of your content */}
        </Container>
      </div>
    </>
  );
};

export default Dashboard;