import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardHeader, CardBody, Table } from "reactstrap";
import { checkAuthentication, getUsername } from "../utils/auth";
import { Link } from "react-router-dom";

import Sidebar from "../Sidebar/Sidebar.js";
import Navbar from "../Navbars/AuthNavbar.js";
import Header from "../Headers/UserHeader.js";

const Trains = ({ handleLogout }) => {
  const [kMeansData, setKMeansData] = useState(null);
  const [kMedoidsData, setKMedoidsData] = useState(null);
  const [anakData, setAnakData] = useState(null);
  const [giziData, setGiziData] = useState(null);
  const [isTrained, setIsTrained] = useState(false);
  const [username, setUsername] = useState("");
  const [isTableVisible, setTableVisible] = useState(true);
  const [kMeansTrainingTime, setKMeansTrainingTime] = useState(0);
  const [kMedoidsTrainingTime, setKMedoidsTrainingTime] = useState(0);

  useEffect(() => {
    const navigate = checkAuthentication();
    if (navigate) {
      return navigate;
    }

    fetchKMeansData();
    fetchKMedoidsData();
    fetchAnakData();
    fetchGiziData();
    //setUsername(getUsername());
  }, []);

  const fetchKMeansData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/train_kmeans"
      );
      setKMeansData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleTrainKMeans = async () => {
    try {
      const startTime = Date.now();
      await axios.post("http://localhost:5000/api/train_kmeans");
      const endTime = Date.now();
      const trainingTime = (endTime - startTime) / 1000;
      return trainingTime;
    } catch (error) {
      console.error(error);
    }
  };

  const fetchKMedoidsData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/train_kmedoids"
      );
      setKMedoidsData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleTrainKMedoids = async () => {
    try {
      const startTime = Date.now();
      await axios.post("http://localhost:5000/api/train_kmedoids");
      const endTime = Date.now();
      const trainingTime = (endTime - startTime) / 1000;
      return trainingTime;
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAnakData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/anak/get");
      setAnakData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchGiziData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/gizi/get");
      setGiziData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggleTable = () => {
    setTableVisible(!isTableVisible);
  };

  const handleTrain = async () => {
    try {
      const startTimeKMeans = Date.now();
      const kMeansTrainingTime = await handleTrainKMeans();
      setKMeansTrainingTime(kMeansTrainingTime);

      const startTimeKMedoids = Date.now();
      const kMedoidsTrainingTime = await handleTrainKMedoids();
      setKMedoidsTrainingTime(kMedoidsTrainingTime);

      setIsTrained(true);
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
        <div className="kmeans-container">
          <Card>
            <CardHeader>
              <div className="d-flex justify-content-between align-items-center">
                <h2 className="mb-0">K-Means & K-Medoids Clustering</h2>
                <div className="d-flex">
                  <button
                    className="btn btn-primary"
                    onClick={handleToggleTable}
                  >
                    {isTableVisible ? "Hide Table" : "Show Table"}
                  </button>
                  <button
                    className="btn btn-primary mr-2"
                    onClick={handleTrain}
                  >
                    Train
                  </button>
                </div>
              </div>
            </CardHeader>
            <CardBody>
              {isTrained &&
                kMeansData &&
                kMeansData.cluster_labels &&
                kMedoidsData &&
                kMedoidsData.cluster_labels &&
                anakData &&
                giziData && (
                  <>
                    <div className="kmeans-summary">
                      <p>Cluster Count: {kMeansData.cluster_count}</p>
                      <p>
                        K-Means Total Iterations: {kMeansData.total_iterations}
                      </p>
                      <p>
                        K-Medoids Total Iterations:{" "}
                        {kMedoidsData.total_iterations}
                      </p>
                      <p>K-Means Training Time: {kMeansTrainingTime} seconds</p>{" "}
                      <p>
                        K-Medoids Training Time: {kMedoidsTrainingTime} seconds
                      </p>{" "}
                    </div>
                    <br></br>
                    {isTableVisible && (
                      <div className="cluster-labels">
                        <Table
                          className="align-items-center table-flush"
                          responsive
                        >
                          <thead className="thead-light">
                            <tr>
                              <th>No</th>
                              <th>NAMA ANAK</th>
                              <th>BERAT LAHIR</th>
                              <th>TINGGI LAHIR</th>
                              <th>BERAT</th>
                              <th>TINGGI</th>
                              <th>K-Means Cluster Labels</th>
                              <th>K-Medoids Cluster Labels</th>
                            </tr>
                          </thead>
                          <tbody>
                            {kMeansData.cluster_labels.map((label, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{anakData[index].nama}</td>
                                <td>{anakData[index].berat_lahir}</td>
                                <td>{anakData[index].tinggi_lahir}</td>
                                <td>{giziData[index].berat}</td>
                                <td>{giziData[index].tinggi}</td>
                                <td
                                  style={
                                    label === "GIZI LEBIH"
                                      ? { fontWeight: "bold", color: "orange" }
                                      : label === "GIZI BAIK"
                                      ? { fontWeight: "bold", color: "green" }
                                      : { fontWeight: "bold", color: "red" }
                                  }
                                >
                                  {label}
                                </td>
                                <td
                                  style={
                                    kMedoidsData.cluster_labels[index] ===
                                    "GIZI LEBIH"
                                      ? { fontWeight: "bold", color: "orange" }
                                      : kMedoidsData.cluster_labels[index] ===
                                        "GIZI BAIK"
                                      ? { fontWeight: "bold", color: "green" }
                                      : { fontWeight: "bold", color: "red" }
                                  }
                                >
                                  {kMedoidsData.cluster_labels[index]}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </div>
                    )}
                  </>
                )}
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Trains;
