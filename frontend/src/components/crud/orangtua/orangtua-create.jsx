import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardHeader, CardBody, Table, Form, FormGroup, Input, Button } from "reactstrap";
import { checkAuthentication, getUsername } from '../../utils/auth';
import { Link, Navigate } from 'react-router-dom';

import Sidebar from '../../Sidebar/Sidebar.js';
import Navbar from '../../Navbars/AuthNavbar.js';
import Header from '../../Headers/UserHeader.js';

const OrangTuaRead = ({ handleLogout }) => {
  const [orangtuaList, setOrangTuaList] = useState([]);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const navigate = checkAuthentication();
    if (navigate) {
      return navigate;
    }

    fetchOrangTua();
    //setUsername(getUsername());
  }, []);

  useEffect(() => {
    return () => {
      setOrangTuaList([]);
    };
  }, []);

  const fetchOrangTua = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/orangtua/get');
      const orangtuaData = response.data.map((orangtua, index) => ({
        ...orangtua,
        nomor: index + 1
      }));
      setOrangTuaList(orangtuaData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/orangtua/delete/${id}`);
      fetchOrangTua();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Sidebar />
      <div className="main-content" id="panel">
        <Navbar />
        <Header />
        <div className="orangtua-read-container">
          <Card>
            <CardHeader>
              <h2 className="mb-0">Daftar Orang Tua</h2>
            </CardHeader>
            <CardBody>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th>No</th>
                    <th scope="col">Nama</th>
                    <th scope="col">Alamat</th>
                    <th scope="col">Provinsi</th>
                    <th scope="col">Kabupaten</th>
                    <th scope="col">Kecamatan</th>
                    <th scope="col">Desa</th>
                    <th scope="col">Posyandu</th>
                    <th scope="col">RT</th>
                    <th scope="col">RW</th>
                    <th scope="col" className="text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {orangtuaList.map((orangtua) => (
                    <tr key={orangtua.id}>
                      <td>{orangtua.nomor}</td>
                      <td>{orangtua.nama}</td>
                      <td>{orangtua.alamat}</td>
                      <td>{orangtua.provinsi}</td>
                      <td>{orangtua.kabupaten}</td>
                      <td>{orangtua.kecamatan}</td>
                      <td>{orangtua.desa}</td>
                      <td>{orangtua.posyandu}</td>
                      <td>{orangtua.rt}</td>
                      <td>{orangtua.rw}</td>
                      <td className="text-center">
                        <Link to={`/orangtua-update/${orangtua.id}`}>
                          <button className="btn btn-warning btn-sm">Update</button>
                        </Link>
                        {' '}
                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(orangtua.id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div className="mt-4">
                <Link to="/orangtua-create">
                  <button className="btn btn-primary">Tambah Data</button>
                </Link>
                {' '}
                <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
};

const OrangTuaCreate = ({ handleLogout }) => {
  const [nama, setNama] = useState('');
  const [alamat, setAlamat] = useState('');
  const [provinsi, setProvinsi] = useState('');
  const [kabupaten, setKabupaten] = useState('');
  const [kecamatan, setKecamatan] = useState('');
  const [desa, setDesa] = useState('');
  const [posyandu, setPosyandu] = useState('');
  const [rt, setRt] = useState('');
  const [rw, setRw] = useState('');
  const [redirectToOrangTuaRead, setRedirectToOrangTuaRead] = useState(false);
  const username = getUsername();

  useEffect(() => {
    checkAuthentication();
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
      rw: rw
    };

    try {
      await axios.post('http://localhost:5000/api/orangtua/add', data);
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
        <Navbar />
        <Header />
        <div className="orangtua-create-container">
          <Card className="shadow">
            <CardHeader className="border-0">
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