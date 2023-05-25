import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import MainLayout from '../../design/MainLayout';
import { Form, Button } from 'react-bootstrap';
import { checkAuthentication, getUsername } from "../../utils/auth";

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
        <MainLayout username={username} handleLogout={handleLogout}>
            <div className="orangtua-create-container">
                <h2>Tambah Data Orang Tua</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId='formNama'>
                        <Form.Label>Nama</Form.Label>
                        <Form.Control
                            type='text'
                            value={nama}
                            onChange={(e) => setNama(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formAlamat">
                        <Form.Label>Alamat</Form.Label>
                        <Form.Control
                            type='text'
                            value={alamat}
                            onChange={(e) => setAlamat(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formProvinsi">
                        <Form.Label>Provinsi</Form.Label>
                        <Form.Control
                            type="text"
                            value={provinsi}
                            onChange={(e) => setProvinsi(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formKabupaten">
                        <Form.Label>Kabupaten</Form.Label>
                        <Form.Control
                            type="text"
                            value={kabupaten}
                            onChange={(e) => setKabupaten(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formKecamatan">
                        <Form.Label>Kecamatan</Form.Label>
                        <Form.Control
                            type="text"
                            value={kecamatan}
                            onChange={(e) => setKecamatan(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formDesa">
                        <Form.Label>Desa</Form.Label>
                        <Form.Control
                            type="text"
                            value={desa}
                            onChange={(e) => setDesa(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formPosyandu">
                        <Form.Label>Posyandu</Form.Label>
                        <Form.Control
                            type="text"
                            value={posyandu}
                            onChange={(e) => setPosyandu(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formRt">
                        <Form.Label>RT</Form.Label>
                        <Form.Control
                            type="text"
                            value={rt}
                            onChange={(e) => setRt(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formRw">
                        <Form.Label>RW</Form.Label>
                        <Form.Control
                            type="text"
                            value={rw}
                            onChange={(e) => setRw(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Tambah
                    </Button>
                </Form>
            </div>
        </MainLayout>
    )
}

export default OrangTuaCreate;