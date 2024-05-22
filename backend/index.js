var express = require('express')
var cors = require('cors')
const mysql = require('mysql2');
const port = process.env.PORT || 5000

const connection = mysql.createConnection({
  host: 'seniorproject.c3ssu4aw8v1d.ap-southeast-2.rds.amazonaws.com',
  user: 'root',
  database: 'project',
  password: '12345678',
  port: 3306, // Default MySQL port
  connectionLimit: 10 // Adjust as needed
});

var app = express()
app.use(cors())
app.use(express.json())

connection.connect(err => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to database.');
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get('/data', (req, res) => {
  connection.query('SELECT * FROM scorestudent', (err, results) => {
    if (err) {
      console.error("Error reading data: " + err.stack);
      return res.status(400).json({
        messsage: "Error fetching users"
      });
    } else {
      return res.status(200).json(results)
    }
  });
});

app.post('/data', (req, res) => {
  const {
    id,
    first_name,
    last_name,
    math_score,
    science_score,
    english_score
  } = req.body;
  const query = 'INSERT INTO scorestudent (id, first_name, last_name, math_score, science_score, english_score) VALUES (?, ?, ?, ?, ?, ?)';
  connection.query(query, [id, first_name, last_name, math_score, science_score, english_score], (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send('Data inserted successfully');
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});