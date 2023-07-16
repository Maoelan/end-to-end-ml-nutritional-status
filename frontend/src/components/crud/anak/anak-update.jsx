import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
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

const AnakUpdate = ({ handleLogout }) => {
  const [nik, setNik] = useState("");
  const [nama, setNama] = useState("");
  const [jenisKelamin, setJenisKelamin] = useState("");
  const [tanggalLahir, setTanggalLahir] = useState("");
  const [beratLahir, setBeratLahir] = useState("");
  const [tinggiLahir, setTinggiLahir] = useState("");
  const [idOrangTua, setIdOrangTua] = useState("");
  const [orangTuaOptions, setOrangTuaOptions] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchAnak = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/anak/get/${id}`
        );
        const anak = response.data;
        setNik(anak.nik);
        setNama(anak.nama);
        setJenisKelamin(anak.jenis_kelamin);
        setTanggalLahir(anak.tanggal_lahir);
        setBeratLahir(anak.berat_lahir);
        setTinggiLahir(anak.tinggi_lahir);
        setIdOrangTua(anak.id_orang_tua);
      } catch (error) {
        console.error(error);
      }
    };

    checkAuthentication();
    fetchAnak();
    fetchOrangTuaOptions();
  }, [id]);

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
      await axios.put(`http://localhost:5000/api/anak/update/${id}`, data);
      navigate("/anak-read");
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
        <div className="anak-update-container">
          <Card className="shadow">
            <CardHeader className="border-0">
              <h2 className="mb-0">Update Data Anak</h2>
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
                  />
                </FormGroup>
                <FormGroup>
                  <label className="form-control-label">Nama</label>
                  <Input
                    className="form-control-alternative"
                    type="text"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <label className="form-control-label">Jenis Kelamin</label>
                  <Input
                    className="form-control-alternative"
                    type="select"
                    value={jenisKelamin}
                    onChange={(e) => setJenisKelamin(e.target.value)}
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
                  />
                </FormGroup>
                <FormGroup>
                  <label className="form-control-label">Berat Lahir</label>
                  <Input
                    className="form-control-alternative"
                    type="number"
                    value={beratLahir}
                    onChange={(e) => setBeratLahir(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <label className="form-control-label">Tinggi Lahir</label>
                  <Input
                    className="form-control-alternative"
                    type="number"
                    value={tinggiLahir}
                    onChange={(e) => setTinggiLahir(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <label className="form-control-label">Orang Tua</label>
                  <Input
                    className="form-control-alternative"
                    type="select"
                    value={idOrangTua}
                    onChange={(e) => setIdOrangTua(e.target.value)}
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

export default AnakUpdate;
