import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Button,
} from "reactstrap";
import { checkAuthentication } from "../../utils/auth";

import Sidebar from "../../Sidebar/Sidebar.js";
import Navbar from "../../Navbars/AuthNavbar.js";
import Header from "../../Headers/UserHeader.js";

const LabelCreate = ({ handleLogout }) => {
  const [labelAktual, setLabelAktual] = useState("");
  const [redirectToPerbandingan, setRedirectToPerbandingan] = useState(false);

  useEffect(() => {
    checkAuthentication();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      label_aktual: labelAktual,
    };

    try {
      await axios.post("http://localhost:5000/api/label/add", data);
      setRedirectToPerbandingan(true);
    } catch (error) {
      console.error(error);
    }
  };

  if (redirectToPerbandingan) {
    return <Navigate to="/perbandingan" />;
  }

  return (
    <>
      <Sidebar />
      <div className="main-content" id="panel">
        <Navbar handleLogout={handleLogout} />
        <Header />
        <div className="anak-create-container">
          <Card className="shadow">
            <CardHeader className="border-0">
              <h2 className="mb-0">Tambah Data Label</h2>
            </CardHeader>
            <CardBody>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <label className="form-control-label">Label Aktual</label>
                  <Input
                    className="form-control-alternative"
                    type="select"
                    value={labelAktual}
                    onChange={(e) => setLabelAktual(e.target.value)}
                    required
                  >
                    <option value="">Pilih Label Aktual</option>
                    <option value="GIZI LEBIH">GIZI LEBIIH</option>
                    <option value="GIZI BAIK">GIZI BAIK</option>
                    <option value="GIZI KURANG">GIZI KURANG</option>
                  </Input>
                </FormGroup>
                <Button type="submit" color="primary">
                  Tambah
                </Button>
              </Form>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
};

export default LabelCreate;
