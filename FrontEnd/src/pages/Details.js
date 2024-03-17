import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

const ThingSpeakFieldData = () => {
  const [fieldData, setFieldData] = useState([]);
  const navigate = useNavigate();

  const handleLogoutClick=()=>{
    navigate('/');
  }
  useEffect(() => {
    const fetchChannelInfo = async () => {
      const channelID = '2428732';
      const apiKey = 'BVYX4YRFVQCNEXS8';

      try {
        const response = await axios.get(`https://api.thingspeak.com/channels/${channelID}/feeds/last.json?api_key=${apiKey}`);
        const fields = [];

        for (let i = 1; i <= 8; i++) {
          const fieldValue = response.data[`field${i}`];
          const updatedAt = response.data.created_at;

          if (fieldValue !== undefined) {
            fields.push({ number: i, value: fieldValue, updated_at: updatedAt });
          }
        }

        setFieldData(fields);
      } catch (error) {
        console.error('Error fetching channel info:', error);
      }
    };

    fetchChannelInfo();
  }, []);

  return (
    <div className='Details'>
      <center>
        <h1>ThingSpeak Field Data</h1>
      </center>
      <div></div>
      <div className='DetailsTable'>
        <table>
          <thead>
            <tr>
              <th>Field Number</th>
              <th>Last Updated Time</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {fieldData.map(field => (
              <tr key={field.number}>
                <td>Field {field.number}</td>
                <td>{field.updated_at ? new Date(field.updated_at).toLocaleString() : 'N/A'}</td>
                <td>{field.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div >
        <button className="toggle-button" onClick={handleLogoutClick}>
          Logout
        </button>
      </div>
      </div>
    </div>
  );
};

export default ThingSpeakFieldData;
