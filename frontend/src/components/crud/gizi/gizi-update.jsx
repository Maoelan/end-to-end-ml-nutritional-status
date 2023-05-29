import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardHeader, CardBody, FormGroup, Form, Input, Button } from 'reactstrap';
import { checkAuthentication, getUsername } from '../../utils/auth';

import Sidebar from '../../Sidebar/Sidebar.js';
import Navbar from '../../Navbars/AuthNavbar.js';
import Header from '../../Headers/UserHeader.js';

const GiziUpdate = ({ handleLogout }) => {
  const [idAnak, setIdAnak] = useState('');
  const [usiaDiukur, setUsiaDiukur] = useState('');
  const [tanggalPengukuran, setTanggalPengukuran] = useState('');
  const [berat, setBerat] = useState('');
  const [tinggi, setTinggi] = useState('');
  const [jumlahVitaminA, setJumlahVitaminA] = useState('');
  const [anakOptions, setAnakOptions] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchGizi = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/gizi/get/${id}`);
        const gizi = response.data;
        setIdAnak(gizi.id_anak);
        setUsiaDiukur(gizi.usia_diukur);
        setTanggalPengukuran(gizi.tanggal_pengukuran);
        setBerat(gizi.berat);
        setTinggi(gizi.tinggi);
        setJumlahVitaminA(gizi.jumlah_vitamin_a);
      } catch (error) {
        console.error(error);
      }
    };

    checkAuthentication();
    fetchGizi();
    fetchAnakOptions();
  }, [id]);

  const fetchAnakOptions = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/anak/get');
      setAnakOptions(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      id_anak: idAnak,
      usia_diukur: usiaDiukur,
      tanggal_pengukuran: tanggalPengukuran,
      berat: berat,
      tinggi: tinggi,
      jumlah_vitamin_a: jumlahVitaminA,
    };

    try {
      await axios.put(`http://localhost:5000/api/gizi/update/${id}`, data);
      navigate('/gizi-read');
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
        <div className="gizi-update-container">
          <Card className="shadow">
            <CardHeader className="border-0">
              <h2 className="mb-0">Update Data Gizi</h2>
            </CardHeader>
            <CardBody>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <label className="form-control-label">ID Anak</label>
                  <Input
                    className="form-control-alternative"
                    type="select"
                    value={idAnak}
                    onChange={(e) => setIdAnak(e.target.value)}
                  >
                    <option value="">Pilih Anak</option>
                    {anakOptions.map((anak) => (
                      <option key={anak.id} value={anak.id}>
                        {anak.nama}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
                <FormGroup>
                  <label className="form-control-label">Usia diukur (bulan)</label>
                  <Input
                    className="form-control-alternative"
                    type="number"
                    value={usiaDiukur}
                    onChange={(e) => setUsiaDiukur(e.target.value)}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <label className="form-control-label">Tanggal Pengukuran</label>
                  <Input
                    className="form-control-alternative"
                    type="date"
                    value={tanggalPengukuran}
                    onChange={(e) => setTanggalPengukuran(e.target.value)}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <label className="form-control-label">Berat</label>
                  <Input
                    className="form-control-alternative"
                    type="number"
                    value={berat}
                    onChange={(e) => setBerat(e.target.value)}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <label className="form-control-label">Tinggi</label>
                  <Input
                    className="form-control-alternative"
                    type="number"
                    value={tinggi}
                    onChange={(e) => setTinggi(e.target.value)}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <label className="form-control-label">Jumlah Vitamin A</label>
                  <Input
                    className="form-control-alternative"
                    type="number"
                    value={jumlahVitaminA}
                    onChange={(e) => setJumlahVitaminA(e.target.value)}
                    required
                  />
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

export default GiziUpdate;