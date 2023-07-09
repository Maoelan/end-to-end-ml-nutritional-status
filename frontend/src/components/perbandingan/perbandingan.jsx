import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardHeader, CardBody, Table } from 'reactstrap';
import { checkAuthentication, getUsername } from '../utils/auth';
import Sidebar from '../Sidebar/Sidebar.js';
import Navbar from '../Navbars/AuthNavbar.js';
import Header from '../Headers/UserHeader.js';

const Perbandingan = ({ handleLogout }) => {
  const [kMeansData, setKMeansData] = useState(null);
  const [kMedoidsData, setKMedoidsData] = useState(null);
  const [anakData, setAnakData] = useState(null);
  const [actualLabels, setActualLabels] = useState(null);
  const [evaluationMetrics, setEvaluationMetrics] = useState(null);
  const [username, setUsername] = useState('');
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
    // setUsername(getUsername());
  }, []);

  const fetchKMeansData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/train_kmeans');
      setKMeansData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchKMedoidsData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/train_kmedoids');
      setKMedoidsData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAnakData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/anak/get');
      setAnakData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchActualLabels = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/label/get');
      setActualLabels(response.data.map((item) => item.label_aktual));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (kMeansData && kMedoidsData && actualLabels) {
      const metrics = calculateMetrics(actualLabels, kMeansData.cluster_labels, kMedoidsData.cluster_labels);
      setEvaluationMetrics(metrics);
    }
  }, [kMeansData, kMedoidsData, actualLabels]);

  const calculateMetrics = (actualLabels, kmeansLabels, kmedoidsLabels) => {
    let tpKMeans = 0;
    let tnKMeans = 0;
    let fpKMeans = 0;
    let fnKMeans = 0;
    let tpKMedoids = 0;
    let tnKMedoids = 0;
    let fpKMedoids = 0;
    let fnKMedoids = 0;

    for (let i = 0; i < actualLabels.length; i++) {
      const actual = actualLabels[i];
      const kmeans = kmeansLabels[i];
      const kmedoids = kmedoidsLabels[i];

      if (actual === kmeans) {
        if (actual === kmedoids) {
          tpKMeans++;
          tpKMedoids++;
        } else {
          tpKMeans++;
          fnKMedoids++;
        }
      } else {
        if (actual === kmedoids) {
          fpKMeans++;
          tpKMedoids++;
        } else {
          fpKMeans++;
          fnKMedoids++;
        }
      }

      if (actual !== kmeans) {
        if (actual !== kmedoids) {
          tnKMeans++;
          tnKMedoids++;
        } else {
          tnKMeans++;
          fpKMedoids++;
        }
      } else {
        if (actual !== kmedoids) {
          fnKMeans++;
          tnKMedoids++;
        } else {
          fnKMeans++;
          fpKMedoids++;
        }
      }
    }

    const accuracyKMeans = ((tpKMeans + tnKMeans) / (tpKMeans + tnKMeans + fpKMeans + fnKMeans)).toFixed(2);
    const accuracyKMedoids = ((tpKMedoids + tnKMedoids) / (tpKMedoids + tnKMedoids + fpKMedoids + fnKMedoids)).toFixed(2);
    const precisionKMeans = (tpKMeans / (tpKMeans + fpKMeans)).toFixed(2);
    const precisionKMedoids = (tpKMedoids / (tpKMedoids + fpKMedoids)).toFixed(2);
    const recallKMeans = (tpKMeans / (tpKMeans + fnKMeans)).toFixed(2);
    const recallKMedoids = (tpKMedoids / (tpKMedoids + fnKMedoids)).toFixed(2);
    const f1ScoreKMeans = ((2 * precisionKMeans * recallKMeans) / (precisionKMeans + recallKMeans)).toFixed(2);
    const f1ScoreKMedoids = ((2 * precisionKMedoids * recallKMedoids) / (precisionKMedoids + recallKMedoids)).toFixed(2);

    const comparisonResults = actualLabels.map((actual, index) => {
      const kmeans = kmeansLabels[index];
      const kmedoids = kmedoidsLabels[index];
      const kMeansComparison = actual === kmeans ? 1 : 0;
      const kMedoidsComparison = actual === kmedoids ? 1 : 0;

      return {
        kMeansComparison,
        kMedoidsComparison,
      };
    });

    return {
      tpKMeans,
      tnKMeans,
      fpKMeans,
      fnKMeans,
      tpKMedoids,
      tnKMedoids,
      fpKMedoids,
      fnKMedoids,
      accuracyKMeans,
      accuracyKMedoids,
      precisionKMeans,
      precisionKMedoids,
      recallKMeans,
      recallKMedoids,
      f1ScoreKMeans,
      f1ScoreKMedoids,
      comparisonResults,
    };
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
                <button className="btn btn-primary" onClick={handleToggleTable}>
                  {isTableVisible ? 'Hide Table' : 'Show Table'}
                </button>
              </div>
            </CardHeader>
            <CardBody>
              {kMeansData && kMeansData.cluster_labels &&
                kMedoidsData &&
                kMedoidsData.cluster_labels &&
                anakData &&
                actualLabels &&
                evaluationMetrics && (
                  <>
                    {isTableVisible && (
                      <div className="perbandingan-summary">
                        <Table className="align-items-center table-flush" responsive>
                          <thead className="thead-light">
                            <tr>
                              <th>No</th>
                              <th>Nama Anak</th>
                              <th>K-Means Label</th>
                              <th>K-Medoids Label</th>
                              <th>Label Aktual</th>
                              <th>Perbandingan K-Means</th>
                              <th>Perbandingan K-Medoids</th>
                              <th>CF K-Means</th>
                              <th>CF K-Medoids</th>
                            </tr>
                          </thead>
                          <tbody>
                            {kMeansData.cluster_labels.map((label, index) => {
                              const kmeans = kMeansData.cluster_labels[index];
                              const kmedoids = kMedoidsData.cluster_labels[index];
                              const actual = actualLabels[index];
                              const comparison = evaluationMetrics.comparisonResults[index];

                              const confusionMatrixKMeans =
                                actual === kmeans && actual === kmedoids
                                  ? 'TRUE POSITIVE'
                                  : actual !== kmeans && actual !== kmedoids
                                  ? 'TRUE NEGATIVE'
                                  : actual !== kmeans && actual === kmedoids
                                  ? 'FALSE POSITIVE'
                                  : actual === kmeans && actual !== kmedoids
                                  ? 'FALSE NEGATIVE'
                                  : '';

                              const confusionMatrixKMedoids =
                                actual === kmeans && actual === kmedoids
                                  ? 'TRUE POSITIVE'
                                  : actual !== kmeans && actual !== kmedoids
                                  ? 'TRUE NEGATIVE'
                                  : actual === kmeans && actual !== kmedoids
                                  ? 'FALSE POSITIVE'
                                  : actual !== kmeans && actual === kmedoids
                                  ? 'FALSE NEGATIVE'
                                  : '';

                              const cfKMeansStyle = {
                                fontWeight: 'bold',
                                color:
                                  confusionMatrixKMeans === 'TRUE POSITIVE'
                                    ? 'green'
                                    : confusionMatrixKMeans === 'TRUE NEGATIVE'
                                    ? 'orange'
                                    : confusionMatrixKMeans === 'FALSE POSITIVE'
                                    ? 'dodgerblue'
                                    : confusionMatrixKMeans === 'FALSE NEGATIVE'
                                    ? 'red'
                                    : 'inherit',
                              };

                              const cfKMedoidsStyle = {
                                fontWeight: 'bold',
                                color:
                                  confusionMatrixKMedoids === 'TRUE POSITIVE'
                                    ? 'green'
                                    : confusionMatrixKMedoids === 'TRUE NEGATIVE'
                                    ? 'orange'
                                    : confusionMatrixKMedoids === 'FALSE POSITIVE'
                                    ? 'dodgerblue'
                                    : confusionMatrixKMedoids === 'FALSE NEGATIVE'
                                    ? 'red'
                                    : 'inherit',
                              };

                              return (
                                <tr key={index}>
                                  <td>{index + 1}</td>
                                  <td>{anakData[index].nama}</td>
                                  <td
                                    style={
                                      label === 'GIZI LEBIH'
                                        ? { fontWeight: 'bold', color: 'orange' }
                                        : label === 'GIZI BAIK'
                                        ? { fontWeight: 'bold', color: 'green' }
                                        : { fontWeight: 'bold', color: 'red' }
                                    }
                                  >
                                    {label}
                                  </td>
                                  <td
                                    style={
                                      kmedoids === 'GIZI LEBIH'
                                        ? { fontWeight: 'bold', color: 'orange' }
                                        : kmedoids === 'GIZI BAIK'
                                        ? { fontWeight: 'bold', color: 'green' }
                                        : { fontWeight: 'bold', color: 'red' }
                                    }
                                  >
                                    {kmedoids}
                                  </td>
                                  <td
                                    style={
                                      actual === 'GIZI LEBIH'
                                        ? { fontWeight: 'bold', color: 'orange' }
                                        : actual === 'GIZI BAIK'
                                        ? { fontWeight: 'bold', color: 'green' }
                                        : { fontWeight: 'bold', color: 'red' }
                                    }
                                  >
                                    {actual}
                                  </td>
                                  <td style={comparison.kMeansComparison === 1 ? { fontWeight: 'bold', color: 'green' } : { fontWeight: 'bold', color: 'red' }}>
                                    {comparison.kMeansComparison}
                                  </td>
                                  <td style={comparison.kMedoidsComparison === 1 ? { fontWeight: 'bold', color: 'green' } : { fontWeight: 'bold', color: 'red' }}>
                                    {comparison.kMedoidsComparison}
                                  </td>
                                  <td style={cfKMeansStyle}>{confusionMatrixKMeans}</td>
                                  <td style={cfKMedoidsStyle}>{confusionMatrixKMedoids}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </Table>
                      </div>
                    )}

                    <div className="evaluation-metrics">
                      <h3>Hasil Akurasi, Presisi, Recall, dan F1-Score</h3>
                      <Table className="align-items-center table-flush" responsive>
                        <thead className="thead-light">
                          <tr>
                            <th></th>
                            <th>K-Means</th>
                            <th>K-Medoids</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Akurasi</td>
                            <td>{evaluationMetrics.accuracyKMeans}</td>
                            <td>{evaluationMetrics.accuracyKMedoids}</td>
                          </tr>
                          <tr>
                            <td>Presisi</td>
                            <td>{evaluationMetrics.precisionKMeans}</td>
                            <td>{evaluationMetrics.precisionKMedoids}</td>
                          </tr>
                          <tr>
                            <td>Recall</td>
                            <td>{evaluationMetrics.recallKMeans}</td>
                            <td>{evaluationMetrics.recallKMedoids}</td>
                          </tr>
                          <tr>
                            <td>F1-Score</td>
                            <td>{evaluationMetrics.f1ScoreKMeans}</td>
                            <td>{evaluationMetrics.f1ScoreKMedoids}</td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
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