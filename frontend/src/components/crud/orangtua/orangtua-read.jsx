import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrangTuaRead = () => {
  const [orangtuaList, setOrangTuaList] = useState([]);

  useEffect(() => {
    fetchOrangTua();
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
    <div>
      <h2>Daftar Orang Tua</h2>
      <table>
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
      </table>
    </div>
  );
};

export default OrangTuaRead;