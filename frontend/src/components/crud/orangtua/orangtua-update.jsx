import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  Input,
  Button,
} from "reactstrap";
import { checkAuthentication, getUsername } from "../../utils/auth";

import Sidebar from "../../Sidebar/Sidebar.js";
import Navbar from "../../Navbars/AuthNavbar.js";
import Header from "../../Headers/UserHeader.js";

const OrangTuaUpdate = ({ handleLogout }) => {
  const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");
  const [provinsi, setProvinsi] = useState("");
  const [kabupaten, setKabupaten] = useState("");
  const [kecamatan, setKecamatan] = useState("");
  const [desa, setDesa] = useState("");
  const [posyandu, setPosyandu] = useState("");
  const [rt, setRt] = useState("");
  const [rw, setRw] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchOrangTua = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/orangtua/get/${id}`
        );
        const orangtua = response.data;
        setNama(orangtua.nama);
        setAlamat(orangtua.alamat);
        setProvinsi(orangtua.provinsi);
        setKabupaten(orangtua.kabupaten);
        setKecamatan(orangtua.kecamatan);
        setDesa(orangtua.desa);
        setPosyandu(orangtua.posyandu);
        setRt(orangtua.rt);
        setRw(orangtua.rw);
      } catch (error) {
        console.error(error);
      }
    };

    const navigate = checkAuthentication();
    if (navigate) {
      return navigate;
    }

    fetchOrangTua();
    setUsername(getUsername());
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orangtua = {
      nama,
      alamat,
      provinsi,
      kabupaten,
      kecamatan,
      desa,
      posyandu,
      rt,
      rw,
    };

    try {
      await axios.put(
        `http://localhost:5000/api/orangtua/update/${id}`,
        orangtua
      );
      navigate("/orangtua-read");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Sidebar />
      <div className="main-content" id="panel">
        <Navbar handleLogout={handleLogout} />
        <Header />
        <div className="orangtua-update-container">
          <Card className="shadow">
            <CardHeader className="border-0">
              <h2 className="mb-0">Update Data Orang Tua</h2>
            </CardHeader>
            <CardBody>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <label className="form-control-label">Nama</label>
                  <Input
                    type="text"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <label className="form-control-label">Alamat</label>
                  <Input
                    type="text"
                    value={alamat}
                    onChange={(e) => setAlamat(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <label className="form-control-label">Provinsi</label>
                  <Input
                    type="text"
                    value={provinsi}
                    onChange={(e) => setProvinsi(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <label className="form-control-label">Kabupaten</label>
                  <Input
                    type="text"
                    value={kabupaten}
                    onChange={(e) => setKabupaten(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <label className="form-control-label">Kecamatan</label>
                  <Input
                    type="text"
                    value={kecamatan}
                    onChange={(e) => setKecamatan(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <label className="form-control-label">Desa</label>
                  <Input
                    type="text"
                    value={desa}
                    onChange={(e) => setDesa(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <label className="form-control-label">Posyandu</label>
                  <Input
                    type="text"
                    value={posyandu}
                    onChange={(e) => setPosyandu(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <label className="form-control-label">RT</label>
                  <Input
                    type="text"
                    value={rt}
                    onChange={(e) => setRt(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <label className="form-control-label">RW</label>
                  <Input
                    type="text"
                    value={rw}
                    onChange={(e) => setRw(e.target.value)}
                  />
                </FormGroup>
                <Button color="primary" type="submit">
                  Update
                </Button>
              </Form>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
};

export default OrangTuaUpdate;
