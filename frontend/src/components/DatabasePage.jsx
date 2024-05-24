import React, { useState, useEffect } from "react";
import axios from "axios";
import "./DatabasePage.css";
import InsertModal from 'InsertModal';
import { use } from "../../../backend";

function DatabasePage() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    id: "",
    first_name: "",
    last_name: "",
    math_score: "",
    science_score: "",
    english_score: "",
  });
  const [showInsert, setShowInsert] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("https://senior-project-production-336b.up.railway.app/getData")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "https://senior-project-production-336b.up.railway.app/getData",
        form
      )
      .then((response) => {
        console.log(response.data);
        fetchData(); // Refresh data after insert
        setForm({
          id: "",
          first_name: "",
          last_name: "",
          math_score: "",
          science_score: "",
          english_score: "",
        });
      })
      .catch((error) => {
        console.error("Error inserting data:", error);
      });
  };

  return (
    <div>
      <h2>Welcome to Database</h2>
      <div>
      <Button variant="secondary" onClick={() => setShowInsert(true)}>
           Insert
        </Button>{' '}
        <button type="button">Query</button>
        <button type="button">Update</button>
        <button type="button">Delete</button>
        <button type="button" onClick={fetchData}>
          Show Data
        </button>
        <button type="button" onClick={() => setData([])}>
          Clear
        </button>
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
    </div>
  );
}

export default DatabasePage;
