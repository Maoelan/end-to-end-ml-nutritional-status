import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardHeader, CardBody, Table } from "reactstrap";
import { checkAuthentication, getUsername } from '../utils/auth';
import { Link } from 'react-router-dom';

import Sidebar from '../Sidebar/Sidebar.js';
import Navbar from '../Navbars/AuthNavbar.js';
import Header from '../Headers/UserHeader.js';

const KMeans = ({ handleLogout }) => {
  const [kMeansData, setKMeansData] = useState(null);
  const [isTrained, setIsTrained] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const navigate = checkAuthentication();
    if (navigate) {
      return navigate;
    }

    fetchKMeansData();
    //setUsername(getUsername());
  }, []);

  const fetchKMeansData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/train_kmeans');
      setKMeansData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleTrainKMeans = async () => {
    try {
      await axios.post('http://localhost:5000/api/train_kmeans');
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
              <h2 className="mb-0">K-Means Clustering</h2>
            </CardHeader>
            <CardBody>
              <div className="train-button-container">
                <button className="btn btn-primary" onClick={handleTrainKMeans}>Train</button>
              </div>
              {isTrained && kMeansData && kMeansData.iterations && kMeansData.cluster_labels && (
  <>
<Table className="align-items-center table-flush" responsive>
  <thead className="thead-light">
    <tr>
      <th>Cluster</th>
      <th>Data Points</th>
    </tr>
  </thead>
  <tbody>
    {isTrained &&
      kMeansData &&
      kMeansData.iterations &&
      kMeansData.cluster_labels &&
      kMeansData.iterations.map((iteration, index) => (
        <tr key={index}>
          <td>Cluster {index + 1}</td>
          <td>
            <div>
              {iteration[`cluster_${index + 1}`]?.reduce((rows, dataPoint, i) => {
                if (i % 4 === 0) {
                  rows.push([]);
                }
                rows[Math.floor(i / 4)].push(dataPoint.join(', '));
                return rows;
              }, []).map((row, rowIndex) => (
                <div key={rowIndex}>
                  {row.map((data, dataIndex) => (
                    <span key={dataIndex}>
                      {data}
                      {dataIndex !== row.length - 1 && ','}
                      <br />
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </td>
        </tr>
      ))}
  </tbody>
</Table>
<Table className="align-items-center table-flush" responsive>
  <thead className="thead-light">
    <tr>
      <th>Cluster Count</th>
      <th>Centroid Changes</th>
      <th>Total Iterations</th>
      <th>Cluster Labels</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>{kMeansData?.cluster_count}</td>
      <td>{kMeansData?.centroid_changes}</td>
      <td>{kMeansData?.total_iterations}</td>
      <td>{kMeansData?.cluster_labels?.join(', ')}</td>
    </tr>
  </tbody>
</Table>
  </>
)}
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
};

export default KMeans;