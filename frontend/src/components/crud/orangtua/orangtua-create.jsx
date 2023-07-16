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
import { checkAuthentication } from "../../utils/auth";

import Sidebar from "../../Sidebar/Sidebar";
import Navbar from "../../Navbars/AuthNavbar.js";
import Header from "../../Headers/UserHeader.js";

const OrangTuaCreate = ({ handleLogout }) => {
  const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");
  const [provinsi, setProvinsi] = useState("");
  const [kabupaten, setKabupaten] = useState("");
  const [kecamatan, setKecamatan] = useState("");
  const [desa, setDesa] = useState("");
  const [posyandu, setPosyandu] = useState("");
  const [rt, setRt] = useState("");
  const [rw, setRw] = useState("");
  const [redirectToOrangTuaRead, setRedirectToOrangTuaRead] = useState(false);

  useEffect(() => {
    checkAuthentication();
    document.title = "Tambah Data Orangtua";
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      nama: nama,
      alamat: alamat,
      provinsi: provinsi,
      kabupaten: kabupaten,
      kecamatan: kecamatan,
      desa: desa,
      posyandu: posyandu,
      rt: rt,
      rw: rw,
    };

    try {
      await axios.post("http://localhost:5000/api/orangtua/add", data);
      setRedirectToOrangTuaRead(true);
    } catch (error) {
      console.error(error);
    }
  };

  if (redirectToOrangTuaRead) {
    return <Navigate to="/orangtua-read" />;
  }

  return (
    <>
      <Sidebar />
      <div className="main-content" id="panel">
        <Navbar handleLogout={handleLogout} />
        <Header />
        <div className="orangtua-read-container">
          <Card>
            <CardHeader>
              <h2 className="mb-0">Tambah Data Orang Tua</h2>
            </CardHeader>
            <CardBody>
              <Form onSubmit={handleSubmit}>
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
                  <label className="form-control-label">Alamat</label>
                  <Input
                    className="form-control-alternative"
                    type="text"
                    value={alamat}
                    onChange={(e) => setAlamat(e.target.value)}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <label className="form-control-label">Provinsi</label>
                  <Input
                    className="form-control-alternative"
                    type="text"
                    value={provinsi}
                    onChange={(e) => setProvinsi(e.target.value)}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <label className="form-control-label">Kabupaten</label>
                  <Input
                    className="form-control-alternative"
                    type="text"
                    value={kabupaten}
                    onChange={(e) => setKabupaten(e.target.value)}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <label className="form-control-label">Kecamatan</label>
                  <Input
                    className="form-control-alternative"
                    type="text"
                    value={kecamatan}
                    onChange={(e) => setKecamatan(e.target.value)}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <label className="form-control-label">Desa</label>
                  <Input
                    className="form-control-alternative"
                    type="text"
                    value={desa}
                    onChange={(e) => setDesa(e.target.value)}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <label className="form-control-label">Posyandu</label>
                  <Input
                    className="form-control-alternative"
                    type="text"
                    value={posyandu}
                    onChange={(e) => setPosyandu(e.target.value)}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <label className="form-control-label">RT</label>
                  <Input
                    className="form-control-alternative"
                    type="text"
                    value={rt}
                    onChange={(e) => setRt(e.target.value)}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <label className="form-control-label">RW</label>
                  <Input
                    className="form-control-alternative"
                    type="text"
                    value={rw}
                    onChange={(e) => setRw(e.target.value)}
                    required
                  />
                </FormGroup>
                <div className="text-center">
                  <Button className="my-4" color="primary" type="submit">
                    Tambah
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
};

export default OrangTuaCreate;
