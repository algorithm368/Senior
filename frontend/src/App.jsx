import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import LoginForm from './components/LoginForm';


function App() {
  const [count, setCount] = useState(0)
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
    axios.get('senior-project-production-336b.up.railway.app/data')
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
    axios.post('senior-project-production-336b.up.railway.app/data', form)
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
      <LoginForm/>
    </div>
  );
}

export default App;
