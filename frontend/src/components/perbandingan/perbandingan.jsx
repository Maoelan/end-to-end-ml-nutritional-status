import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardHeader, CardBody, Table } from "reactstrap";
import { checkAuthentication, getUsername } from '../utils/auth';
import Sidebar from '../Sidebar/Sidebar.js';
import Navbar from '../Navbars/AuthNavbar.js';
import Header from '../Headers/UserHeader.js';

const Perbandingan = ({ handleLogout }) => {const [kMeansData, setKMeansData] = useState(null);
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
      setActualLabels(response.data.map(item => item.label_aktual));
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
    let tp = 0;
    let tn = 0;
    let fp = 0;
    let fn = 0;
  
    for (let i = 0; i < actualLabels.length; i++) {
      const actual = actualLabels[i];
      const kmeans = kmeansLabels[i];
      const kmedoids = kmedoidsLabels[i];
  
      if (actual === kmeans && actual === kmedoids) {
        tp++;
      } else if (actual !== kmeans && actual !== kmedoids) {
        tn++;
      } else if (actual !== kmeans && actual === kmedoids) {
        fp++;
      } else if (actual === kmeans && actual !== kmedoids) {
        fn++;
      }
    }
  
    const accuracyKMeans = ((tp + tn) / (tp + tn + fp + fn)).toFixed(2);
    const accuracyKMedoids = ((tp + tn) / (tp + tn + fp + fn)).toFixed(2);
  
    const confusionMatrixKMeans = {
      tp,
      tn,
      fp,
      fn
    };
  
    const confusionMatrixKMedoids = {
      tp,
      tn,
      fp,
      fn
    };
  
    const comparisonResults = actualLabels.map((actual, index) => {
      const kmeans = kmeansLabels[index];
      const kmedoids = kmedoidsLabels[index];
      const comparison = actual === kmeans && actual === kmedoids ? 1 : 0;
  
      return comparison;
    });
  
    return {
      tp,
      tn,
      fp,
      fn,
      accuracyKMeans,
      accuracyKMedoids,
      confusionMatrixKMeans,
      confusionMatrixKMedoids,
      comparisonResults
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
              {kMeansData && kMeansData.cluster_labels && kMedoidsData && kMedoidsData.cluster_labels && anakData && actualLabels && evaluationMetrics && (
                <>
                {isTableVisible && (
  <div className="perbandingan-summary">
    <Table className="align-items-center table-flush" responsive>
      <thead className="thead-light">
        <tr>
          <th>No</th>
          <th>Nama Anak</th>
          <th>K-Means Cluster Label</th>
          <th>K-Medoids Cluster Label</th>
          <th>Label Aktual</th>
          <th>Perbandingan K-Means</th>
          <th>Perbandingan K-Medoids</th>
          <th>Confusion Matrix K-Means</th>
          <th>Confusion Matrix K-Medoids</th>
        </tr>
      </thead>
      <tbody>
        {kMeansData.cluster_labels.map((label, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{anakData[index].nama}</td>
            <td style={label === "GIZI LEBIH" ? { fontWeight: "bold", color: "orange" } : (label === "GIZI BAIK" ? { fontWeight: "bold", color: "green" } : { fontWeight: "bold", color: "red" })}>{label}</td>
            <td style={kMedoidsData.cluster_labels[index] === "GIZI LEBIH" ? { fontWeight: "bold", color: "orange" } : (kMedoidsData.cluster_labels[index] === "GIZI BAIK" ? { fontWeight: "bold", color: "green" } : { fontWeight: "bold", color: "red" })}>{kMedoidsData.cluster_labels[index]}</td>
            <td style={actualLabels[index] === "GIZI LEBIH" ? { fontWeight: "bold", color: "orange" } : (actualLabels[index] === "GIZI BAIK" ? { fontWeight: "bold", color: "green" } : { fontWeight: "bold", color: "red" })}>{actualLabels[index]}</td>
            <td>{evaluationMetrics.comparisonResults[index]}</td>
            <td>{evaluationMetrics.comparisonResults[index]}</td>
            <td>TP: {evaluationMetrics.confusionMatrixKMeans.tp}, TN: {evaluationMetrics.confusionMatrixKMeans.tn}, FP: {evaluationMetrics.confusionMatrixKMeans.fp}, FN: {evaluationMetrics.confusionMatrixKMeans.fn}</td>
            <td>TP: {evaluationMetrics.confusionMatrixKMedoids.tp}, TN: {evaluationMetrics.confusionMatrixKMedoids.tn}, FP: {evaluationMetrics.confusionMatrixKMedoids.fp}, FN: {evaluationMetrics.confusionMatrixKMedoids.fn}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  </div>
)}
                  <div className="evaluation-metrics">
                    <h3>Hasil Akurasi</h3>
                    <p>Accuracy K-Means: {evaluationMetrics.accuracyKMeans}</p>
                    <p>Accuracy K-Medoids: {evaluationMetrics.accuracyKMedoids}</p>
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