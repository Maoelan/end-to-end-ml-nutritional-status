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
              <br></br>
              {isTrained && kMeansData && kMeansData.iterations && kMeansData.cluster_labels && (
                <>
                  <div className="kmeans-summary">
                    <p>Cluster Count: {kMeansData.cluster_count}</p>
                    <p>Total Iterations: {kMeansData.total_iterations}</p>
                  </div>
                  <br></br>
                  <div className="cluster-labels">
                    <Table className="align-items-center table-flush" responsive>
                      <thead className="thead-light">
                        <tr>
                          <th>Data</th>
                          <th>Cluster Labels</th>
                        </tr>
                      </thead>
                      <tbody>
                        {kMeansData.cluster_labels.map((label, index) => (
                          <tr key={index}>
                            <td>Data {index + 1}</td>
                            <td>{label}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                  <br></br>
                  {kMeansData.iterations.slice(0, 3).map((iteration, index) => (
                    <div key={index}>
                      <h4>Iterasi {index + 1}</h4>
                      <Table bordered>
                        <thead>
                          <tr>
                            <th>Data Points</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <Table>
                                <tbody>
                                  {iteration[`cluster_${index + 1}`]?.map((dataPoint, i) => (
                                    <tr key={i}>
                                      {dataPoint.map((value, j) => (
                                        <td key={j}>{value}</td>
                                      ))}
                                    </tr>
                                  ))}
                                </tbody>
                              </Table>
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                  ))}
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