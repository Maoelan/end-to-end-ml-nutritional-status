import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MainLayout from '../../design/MainLayout';
import '../../css/orangtua.css'
import { Button, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { checkAuthentication, getUsername } from '../../utils/auth';
import { Link } from 'react-router-dom';

const OrangTuaRead = ({ handleLogout }) => {
  const [orangtuaList, setOrangTuaList] = useState([]);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const navigate = checkAuthentication();
    if (navigate) {
      return navigate;
    }

    fetchOrangTua();
    setUsername(getUsername());
  }, []);

  useEffect(() => {
    return () => {
      setOrangTuaList([]);
    };
  }, []);

  const fetchOrangTua = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/orangtua/get');
      setOrangTuaList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <MainLayout username={ username } handleLogout={ handleLogout }>
      <div className="orangtua-read-container">
        <h2>Daftar Orang Tua</h2>
        <Link to="/orangtua-create">
          <Button variant="primary">Tambah Data</Button>
        </Link>
        <div className="table-container">
        <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nama</th>
            <th>Alamat</th>
            <th>Provinsi</th>
            <th>Kabupaten</th>
            <th>Kecamatan</th>
            <th>Desa</th>
            <th>Posyandu</th>
            <th>RT</th>
            <th>RW</th>
          </tr>
        </thead>
        <tbody>
          {orangtuaList.map((orangtua) => (
            <tr key={orangtua.id}>
              <td>{orangtua.id}</td>
              <td>{orangtua.nama}</td>
              <td>{orangtua.alamat}</td>
              <td>{orangtua.provinsi}</td>
              <td>{orangtua.kabupaten}</td>
              <td>{orangtua.kecamatan}</td>
              <td>{orangtua.desa}</td>
              <td>{orangtua.posyandu}</td>
              <td>{orangtua.rt}</td>
              <td>{orangtua.rw}</td>
            </tr>
          ))}
        </tbody>
      </Table>
        </div>
      </div>
    </MainLayout>
  );
};

export default OrangTuaRead;