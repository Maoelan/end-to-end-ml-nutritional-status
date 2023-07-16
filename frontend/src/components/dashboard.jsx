import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  NavLink,
  Table,
} from "reactstrap";
import Sidebar from "./Sidebar/Sidebar";
import Navbar from "./Navbars/AuthNavbar";
import Header from "./Headers/Header";

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
