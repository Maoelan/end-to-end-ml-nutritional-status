import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardHeader, CardBody, Table } from "reactstrap";
import { checkAuthentication } from "../../utils/auth";
import { Link } from "react-router-dom";

import Sidebar from "../../Sidebar/Sidebar.js";
import Navbar from "../../Navbars/AuthNavbar.js";
import Header from "../../Headers/UserHeader.js";

const GiziRead = ({ handleLogout }) => {
  const [giziList, setGiziList] = useState([]);
  const [anakList, setAnakList] = useState([]);
  const [isTableVisible, setTableVisible] = useState(true);

  useEffect(() => {
    const navigate = checkAuthentication();
    if (navigate) {
      return navigate;
    }

    fetchGizi();
    fetchAnakList();
    document.title = "Lihat Data Gizi";
  }, []);

  useEffect(() => {
    return () => {
      setGiziList([]);
    };
  }, []);

  const fetchAnakList = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/anak/get");
      setAnakList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchGizi = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/gizi/get");
      setGiziList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/gizi/delete/${id}`);
      fetchGizi();
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggleTable = () => {
    setTableVisible(!isTableVisible);
  };

  const formatDateYear = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString('id-ID', options);
    return formattedDate;
  };

  return (
    <>
      <Sidebar />
      <div className="main-content" id="panel">
        <Navbar handleLogout={handleLogout} />
        <Header />
        <div className="gizi-read-container">
          <Card>
            <CardHeader>
              <div className="d-flex justify-content-between align-items-center">
                <h2 className="mb-0">Daftar Data Gizi</h2>
                <div className="d-flex">
                  <button
                    className="btn btn-primary mr-2"
                    onClick={handleToggleTable}
                  >
                    {isTableVisible ? "Hide Table" : "Show Table"}
                  </button>
                  <Link to="/gizi-create">
                    <button className="btn btn-primary">Tambah Data</button>
                  </Link>
                </div>
              </div>
            </CardHeader>
            <CardBody>
              {isTableVisible && (
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th>No</th>
                      <th>Nama Anak</th>
                      <th>Usia Diukur</th>
                      <th>Tanggal Pengukuran</th>
                      <th>Berat</th>
                      <th>Tinggi</th>
                      <th>Jumlah Vitamin A</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {giziList.map((gizi, index) => {
                      const anak = anakList.find(
                        (anak) => anak.id === gizi.id_anak
                      );
                      const namaAnak = anak ? anak.nama : "";

                      return (
                        <tr key={gizi.id}>
                          <td>{index + 1}</td>
                          <td>{namaAnak}</td>
                          <td>{gizi.usia_diukur}</td>
                          <td>{formatDateYear(gizi.tanggal_pengukuran)}</td>
                          <td>{gizi.berat}</td>
                          <td>{gizi.tinggi}</td>
                          <td>{gizi.jumlah_vitamin_a}</td>
                          <td className="text-center">
                            <Link to={`/gizi-update/${gizi.id}`}>
                              <button className="btn btn-warning btn-sm">
                                Update
                              </button>
                            </Link>{" "}
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => handleDelete(gizi.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              )}
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
};

export default GiziRead;