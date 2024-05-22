import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    id: '',
    first_name: '',
    last_name: '',
    math_score: '',
    science_score: '',
    english_score: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get('senior-production-43fc.up.railway.app/data')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('senior-production-43fc.up.railway.app/data', form)
      .then(response => {
        console.log(response.data);
        fetchData(); // Refresh data after insert
        setForm({
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
    <div className="App">
      <h1>Data from RDS Database</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="id" value={form.id} onChange={handleChange} placeholder="ID" required />
        <input type="text" name="first_name" value={form.first_name} onChange={handleChange} placeholder="First Name" required />
        <input type="text" name="last_name" value={form.last_name} onChange={handleChange} placeholder="Last Name" required />
        <input type="number" name="math_score" value={form.math_score} onChange={handleChange} placeholder="Math Score" required />
        <input type="number" name="science_score" value={form.science_score} onChange={handleChange} placeholder="Science Score" required />
        <input type="number" name="english_score" value={form.english_score} onChange={handleChange} placeholder="English Score" required />
        <button type="submit">Add Record</button>
      </form>
      <table>
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
  );
}

export default App;
