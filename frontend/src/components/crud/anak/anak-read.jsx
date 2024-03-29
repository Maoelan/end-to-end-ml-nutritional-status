import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardHeader, CardBody, Table } from "reactstrap";
import { checkAuthentication } from "../../utils/auth";
import { Link } from "react-router-dom";

import Sidebar from "../../Sidebar/Sidebar.js";
import Navbar from "../../Navbars/AuthNavbar.js";
import Header from "../../Headers/UserHeader.js";

const AnakRead = ({ handleLogout }) => {
  const [anakList, setAnakList] = useState([]);
  const [isTableVisible, setTableVisible] = useState(true);

  useEffect(() => {
    const navigate = checkAuthentication();
    if (navigate) {
      return navigate;
    }

    fetchAnak();
    document.title = "Lihat Data Anak";
  }, []);

  useEffect(() => {
    return () => {
      setAnakList([]);
    };
  }, []);

  const fetchAnak = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/anak/get");
      setAnakList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/anak/delete/${id}`);
      fetchAnak();
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggleTable = () => {
    setTableVisible(!isTableVisible);
  };

  const formatDate = (dateString) => {
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
        <div className="anak-read-container">
          <Card>
            <CardHeader>
              <div className="d-flex justify-content-between align-items-center">
                <h2 className="mb-0">Daftar Anak</h2>
                <div className="d-flex">
                  <button
                    className="btn btn-primary mr-2"
                    onClick={handleToggleTable}
                  >
                    {isTableVisible ? "Hide Table" : "Show Table"}
                  </button>
                  <Link to="/anak-create">
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
                      <th scope="col">NIK</th>
                      <th scope="col">Name</th>
                      <th scope="col">Jenis Kelamin</th>
                      <th scope="col">Tanggal Lahir</th>
                      <th scope="col">Berat Lahir</th>
                      <th scope="col">Tinggi Lahir</th>
                      <th scope="col">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {anakList.map((anak, index) => (
                      <tr key={anak.id}>
                        <td>{index + 1}</td>
                        <td>{anak.nik}</td>
                        <td>{anak.nama}</td>
                        <td>{anak.jenis_kelamin}</td>
                        <td>{formatDate(anak.tanggal_lahir)}</td>
                        <td>{anak.berat_lahir}</td>
                        <td>{anak.tinggi_lahir}</td>
                        <td className="text-center">
                          <Link to={`/anak-update/${anak.id}`}>
                            <button className="btn btn-warning btn-sm">
                              Update
                            </button>
                          </Link>{" "}
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(anak.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
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

export default AnakRead;