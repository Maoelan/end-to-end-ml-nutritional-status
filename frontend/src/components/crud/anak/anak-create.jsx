import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Button,
} from "reactstrap";
import { checkAuthentication, getUsername } from "../../utils/auth";

import Sidebar from "../../Sidebar/Sidebar.js";
import Navbar from "../../Navbars/AuthNavbar.js";
import Header from "../../Headers/UserHeader.js";

const AnakCreate = ({ handleLogout }) => {
  const [nik, setNik] = useState("");
  const [nama, setNama] = useState("");
  const [jenisKelamin, setJenisKelamin] = useState("");
  const [tanggalLahir, setTanggalLahir] = useState("");
  const [beratLahir, setBeratLahir] = useState("");
  const [tinggiLahir, setTinggiLahir] = useState("");
  const [idOrangTua, setIdOrangTua] = useState("");
  const [orangTuaOptions, setOrangTuaOptions] = useState([]);
  const [redirectToAnakRead, setRedirectToAnakRead] = useState(false);
  const username = getUsername();

  useEffect(() => {
    checkAuthentication();
    fetchOrangTuaOptions();
    document.title = "Tambah Data Anak";
  }, []);

  const fetchOrangTuaOptions = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/orangtua/get"
      );
      setOrangTuaOptions(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      nik: nik,
      nama: nama,
      jenis_kelamin: jenisKelamin,
      tanggal_lahir: tanggalLahir,
      berat_lahir: beratLahir,
      tinggi_lahir: tinggiLahir,
      id_orang_tua: idOrangTua,
    };

    try {
      await axios.post("http://localhost:5000/api/anak/add", data);
      setRedirectToAnakRead(true);
    } catch (error) {
      console.error(error);
    }
  };

  if (redirectToAnakRead) {
    return <Navigate to="/anak-read" />;
  }

  return (
    <>
      <Sidebar />
      <div className="main-content" id="panel">
        <Navbar handleLogout={handleLogout} />
        <Header />
        <div className="anak-create-container">
          <Card className="shadow">
            <CardHeader className="border-0">
              <h2 className="mb-0">Tambah Data Anak</h2>
            </CardHeader>
            <CardBody>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <label className="form-control-label">NIK</label>
                  <Input
                    className="form-control-alternative"
                    type="text"
                    value={nik}
                    onChange={(e) => setNik(e.target.value)}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <label className="form-control-label">Nama</label>
                  <Input
                    className="form-control-alternative"
                    type="text"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <label className="form-control-label">Jenis Kelamin</label>
                  <Input
                    className="form-control-alternative"
                    type="select"
                    value={jenisKelamin}
                    onChange={(e) => setJenisKelamin(e.target.value)}
                    required
                  >
                    <option value="">Pilih Jenis Kelamin</option>
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <label className="form-control-label">Tanggal Lahir</label>
                  <Input
                    className="form-control-alternative"
                    type="date"
                    value={tanggalLahir}
                    onChange={(e) => setTanggalLahir(e.target.value)}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <label className="form-control-label">Berat Lahir</label>
                  <Input
                    className="form-control-alternative"
                    type="number"
                    value={beratLahir}
                    onChange={(e) => setBeratLahir(e.target.value)}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <label className="form-control-label">Tinggi Lahir</label>
                  <Input
                    className="form-control-alternative"
                    type="number"
                    value={tinggiLahir}
                    onChange={(e) => setTinggiLahir(e.target.value)}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <label className="form-control-label">Orang Tua</label>
                  <Input
                    className="form-control-alternative"
                    type="select"
                    value={idOrangTua}
                    onChange={(e) => setIdOrangTua(e.target.value)}
                    required
                  >
                    <option value="">Pilih Orang Tua</option>
                    {orangTuaOptions.map((orangTua) => (
                      <option key={orangTua.id} value={orangTua.id}>
                        {orangTua.nama}
                      </option>
                    ))}
                  </Input>
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

export default AnakCreate;
