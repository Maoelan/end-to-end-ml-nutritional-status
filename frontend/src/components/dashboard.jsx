import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, CardHeader, NavLink } from "reactstrap";
import Sidebar from "./Sidebar/Sidebar";
import Navbar from "./Navbars/AuthNavbar";
import Header from "./Headers/Header";
import { Bar, Pie } from "react-chartjs-2";

const Dashboard = ({ handleLogout }) => {
  const [anakData, setAnakData] = useState([]);
  const [orangtuaData, setOrangtuaData] = useState([]);
  const [giziData, setGiziData] = useState([]);

  useEffect(() => {
    document.title = "Dashboard";

    fetch("http://localhost:5000/api/anak/get")
      .then((response) => response.json())
      .then((data) => setAnakData(data))
      .catch((error) => console.error(error));

    fetch("http://localhost:5000/api/orangtua/get")
      .then((response) => response.json())
      .then((data) => setOrangtuaData(data))
      .catch((error) => console.error(error));

    fetch("http://localhost:5000/api/gizi/get")
      .then((response) => response.json())
      .then((data) => setGiziData(data))
      .catch((error) => console.error(error));
  }, []);

  const jumlahAnakLakiLaki = anakData.filter(
    (anak) => anak.jenis_kelamin === "Laki-laki"
  ).length;
  const jumlahAnakPerempuan = anakData.filter(
    (anak) => anak.jenis_kelamin === "Perempuan"
  ).length;
  const barChartData = {
    labels: ["Laki-laki", "Perempuan"],
    datasets: [
      {
        label: "Jumlah Anak",
        data: [jumlahAnakLakiLaki, jumlahAnakPerempuan],
        backgroundColor: ["rgba(255, 99, 132, 0.6)", "rgba(54, 162, 235, 0.6)"],
      },
    ],
  };

  const namaDesaCounts = orangtuaData.reduce((counts, orangtua) => {
    counts[orangtua.desa] = (counts[orangtua.desa] || 0) + 1;
    return counts;
  }, {});
  const namaDesaLabels = Object.keys(namaDesaCounts);
  const namaDesaData = Object.values(namaDesaCounts);
  const namaDesaColors = [
    "rgba(255, 99, 132, 0.6)",
    "rgba(54, 162, 235, 0.6)",
    "rgba(255, 206, 86, 0.6)",
    "rgba(75, 192, 192, 0.6)",
    "rgba(153, 102, 255, 0.6)",
  ];
  const namaDesaChartData = {
    labels: namaDesaLabels,
    datasets: [
      {
        data: namaDesaData,
        backgroundColor: namaDesaColors.slice(0, namaDesaData.length),
      },
    ],
  };

  const rataBeratLahirPerempuan =
    anakData
      .filter((anak) => anak.jenis_kelamin === "Perempuan")
      .reduce((sum, anak) => sum + anak.berat_lahir, 0) / jumlahAnakPerempuan;
  const rataBeratLahirLakiLaki =
    anakData
      .filter((anak) => anak.jenis_kelamin === "Laki-laki")
      .reduce((sum, anak) => sum + anak.berat_lahir, 0) / jumlahAnakLakiLaki;
  const rataBeratLahirChartData = {
    labels: ["Perempuan", "Laki-laki"],
    datasets: [
      {
        data: [rataBeratLahirPerempuan, rataBeratLahirLakiLaki],
        backgroundColor: ["rgba(255, 99, 132, 0.6)", "rgba(54, 162, 235, 0.6)"],
      },
    ],
  };

  const rataTinggiLahirPerempuan =
    anakData
      .filter((anak) => anak.jenis_kelamin === "Perempuan")
      .reduce((sum, anak) => sum + anak.tinggi_lahir, 0) / jumlahAnakPerempuan;
  const rataTinggiLahirLakiLaki =
    anakData
      .filter((anak) => anak.jenis_kelamin === "Laki-laki")
      .reduce((sum, anak) => sum + anak.tinggi_lahir, 0) / jumlahAnakLakiLaki;
  const rataTinggiLahirChartData = {
    labels: ["Perempuan", "Laki-laki"],
    datasets: [
      {
        data: [rataTinggiLahirPerempuan, rataTinggiLahirLakiLaki],
        backgroundColor: ["rgba(255, 99, 132, 0.6)", "rgba(54, 162, 235, 0.6)"],
      },
    ],
  };

  const tinggiAnakLakiLaki = giziData
    .filter((gizi) => {
      const anak = anakData.find((anak) => anak.id === gizi.id_anak);
      return anak.jenis_kelamin === "Laki-laki";
    })
    .reduce((counts, gizi) => {
      counts[gizi.tinggi] = (counts[gizi.tinggi] || 0) + 1;
      return counts;
    }, {});
  const tinggiAnakPerempuan = giziData
    .filter((gizi) => {
      const anak = anakData.find((anak) => anak.id === gizi.id_anak);
      return anak.jenis_kelamin === "Perempuan";
    })
    .reduce((counts, gizi) => {
      counts[gizi.tinggi] = (counts[gizi.tinggi] || 0) + 1;
      return counts;
    }, {});
  const tinggiAnakLakiLakiLabels = Object.keys(tinggiAnakLakiLaki);
  const tinggiAnakLakiLakiData = Object.values(tinggiAnakLakiLaki);
  const tinggiAnakPerempuanLabels = Object.keys(tinggiAnakPerempuan);
  const tinggiAnakPerempuanData = Object.values(tinggiAnakPerempuan);
  const tinggiAnakChartData = {
    labels: tinggiAnakLakiLakiLabels,
    datasets: [
      {
        label: "Laki-laki",
        data: tinggiAnakLakiLakiData,
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
      {
        label: "Perempuan",
        data: tinggiAnakPerempuanData,
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
    ],
  };

  const beratAnakLakiLaki = giziData
    .filter((gizi) => {
      const anak = anakData.find((anak) => anak.id === gizi.id_anak);
      return anak.jenis_kelamin === "Laki-laki";
    })
    .reduce((counts, gizi) => {
      counts[gizi.berat] = (counts[gizi.berat] || 0) + 1;
      return counts;
    }, {});
  const beratAnakPerempuan = giziData
    .filter((gizi) => {
      const anak = anakData.find((anak) => anak.id === gizi.id_anak);
      return anak.jenis_kelamin === "Perempuan";
    })
    .reduce((counts, gizi) => {
      counts[gizi.berat] = (counts[gizi.berat] || 0) + 1;
      return counts;
    }, {});
  const beratAnakLakiLakiLabels = Object.keys(beratAnakLakiLaki);
  const beratAnakLakiLakiData = Object.values(beratAnakLakiLaki);
  const beratAnakPerempuanLabels = Object.keys(beratAnakPerempuan);
  const beratAnakPerempuanData = Object.values(beratAnakPerempuan);
  const beratAnakChartData = {
    labels: beratAnakLakiLakiLabels,
    datasets: [
      {
        label: "Laki-laki",
        data: beratAnakLakiLakiData,
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
      {
        label: "Perempuan",
        data: beratAnakPerempuanData,
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
    ],
  };

  return (
    <>
      <Sidebar />
      <div className="main-content" id="panel">
        <Navbar handleLogout={handleLogout} />
        <Header />
        <Container className="mt--7" fluid>
          <Row>
            <Col className="mb-5 mb-xl-0" xl="6">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <Col>
                      <h3 className="mb-0">
                        Jumlah Anak Laki-laki dan Perempuan
                      </h3>
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
                <div className="chart-container">
                  <Bar data={barChartData} />
                </div>
              </Card>
            </Col>
            <Col xl="6">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <Col>
                      <h3 className="mb-0">Jumlah Nama Desa</h3>
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
                <div className="chart-container">
                  <Pie data={namaDesaChartData} />
                </div>
              </Card>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col className="mb-5 mb-xl-0" xl="6">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <Col>
                      <h3 className="mb-0">
                        Rata-rata Berat Lahir Anak Perempuan dan Laki-laki
                      </h3>
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
                <div className="chart-container">
                  <Pie data={rataBeratLahirChartData} />
                </div>
              </Card>
            </Col>
            <Col xl="6">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <Col>
                      <h3 className="mb-0">
                        Rata-rata Tinggi Lahir Anak Perempuan dan
                        Laki-laki
                      </h3>
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
                <div className="chart-container">
                  <Pie data={rataTinggiLahirChartData} />
                </div>
              </Card>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col className="mb-5 mb-xl-0" xl="6">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <Col>
                      <h3 className="mb-0">
                        Tinggi Anak Laki-laki dan Perempuan
                      </h3>
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
                <div className="chart-container">
                  <Bar data={tinggiAnakChartData} />
                </div>
              </Card>
            </Col>
            <Col xl="6">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <Col>
                      <h3 className="mb-0">
                        Berat Anak Laki-laki dan Perempuan
                      </h3>
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
                <div className="chart-container">
                  <Bar data={beratAnakChartData} />
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Dashboard;
