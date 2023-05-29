import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardHeader, CardBody, Table } from "reactstrap";
import { checkAuthentication, getUsername } from '../../utils/auth';
import { Link } from 'react-router-dom';

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

export default OrangTuaRead;