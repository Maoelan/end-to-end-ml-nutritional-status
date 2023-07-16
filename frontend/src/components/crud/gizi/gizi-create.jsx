import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Button,
} from "reactstrap";
import { Navigate } from "react-router-dom";
import { checkAuthentication, getUsername } from "../../utils/auth";

import Sidebar from "../../Sidebar/Sidebar.js";
import Navbar from "../../Navbars/AuthNavbar.js";
import Header from "../../Headers/UserHeader.js";

const GiziCreate = ({ handleLogout }) => {
  const [idAnak, setIdAnak] = useState("");
  const [usiaDiukur, setUsiaDiukur] = useState("");
  const [tanggalPengukuran, setTanggalPengukuran] = useState("");
  const [berat, setBerat] = useState("");
  const [tinggi, setTinggi] = useState("");
  const [jumlahVitaminA, setJumlahVitaminA] = useState("");
  const [anakOptions, setAnakOptions] = useState([]);
  const [redirectToGiziRead, setRedirectToGiziRead] = useState(false);
  const username = getUsername();

  useEffect(() => {
    checkAuthentication();
    fetchAnakOptions();
  }, []);

  const fetchAnakOptions = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/anak/get");
      setAnakOptions(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      id_anak: idAnak,
      usia_diukur: usiaDiukur,
      tanggal_pengukuran: tanggalPengukuran,
      berat: berat,
      tinggi: tinggi,
      jumlah_vitamin_a: jumlahVitaminA,
    };

    try {
      await axios.post("http://localhost:5000/api/gizi/add", data);
      setRedirectToGiziRead(true);
    } catch (error) {
      console.error(error);
    }
  };

  if (redirectToGiziRead) {
    return <Navigate to="/gizi-read" />;
  }

  return (
    <>
      <Sidebar />
      <div className="main-content" id="panel">
        <Navbar handleLogout={handleLogout} />
        <Header />
        <div className="gizi-create-container">
          <Card className="shadow">
            <CardHeader className="border-0">
              <h2 className="mb-0">Tambah Data Gizi</h2>
            </CardHeader>
            <CardBody>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <label className="form-control-label">Nama Anak</label>
                  <Input
                    className="form-control-alternative"
                    type="select"
                    value={idAnak}
                    onChange={(e) => setIdAnak(e.target.value)}
                    required
                  >
                    <option value="">Pilih Nama Anak</option>
                    {anakOptions.map((anak) => (
                      <option key={anak.id} value={anak.id}>
                        {anak.nama}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
                <FormGroup>
                  <label className="form-control-label">Usia Diukur</label>
                  <Input
                    className="form-control-alternative"
                    type="number"
                    value={usiaDiukur}
                    onChange={(e) => setUsiaDiukur(e.target.value)}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <label className="form-control-label">
                    Tanggal Pengukuran
                  </label>
                  <Input
                    className="form-control-alternative"
                    type="date"
                    value={tanggalPengukuran}
                    onChange={(e) => setTanggalPengukuran(e.target.value)}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <label className="form-control-label">Berat</label>
                  <Input
                    className="form-control-alternative"
                    type="number"
                    value={berat}
                    onChange={(e) => setBerat(e.target.value)}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <label className="form-control-label">Tinggi</label>
                  <Input
                    className="form-control-alternative"
                    type="number"
                    value={tinggi}
                    onChange={(e) => setTinggi(e.target.value)}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <label className="form-control-label">Jumlah Vitamin A</label>
                  <Input
                    className="form-control-alternative"
                    type="number"
                    value={jumlahVitaminA}
                    onChange={(e) => setJumlahVitaminA(e.target.value)}
                    required
                  />
                </FormGroup>
                <Button type="submit" color="primary">
                  Tambah
                </Button>
              </Form>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
};

export default GiziCreate;
