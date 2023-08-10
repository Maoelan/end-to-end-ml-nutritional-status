import { useState, useEffect } from "react";
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";

const Header = () => {
  const [totalOrangtua, setTotalOrangtua] = useState(0);
  const [totalAnak, setTotalAnak] = useState(0);
  const [totalGizi, setTotalGizi] = useState(0);
  const [totalUser, setTotalUser] = useState(0);

  useEffect(() => {
    fetch("http://localhost:5000/api/orangtua/get")
      .then((response) => response.json())
      .then((data) => setTotalOrangtua(data.length))
      .catch((error) => console.error(error));

    fetch("http://localhost:5000/api/anak/get")
      .then((response) => response.json())
      .then((data) => setTotalAnak(data.length))
      .catch((error) => console.error(error));

    fetch("http://localhost:5000/api/gizi/get")
      .then((response) => response.json())
      .then((data) => setTotalGizi(data.length))
      .catch((error) => console.error(error));

    fetch("http://localhost:5000/api/user/get")
      .then((response) => response.json())
      .then((data) => setTotalUser(data.length))
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Data Orangtua
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {totalOrangtua}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                          <i className="fas fa-chart-bar" />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Data Anak
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {totalAnak}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                          <i className="fas fa-chart-pie" />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Data Gizi
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {totalGizi}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                          <i className="fas fa-users" />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          User
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {totalUser}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                          <i className="fas fa-percent" />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;