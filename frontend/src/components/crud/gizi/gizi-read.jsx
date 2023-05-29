import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardHeader, CardBody, Table } from "reactstrap";
import { checkAuthentication } from '../../utils/auth';

import Sidebar from '../../Sidebar/Sidebar.js';
import Navbar from '../../Navbars/AuthNavbar.js';
import Header from '../../Headers/UserHeader.js';

const GiziRead = ({ handleLogout }) => {
  const [giziList, setGiziList] = useState([]);

  useEffect(() => {
    const navigate = checkAuthentication();
    if (navigate) {
      return navigate;
    }

    fetchGizi();
  }, []);

  const fetchGizi = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/gizi/get');
      setGiziList(response.data);
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
        <div className="gizi-read-container">
          <Card>
            <CardHeader>
              <h2 className="mb-0">Daftar Data Gizi</h2>
            </CardHeader>
            <CardBody>
              <Table className="align-items-center table-flush" responsive>
                <thead className='thead-light'>
                  <tr>
                    <th>No</th>
                    <th>ID Anak</th>
                    <th>Usia Diukur</th>
                    <th>Tanggal Pengukuran</th>
                    <th>Berat</th>
                    <th>Tinggi</th>
                    <th>Lingkar Lengan Atas</th>
                    <th>Z-Score BB/U</th>
                    <th>Z-Score TB/U</th>
                    <th>BB/U</th>
                    <th>TB/U</th>
                    <th>Naik Berat Badan</th>
                    <th>Jumlah Vitamin A</th>
                  </tr>
                </thead>
                <tbody>
                  {giziList.map((gizi, index) => (
                    <tr key={gizi.id}>
                      <td>{index + 1}</td>
                      <td>{gizi.id_anak}</td>
                      <td>{gizi.usia_diukur}</td>
                      <td>{gizi.tanggal_pengukuran}</td>
                      <td>{gizi.berat}</td>
                      <td>{gizi.tinggi}</td>
                      <td>{gizi.lingkar_lengan_atas}</td>
                      <td>{gizi.zs_bb_umur}</td>
                      <td>{gizi.zs_tb_umur}</td>
                      <td>{gizi.bb_umur}</td>
                      <td>{gizi.tb_umur}</td>
                      <td>{gizi.naik_berat_badan}</td>
                      <td>{gizi.jumlah_vitamin_a}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
};

export default GiziRead;