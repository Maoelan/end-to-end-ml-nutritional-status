import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardHeader, CardBody, Table } from "reactstrap";
import { checkAuthentication, getUsername } from '../../utils/auth';
import { Link } from 'react-router-dom';

import Sidebar from '../../Sidebar/Sidebar';
import Navbar from '../../Navbars/AuthNavbar.js';
import Header from '../../Headers/UserHeader.js';

const KMeans = ({ handleLogout }) => {
  const [kMeansData, setKMeansData] = useState(null);
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
              {kMeansData && (
                <>
                  <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                      <tr>
                        <th>Cluster</th>
                        <th>Data Points</th>
                      </tr>
                    </thead>
                    <tbody>
                      {kMeansData.iterations.map((iteration, index) => (
                        <tr key={index}>
                          <td>Cluster {index + 1}</td>
                          <td>
                            {iteration[`cluster_${index + 1}`].map((dataPoint, i) => (
                              <span key={i}>{dataPoint.join(', ')}<br /></span>
                            ))}
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
                        <td>{kMeansData.cluster_count}</td>
                        <td>{kMeansData.centroid_changes}</td>
                        <td>{kMeansData.total_iterations}</td>
                        <td>{kMeansData.cluster_labels.join(', ')}</td>
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