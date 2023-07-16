import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardHeader, CardBody, Table } from "reactstrap";
import { checkAuthentication } from "../utils/auth";
import Sidebar from "../Sidebar/Sidebar.js";
import Navbar from "../Navbars/AuthNavbar.js";
import Header from "../Headers/UserHeader.js";
import { Link } from "react-router-dom";

const Perbandingan = ({ handleLogout }) => {
  const [kMeansData, setKMeansData] = useState(null);
  const [kMedoidsData, setKMedoidsData] = useState(null);
  const [anakData, setAnakData] = useState(null);
  const [actualLabels, setActualLabels] = useState(null);
  const [evaluationMetrics, setEvaluationMetrics] = useState(null);
  const [isTableVisible, setTableVisible] = useState(true);

  useEffect(() => {
    const navigate = checkAuthentication();
    if (navigate) {
      return navigate;
    }

    fetchKMeansData();
    fetchKMedoidsData();
    fetchAnakData();
    fetchActualLabels();
    document.title = "Perbandingan";
    // setUsername(getUsername());
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

  const fetchAnakData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/anak/get");
      setAnakData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchActualLabels = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/label/get");
      setActualLabels(response.data.map((item) => item.label_aktual));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (kMeansData && kMedoidsData && actualLabels) {
      const metrics = calculateMetrics(
        actualLabels,
        kMeansData.cluster_labels,
        kMedoidsData.cluster_labels
      );
      setEvaluationMetrics(metrics);
    }
  }, [kMeansData, kMedoidsData, actualLabels]);

  const calculateMetrics = (actualLabels, kmeansLabels, kmedoidsLabels) => {
    let tpKMeansGiziLebih = 0;
    let tnKMeansGiziLebih = 0;
    let fpKMeansGiziLebih = 0;
    let fnKMeansGiziLebih = 0;

    let tpKMeansGiziBaik = 0;
    let tnKMeansGiziBaik = 0;
    let fpKMeansGiziBaik = 0;
    let fnKMeansGiziBaik = 0;

    let tpKMeansGiziKurang = 0;
    let tnKMeansGiziKurang = 0;
    let fpKMeansGiziKurang = 0;
    let fnKMeansGiziKurang = 0;

    let tpKMedoidsGiziLebih = 0;
    let tnKMedoidsGiziLebih = 0;
    let fpKMedoidsGiziLebih = 0;
    let fnKMedoidsGiziLebih = 0;

    let tpKMedoidsGiziBaik = 0;
    let tnKMedoidsGiziBaik = 0;
    let fpKMedoidsGiziBaik = 0;
    let fnKMedoidsGiziBaik = 0;

    let tpKMedoidsGiziKurang = 0;
    let tnKMedoidsGiziKurang = 0;
    let fpKMedoidsGiziKurang = 0;
    let fnKMedoidsGiziKurang = 0;

    for (let i = 0; i < actualLabels.length; i++) {
      const actual = actualLabels[i];
      const kmeans = kmeansLabels[i];
      const kmedoids = kmedoidsLabels[i];

      if (actual === "GIZI LEBIH") {
        if (kmeans === "GIZI LEBIH") {
          tpKMeansGiziLebih++;
        } else {
          fnKMeansGiziLebih++;
        }

        if (kmedoids === "GIZI LEBIH") {
          tpKMedoidsGiziLebih++;
        } else {
          fnKMedoidsGiziLebih++;
        }
      } else if (actual === "GIZI BAIK") {
        if (kmeans === "GIZI BAIK") {
          tpKMeansGiziBaik++;
        } else {
          fnKMeansGiziBaik++;
        }

        if (kmedoids === "GIZI BAIK") {
          tpKMedoidsGiziBaik++;
        } else {
          fnKMedoidsGiziBaik++;
        }
      } else if (actual === "GIZI KURANG") {
        if (kmeans === "GIZI KURANG") {
          tpKMeansGiziKurang++;
        } else {
          fnKMeansGiziKurang++;
        }

        if (kmedoids === "GIZI KURANG") {
          tpKMedoidsGiziKurang++;
        } else {
          fnKMedoidsGiziKurang++;
        }
      }

      if (actual !== "GIZI LEBIH") {
        if (kmeans !== "GIZI LEBIH") {
          tnKMeansGiziLebih++;
        } else {
          fpKMeansGiziLebih++;
        }

        if (kmedoids !== "GIZI LEBIH") {
          tnKMedoidsGiziLebih++;
        } else {
          fpKMedoidsGiziLebih++;
        }
      }

      if (actual !== "GIZI BAIK") {
        if (kmeans !== "GIZI BAIK") {
          tnKMeansGiziBaik++;
        } else {
          fpKMeansGiziBaik++;
        }

        if (kmedoids !== "GIZI BAIK") {
          tnKMedoidsGiziBaik++;
        } else {
          fpKMedoidsGiziBaik++;
        }
      }

      if (actual !== "GIZI KURANG") {
        if (kmeans !== "GIZI KURANG") {
          tnKMeansGiziKurang++;
        } else {
          fpKMeansGiziKurang++;
        }

        if (kmedoids !== "GIZI KURANG") {
          tnKMedoidsGiziKurang++;
        } else {
          fpKMedoidsGiziKurang++;
        }
      }
    }

    const evaluationMetrics = {
      tpKMeansGiziLebih,
      tnKMeansGiziLebih,
      fpKMeansGiziLebih,
      fnKMeansGiziLebih,
      tpKMeansGiziBaik,
      tnKMeansGiziBaik,
      fpKMeansGiziBaik,
      fnKMeansGiziBaik,
      tpKMeansGiziKurang,
      tnKMeansGiziKurang,
      fpKMeansGiziKurang,
      fnKMeansGiziKurang,
      tpKMedoidsGiziLebih,
      tnKMedoidsGiziLebih,
      fpKMedoidsGiziLebih,
      fnKMedoidsGiziLebih,
      tpKMedoidsGiziBaik,
      tnKMedoidsGiziBaik,
      fpKMedoidsGiziBaik,
      fnKMedoidsGiziBaik,
      tpKMedoidsGiziKurang,
      tnKMedoidsGiziKurang,
      fpKMedoidsGiziKurang,
      fnKMedoidsGiziKurang,
    };

    return evaluationMetrics;
  };

  const calculateAccuracy = (tp, tn, fp, fn) => {
    const total = tp + tn + fp + fn;
    const correct = tp + tn;
    return (correct / total) * 100;
  };

  const calculatePrecision = (tp, fp) => {
    if (tp === 0 && fp === 0) return 0;
    return (tp / (tp + fp)) * 100;
  };

  const calculateRecall = (tp, fn) => {
    if (tp === 0 && fn === 0) return 0;
    return (tp / (tp + fn)) * 100;
  };

  const handleToggleTable = () => {
    setTableVisible(!isTableVisible);
  };

  return (
    <>
      <Sidebar />
      <div className="main-content" id="panel">
        <Navbar handleLogout={handleLogout} />
        <Header />
        <div className="perbandingan-container">
          <Card>
            <CardHeader>
              <div className="d-flex justify-content-between align-items-center">
                <h2 className="mb-0">Perbandingan K-Means dan K-Medoids</h2>
                <div className="d-flex">
                  <button
                    className="btn btn-primary mr-2"
                    onClick={handleToggleTable}
                  >
                    {isTableVisible ? "Hide Table" : "Show Table"}
                  </button>
                  <Link to="/label-create">
                    <button className="btn btn-primary">
                      Tambah Data Label Aktual
                    </button>
                  </Link>
                </div>
              </div>
            </CardHeader>
            <CardBody>
              {kMeansData &&
                kMeansData.cluster_labels &&
                kMedoidsData &&
                kMedoidsData.cluster_labels &&
                anakData &&
                actualLabels &&
                evaluationMetrics && (
                  <>
                    {isTableVisible && (
                      <div className="perbandingan-summary">
                        <Table
                          className="align-items-center table-flush"
                          responsive
                        >
                          <thead className="thead-light">
                            <tr>
                              <th>No</th>
                              <th>Nama Anak</th>
                              <th>K-Means Label</th>
                              <th>K-Medoids Label</th>
                              <th>Label Aktual</th>
                            </tr>
                          </thead>
                          <tbody>
                            {kMeansData.cluster_labels.map((label, index) => {
                              {/*const kmeans = kMeansData.cluster_labels[index];*/}
                              const kmedoids =
                                kMedoidsData.cluster_labels[index];
                              const actual = actualLabels[index];

                              return (
                                <tr key={index}>
                                  <td>{index + 1}</td>
                                  <td>{anakData[index].nama}</td>
                                  <td
                                    style={
                                      label === "GIZI LEBIH"
                                        ? {
                                            fontWeight: "bold",
                                            color: "orange",
                                          }
                                        : label === "GIZI BAIK"
                                        ? { fontWeight: "bold", color: "green" }
                                        : { fontWeight: "bold", color: "red" }
                                    }
                                  >
                                    {label}
                                  </td>
                                  <td
                                    style={
                                      kmedoids === "GIZI LEBIH"
                                        ? {
                                            fontWeight: "bold",
                                            color: "orange",
                                          }
                                        : kmedoids === "GIZI BAIK"
                                        ? { fontWeight: "bold", color: "green" }
                                        : { fontWeight: "bold", color: "red" }
                                    }
                                  >
                                    {kmedoids}
                                  </td>
                                  <td
                                    style={
                                      actual === "GIZI LEBIH"
                                        ? {
                                            fontWeight: "bold",
                                            color: "orange",
                                          }
                                        : actual === "GIZI BAIK"
                                        ? { fontWeight: "bold", color: "green" }
                                        : { fontWeight: "bold", color: "red" }
                                    }
                                  >
                                    {actual}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </Table>

                        <br></br>

                        <Table
                          className="align-items-center table-flush"
                          responsive
                        >
                          <thead className="thead-light">
                            <tr>
                              <th>Metric</th>
                              <th>K-Means GIZI LEBIH</th>
                              <th>K-Means GIZI BAIK</th>
                              <th>K-Means GIZI KURANG</th>
                              <th>K-Medoids GIZI LEBIH</th>
                              <th>K-Medoids GIZI BAIK</th>
                              <th>K-Medoids GIZI KURANG</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>TP</td>
                              <td>{evaluationMetrics.tpKMeansGiziLebih}</td>
                              <td>{evaluationMetrics.tpKMeansGiziBaik}</td>
                              <td>{evaluationMetrics.tpKMeansGiziKurang}</td>
                              <td>{evaluationMetrics.tpKMedoidsGiziLebih}</td>
                              <td>{evaluationMetrics.tpKMedoidsGiziBaik}</td>
                              <td>{evaluationMetrics.tpKMedoidsGiziKurang}</td>
                            </tr>
                            <tr>
                              <td>TN</td>
                              <td>{evaluationMetrics.tnKMeansGiziLebih}</td>
                              <td>{evaluationMetrics.tnKMeansGiziBaik}</td>
                              <td>{evaluationMetrics.tnKMeansGiziKurang}</td>
                              <td>{evaluationMetrics.tnKMedoidsGiziLebih}</td>
                              <td>{evaluationMetrics.tnKMedoidsGiziBaik}</td>
                              <td>{evaluationMetrics.tnKMedoidsGiziKurang}</td>
                            </tr>
                            <tr>
                              <td>FP</td>
                              <td>{evaluationMetrics.fpKMeansGiziLebih}</td>
                              <td>{evaluationMetrics.fpKMeansGiziBaik}</td>
                              <td>{evaluationMetrics.fpKMeansGiziKurang}</td>
                              <td>{evaluationMetrics.fpKMedoidsGiziLebih}</td>
                              <td>{evaluationMetrics.fpKMedoidsGiziBaik}</td>
                              <td>{evaluationMetrics.fpKMedoidsGiziKurang}</td>
                            </tr>
                            <tr>
                              <td>FN</td>
                              <td>{evaluationMetrics.fnKMeansGiziLebih}</td>
                              <td>{evaluationMetrics.fnKMeansGiziBaik}</td>
                              <td>{evaluationMetrics.fnKMeansGiziKurang}</td>
                              <td>{evaluationMetrics.fnKMedoidsGiziLebih}</td>
                              <td>{evaluationMetrics.fnKMedoidsGiziBaik}</td>
                              <td>{evaluationMetrics.fnKMedoidsGiziKurang}</td>
                            </tr>
                            <tr>
                              <td>Accuracy</td>
                              <td>
                                {calculateAccuracy(
                                  evaluationMetrics.tpKMeansGiziLebih,
                                  evaluationMetrics.tnKMeansGiziLebih,
                                  evaluationMetrics.fpKMeansGiziLebih,
                                  evaluationMetrics.fnKMeansGiziLebih
                                ).toFixed(2)}
                                %
                              </td>
                              <td>
                                {calculateAccuracy(
                                  evaluationMetrics.tpKMeansGiziBaik,
                                  evaluationMetrics.tnKMeansGiziBaik,
                                  evaluationMetrics.fpKMeansGiziBaik,
                                  evaluationMetrics.fnKMeansGiziBaik
                                ).toFixed(2)}
                                %
                              </td>
                              <td>
                                {calculateAccuracy(
                                  evaluationMetrics.tpKMeansGiziKurang,
                                  evaluationMetrics.tnKMeansGiziKurang,
                                  evaluationMetrics.fpKMeansGiziKurang,
                                  evaluationMetrics.fnKMeansGiziKurang
                                ).toFixed(2)}
                                %
                              </td>
                              <td>
                                {calculateAccuracy(
                                  evaluationMetrics.tpKMedoidsGiziLebih,
                                  evaluationMetrics.tnKMedoidsGiziLebih,
                                  evaluationMetrics.fpKMedoidsGiziLebih,
                                  evaluationMetrics.fnKMedoidsGiziLebih
                                ).toFixed(2)}
                                %
                              </td>
                              <td>
                                {calculateAccuracy(
                                  evaluationMetrics.tpKMedoidsGiziBaik,
                                  evaluationMetrics.tnKMedoidsGiziBaik,
                                  evaluationMetrics.fpKMedoidsGiziBaik,
                                  evaluationMetrics.fnKMedoidsGiziBaik
                                ).toFixed(2)}
                                %
                              </td>
                              <td>
                                {calculateAccuracy(
                                  evaluationMetrics.tpKMedoidsGiziKurang,
                                  evaluationMetrics.tnKMedoidsGiziKurang,
                                  evaluationMetrics.fpKMedoidsGiziKurang,
                                  evaluationMetrics.fnKMedoidsGiziKurang
                                ).toFixed(2)}
                                %
                              </td>
                            </tr>
                            <tr>
                              <td>Precision</td>
                              <td>
                                {calculatePrecision(
                                  evaluationMetrics.tpKMeansGiziLebih,
                                  evaluationMetrics.fpKMeansGiziLebih
                                ).toFixed(2)}
                                %
                              </td>
                              <td>
                                {calculatePrecision(
                                  evaluationMetrics.tpKMeansGiziBaik,
                                  evaluationMetrics.fpKMeansGiziBaik
                                ).toFixed(2)}
                                %
                              </td>
                              <td>
                                {calculatePrecision(
                                  evaluationMetrics.tpKMeansGiziKurang,
                                  evaluationMetrics.fpKMeansGiziKurang
                                ).toFixed(2)}
                                %
                              </td>
                              <td>
                                {calculatePrecision(
                                  evaluationMetrics.tpKMedoidsGiziLebih,
                                  evaluationMetrics.fpKMedoidsGiziLebih
                                ).toFixed(2)}
                                %
                              </td>
                              <td>
                                {calculatePrecision(
                                  evaluationMetrics.tpKMedoidsGiziBaik,
                                  evaluationMetrics.fpKMedoidsGiziBaik
                                ).toFixed(2)}
                                %
                              </td>
                              <td>
                                {calculatePrecision(
                                  evaluationMetrics.tpKMedoidsGiziKurang,
                                  evaluationMetrics.fpKMedoidsGiziKurang
                                ).toFixed(2)}
                                %
                              </td>
                            </tr>
                            <tr>
                              <td>Recall</td>
                              <td>
                                {calculateRecall(
                                  evaluationMetrics.tpKMeansGiziLebih,
                                  evaluationMetrics.fnKMeansGiziLebih
                                ).toFixed(2)}
                                %
                              </td>
                              <td>
                                {calculateRecall(
                                  evaluationMetrics.tpKMeansGiziBaik,
                                  evaluationMetrics.fnKMeansGiziBaik
                                ).toFixed(2)}
                                %
                              </td>
                              <td>
                                {calculateRecall(
                                  evaluationMetrics.tpKMeansGiziKurang,
                                  evaluationMetrics.fnKMeansGiziKurang
                                ).toFixed(2)}
                                %
                              </td>
                              <td>
                                {calculateRecall(
                                  evaluationMetrics.tpKMedoidsGiziLebih,
                                  evaluationMetrics.fnKMedoidsGiziLebih
                                ).toFixed(2)}
                                %
                              </td>
                              <td>
                                {calculateRecall(
                                  evaluationMetrics.tpKMedoidsGiziBaik,
                                  evaluationMetrics.fnKMedoidsGiziBaik
                                ).toFixed(2)}
                                %
                              </td>
                              <td>
                                {calculateRecall(
                                  evaluationMetrics.tpKMedoidsGiziKurang,
                                  evaluationMetrics.fnKMedoidsGiziKurang
                                ).toFixed(2)}
                                %
                              </td>
                            </tr>
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

export default Perbandingan;
