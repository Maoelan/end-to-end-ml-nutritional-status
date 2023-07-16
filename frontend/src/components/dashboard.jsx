import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  NavLink,
} from "reactstrap";
import Sidebar from "./Sidebar/Sidebar";
import Navbar from "./Navbars/AuthNavbar";
import Header from "./Headers/Header";
import { Bar, Pie } from "react-chartjs-2";

const Dashboard = ({ handleLogout }) => {
  const [orangtuaData, setOrangtuaData] = useState([]);
  const [anakData, setAnakData] = useState([]);
  const [giziData, setGiziData] = useState([]);

  useEffect(() => {
    document.title = "Dashboard";

    // Fetch orangtua data
    fetch("http://localhost:5000/api/orangtua/get")
      .then((response) => response.json())
      .then((data) => setOrangtuaData(data))
      .catch((error) => console.error(error));

    // Fetch anak data
    fetch("http://localhost:5000/api/anak/get")
      .then((response) => response.json())
      .then((data) => setAnakData(data))
      .catch((error) => console.error(error));

    // Fetch gizi data
    fetch("http://localhost:5000/api/gizi/get")
      .then((response) => response.json())
      .then((data) => setGiziData(data))
      .catch((error) => console.error(error));
  }, []);

  // Process data for bar chart (jumlah anak laki-laki dan perempuan)
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

  // Process data for pie chart (persentase tiap nama desa)
  const desaData = orangtuaData.map((orangtua) => orangtua.desa);
  const desaCount = {};
  desaData.forEach((desa) => {
    desaCount[desa] = (desaCount[desa] || 0) + 1;
  });
  const namaDesa = Object.keys(desaCount);
  const persentaseDesa = namaDesa.map(
    (desa) => (desaCount[desa] / orangtuaData.length) * 100
  );
  const desaChartData = {
    labels: namaDesa,
    datasets: [
      {
        data: persentaseDesa,
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
      },
    ],
  };

  // Process data for pie chart (persentase tiap nama posyandu)
  const posyanduData = orangtuaData.map((orangtua) => orangtua.posyandu);
  const posyanduCount = {};
  posyanduData.forEach((posyandu) => {
    posyanduCount[posyandu] = (posyanduCount[posyandu] || 0) + 1;
  });
  const namaPosyandu = Object.keys(posyanduCount);
  const persentasePosyandu = namaPosyandu.map(
    (posyandu) => (posyanduCount[posyandu] / orangtuaData.length) * 100
  );
  const posyanduChartData = {
    labels: namaPosyandu,
    datasets: [
      {
        data: persentasePosyandu,
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
      },
    ],
  };

  // Process data for pie chart (persentase rata-rata berat lahir anak perempuan dan laki-laki)
  const rataBeratLahirPerempuan =
    giziData
      .filter((gizi) => gizi.jenis_kelamin === "Perempuan")
      .reduce((sum, gizi) => sum + gizi.berat, 0) / jumlahAnakPerempuan;
  const rataBeratLahirLakiLaki =
    giziData
      .filter((gizi) => gizi.jenis_kelamin === "Laki-laki")
      .reduce((sum, gizi) => sum + gizi.berat, 0) / jumlahAnakLakiLaki;
  const persentaseRataBeratLahirPerempuan = (rataBeratLahirPerempuan / 1000) * 100;
  const persentaseRataBeratLahirLakiLaki = (rataBeratLahirLakiLaki / 1000) * 100;
  const rataBeratLahirChartData = {
    labels: ["Perempuan", "Laki-laki"],
    datasets: [
      {
        data: [
          persentaseRataBeratLahirPerempuan,
          persentaseRataBeratLahirLakiLaki,
        ],
        backgroundColor: ["rgba(255, 99, 132, 0.6)", "rgba(54, 162, 235, 0.6)"],
      },
    ],
  };

  // Process data for pie chart (persentase rata-rata tinggi lahir anak perempuan dan laki-laki)
  const rataTinggiLahirPerempuan =
    giziData
      .filter((gizi) => gizi.jenis_kelamin === "Perempuan")
      .reduce((sum, gizi) => sum + gizi.tinggi, 0) / jumlahAnakPerempuan;
  const rataTinggiLahirLakiLaki =
    giziData
      .filter((gizi) => gizi.jenis_kelamin === "Laki-laki")
      .reduce((sum, gizi) => sum + gizi.tinggi, 0) / jumlahAnakLakiLaki;
  const persentaseRataTinggiLahirPerempuan = (rataTinggiLahirPerempuan / 50) * 100;
  const persentaseRataTinggiLahirLakiLaki = (rataTinggiLahirLakiLaki / 50) * 100;
  const rataTinggiLahirChartData = {
    labels: ["Perempuan", "Laki-laki"],
    datasets: [
      {
        data: [
          persentaseRataTinggiLahirPerempuan,
          persentaseRataTinggiLahirLakiLaki,
        ],
        backgroundColor: ["rgba(255, 99, 132, 0.6)", "rgba(54, 162, 235, 0.6)"],
      },
    ],
  };

  // Process data for pie chart (persentase tinggi anak laki-laki dan perempuan)
  const tinggiLahirPerempuan = giziData
    .filter((gizi) => gizi.jenis_kelamin === "Perempuan")
    .map((gizi) => gizi.tinggi);
  const tinggiLahirLakiLaki = giziData
    .filter((gizi) => gizi.jenis_kelamin === "Laki-laki")
    .map((gizi) => gizi.tinggi);
  const persentaseTinggiLahirPerempuan = (tinggiLahirPerempuan / 50) * 100;
  const persentaseTinggiLahirLakiLaki = (tinggiLahirLakiLaki / 50) * 100;
  const tinggiLahirChartData = {
    labels: ["Perempuan", "Laki-laki"],
    datasets: [
      {
        data: [
          persentaseTinggiLahirPerempuan,
          persentaseTinggiLahirLakiLaki,
        ],
        backgroundColor: ["rgba(255, 99, 132, 0.6)", "rgba(54, 162, 235, 0.6)"],
      },
    ],
  };

  // Process data for pie chart (persentase berat anak laki-laki dan perempuan)
  const beratLahirPerempuan = giziData
    .filter((gizi) => gizi.jenis_kelamin === "Perempuan")
    .map((gizi) => gizi.berat);
  const beratLahirLakiLaki = giziData
    .filter((gizi) => gizi.jenis_kelamin === "Laki-laki")
    .map((gizi) => gizi.berat);
  const persentaseBeratLahirPerempuan = (beratLahirPerempuan / 3000) * 100;
  const persentaseBeratLahirLakiLaki = (beratLahirLakiLaki / 3000) * 100;
  const beratLahirChartData = {
    labels: ["Perempuan", "Laki-laki"],
    datasets: [
      {
        data: [
          persentaseBeratLahirPerempuan,
          persentaseBeratLahirLakiLaki,
        ],
        backgroundColor: ["rgba(255, 99, 132, 0.6)", "rgba(54, 162, 235, 0.6)"],
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
            <Col className="mb-5 mb-xl-0" xl="8">
              <Card className="shadow">
                <CardHeader className="border-0 custom-card-header">
                  <Row className="align-items-center">
                    <Col>
                      <h3 className="mb-0">Jumlah Anak Laki-laki dan Perempuan</h3>
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
            <Col xl="4">
              <Card className="shadow">
                <CardHeader className="border-0 custom-card-header">
                  <Row className="align-items-center">
                    <Col>
                      <h3 className="mb-0">Persentase Nama Desa</h3>
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
                  <Pie data={desaChartData} />
                </div>
              </Card>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col className="mb-5 mb-xl-0" xl="8">
              <Card className="shadow">
                <CardHeader className="border-0 custom-card-header">
                  <Row className="align-items-center">
                    <Col>
                      <h3 className="mb-0">Persentase Nama Posyandu</h3>
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
                  <Pie data={posyanduChartData} />
                </div>
              </Card>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col className="mb-5 mb-xl-0" xl="4">
              <Card className="shadow">
                <CardHeader className="border-0 custom-card-header">
                  <Row className="align-items-center">
                    <Col>
                      <h3 className="mb-0">Persentase Rata-rata Berat Lahir Anak</h3>
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
            <Col className="mb-5 mb-xl-0" xl="4">
              <Card className="shadow">
                <CardHeader className="border-0 custom-card-header">
                  <Row className="align-items-center">
                    <Col>
                      <h3 className="mb-0">Persentase Rata-rata Tinggi Lahir Anak</h3>
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
            <Col xl="4">
              <Card className="shadow">
                <CardHeader className="border-0 custom-card-header">
                  <Row className="align-items-center">
                    <Col>
                      <h3 className="mb-0">Persentase Tinggi Anak Laki-laki dan Perempuan</h3>
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
                  <Pie data={tinggiLahirChartData} />
                </div>
              </Card>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col className="mb-5 mb-xl-0" xl="4">
              <Card className="shadow">
                <CardHeader className="border-0 custom-card-header">
                  <Row className="align-items-center">
                    <Col>
                      <h3 className="mb-0">Persentase Berat Anak Laki-laki dan Perempuan</h3>
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
                  <Pie data={beratLahirChartData} />
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