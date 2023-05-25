import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import MainLayout from '../../design/MainLayout';
import '../../css/orangtua.css';
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { checkAuthentication, getUsername } from '../../utils/auth';

const OrangTuaUpdate = ({ handleLogout }) => {
  const [nama, setNama] = useState('');
  const [alamat, setAlamat] = useState('');
  const [provinsi, setProvinsi] = useState('');
  const [kabupaten, setKabupaten] = useState('');
  const [kecamatan, setKecamatan] = useState('');
  const [desa, setDesa] = useState('');
  const [posyandu, setPosyandu] = useState('');
  const [rt, setRt] = useState('');
  const [rw, setRw] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchOrangTua = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/orangtua/get/${id}`);
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
      await axios.put(`http://localhost:5000/api/orangtua/update/${id}`, orangtua);
      navigate('/orangtua-read');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <MainLayout username={username} handleLogout={handleLogout}>
      <div className="orangtua-update-container">
        <h2>Update Data Orang Tua</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formNama">
            <Form.Label>Nama</Form.Label>
            <Form.Control type="text" defaultValue={nama} onChange={(e) => setNama(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="formAlamat">
            <Form.Label>Alamat</Form.Label>
            <Form.Control type="text" defaultValue={alamat} onChange={(e) => setAlamat(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="formProvinsi">
            <Form.Label>Provinsi</Form.Label>
            <Form.Control type="text" defaultValue={provinsi} onChange={(e) => setProvinsi(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="formKabupaten">
            <Form.Label>Kabupaten</Form.Label>
            <Form.Control type="text" defaultValue={kabupaten} onChange={(e) => setKabupaten(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="formKecamatan">
            <Form.Label>Kecamatan</Form.Label>
            <Form.Control type="text" defaultValue={kecamatan} onChange={(e) => setKecamatan(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="formDesa">
            <Form.Label>Desa</Form.Label>
            <Form.Control type="text" defaultValue={desa} onChange={(e) => setDesa(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="formPosyandu">
            <Form.Label>Posyandu</Form.Label>
            <Form.Control type="text" defaultValue={posyandu} onChange={(e) => setPosyandu(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="formRT">
            <Form.Label>RT</Form.Label>
            <Form.Control type="text" defaultValue={rt} onChange={(e) => setRt(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="formRW">
            <Form.Label>RW</Form.Label>
            <Form.Control type="text" defaultValue={rw} onChange={(e) => setRw(e.target.value)} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Update
          </Button>
        </Form>
      </div>
    </MainLayout>
  );
};

export default OrangTuaUpdate;