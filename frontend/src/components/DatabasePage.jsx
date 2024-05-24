import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DatabasePage.css';

function DatabasePage() {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    first_name: '',
    last_name: '',
    math_score: '',
    science_score: '',
    english_score: ''
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get('https://senior-project-production-336b.up.railway.app/getData')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    axios.post('https://senior-project-production-336b.up.railway.app/insertData', formData)
      .then(response => {
        console.log(response.data);
        fetchData(); // Refresh data after insert
        setIsModalOpen(false); // Close modal after submit
        setFormData({
          id: '',
          first_name: '',
          last_name: '',
          math_score: '',
          science_score: '',
          english_score: ''
        });
      })
      .catch(error => {
        console.error('Error inserting data:', error);
      });
  };

  return (
    <div>
      <h2>Welcome to Database</h2>
      <div className="button-group">
        <button type="button" onClick={() => setIsModalOpen(true)}>Insert</button>
        <button type="button">Query</button>
        <button type="button">Update</button>
        <button type="button">Delete</button>
        <button type="button" onClick={fetchData}>Show Data</button>
        <button type="button" onClick={() => setData([])}>Clear</button>
      </div>
      <br />
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Math Score</th>
              <th>Science Score</th>
              <th>English Score</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.first_name}</td>
                <td>{item.last_name}</td>
                <td>{item.math_score}</td>
                <td>{item.science_score}</td>
                <td>{item.english_score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setIsModalOpen(false)}>&times;</span>
            <h2>Insert Data</h2>
            <form onSubmit={handleSubmit}>
              <label>
                ID:
                <input type="text" name="id" value={formData.id} onChange={handleChange} />
              </label>
              <label>
                First Name:
                <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} />
              </label>
              <label>
                Last Name:
                <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} />
              </label>
              <label>
                Math Score:
                <input type="text" name="math_score" value={formData.math_score} onChange={handleChange} />
              </label>
              <label>
                Science Score:
                <input type="text" name="science_score" value={formData.science_score} onChange={handleChange} />
              </label>
              <label>
                English Score:
                <input type="text" name="english_score" value={formData.english_score} onChange={handleChange} />
              </label>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default DatabasePage;
