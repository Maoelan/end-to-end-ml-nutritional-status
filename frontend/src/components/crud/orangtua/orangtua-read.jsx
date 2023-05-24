import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OrangTuaRead = () => {
  const [orangtuaList, setOrangTuaList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthentication = () => {
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      if (!isLoggedIn) {
        navigate('/login');
      }
    };
  
    checkAuthentication();
    fetchOrangTua();
  }, [navigate]);

  const fetchOrangTua = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/orangtua/get');
      setOrangTuaList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('isLoggedIn');
    navigate('/login', { replace: true });
  };


  return (
    <div>
      <h2>Daftar Orang Tua</h2>
      <button onClick={handleLogout}>Logout</button>
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