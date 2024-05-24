var express = require('express')
var cors = require('cors')
const mysql = require('mysql2');
const port = 3000;

var app = express()
app.use(cors())
app.use(express.json())


const connector = mysql.createConnection({
  host: 'seniorproject.c3ssu4aw8v1d.ap-southeast-2.rds.amazonaws.com',
  user: 'root',
  database: 'project',
  password: '12345678',
  port: 3306, 
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
  
});

connector.connect(err => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to database as id ' + connector.threadId);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/readData", async (req, res) => {
  try {
    connector.query("SELECT * FROM project.scorestudent", (err, result, fields) => {
      if (err) {
        console.error("Error reading data: " + err.stack);
        return res.status(400).json({
          message: "Error fetching users"
        });
      }
      console.log("Data received from MySQL:");
      console.log(result);
      return res.status(200).json(result);
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal Server Error"
    });
  }
});

app.get("/data", (req, res) => {
  const sql = "SELECT * FROM project.scorestudent";

  connecter.query(sql, (error, results, fields) => {
    if (error) {
      console.error("Error fetching data:", error);
      res.status(500).json({
        error: "Error fetching data"
      });
      return;
    }
    res.json(results);
  });
});

app.put("/update/:id", async (req, res) => {
  const studentId = req.params.id;
  const {
    first_name,
    last_name,
    math_score,
    science_score,
    english_score
  } =
  req.body;

  if (
    !first_name ||
    !last_name ||
    !math_score ||
    !science_score ||
    !english_score
  ) {
    return res.status(400).json({
      message: "All fields are required"
    });
  }

  try {
    await new Promise((resolve, reject) => {
      connector.update(
        "project.scoreStudent", {
          first_name: first_name,
          last_name: last_name,
          math_score: math_score,
          science_score: science_score,
          english_score: english_score,
        },
        `student_id=${studentId}`,
        (err, result) => {
          if (err) {
            console.error("Error updating data:", err);
            reject(err);
          } else {
            console.log("Updated data. Affected rows:", result.affectedRows);
            resolve();
          }
        }
      );
    });

    return res.status(200).json({
      message: "Student updated successfully"
    });
  } catch (err) {
    console.error("Error updating student:", err);
    return res.status(500).json({
      message: "Internal Server Error"
    });
  }
});

app.delete("/delete/:id", async (req, res) => {
  const studentId = req.params.id;

  try {
    connector.delete(
      "project.scorestudent",
      `student_id=${studentId}`,
      (err, result) => {
        if (err) {
          console.error("Error deleting data: " + err.stack);
          return res.status(400).json({
            message: "Error deleting student"
          });
        }
        console.log("Deleted data. Affected rows:", result.affectedRows);
        return res
          .status(200)
          .json({
            message: "Student deleted successfully"
          });
      }
    );
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal Server Error"
    });
  }
});

app.get("/search/:id", async (req, res) => {
  const studentId = req.params.id;

  try {
    connector.searchById("project.scorestudent", studentId, (err, result) => {
      if (err) {
        console.error("Error searching data: " + err.stack);
        return res.status(400).json({
          message: "Error searching student"
        });
      }
      console.log("Search result:", result);
      return res.status(200).json(result);
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal Server Error"
    });
  }
});

app.post("/create", async (req, res) => {
  const students = req.body;

  if (!Array.isArray(students) || students.length === 0) {
    return res.status(400).json({
      message: "No student data provided"
    });
  }

  try {
    for (const student of students) {
      const {
        student_id,
        first_name,
        last_name,
        math_score,
        science_score,
        english_score,
      } = student;

      if (
        !student_id ||
        !first_name ||
        !last_name ||
        !math_score ||
        !science_score ||
        !english_score
      ) {
        console.error("Missing data for student:", student);
        continue;
      }

      await new Promise((resolve, reject) => {
        connector.insert(
          "scoreStudent", {
            student_id: student_id,
            first_name: first_name,
            last_name: last_name,
            math_score: math_score,
            science_score: science_score,
            english_score: english_score,
          },
          (err, result) => {
            if (err) {
              console.error("Error inserting data:", err);
              reject(err);
            } else {
              console.log(
                "Inserted new data. Affected rows:",
                result.affectedRows
              );
              resolve();
            }
          }
        );
      });
    }

    return res.status(201).json({
      message: "Students successfully created!"
    });
  } catch (err) {
    console.error("Error creating students:", err);
    return res.status(500).json({
      message: "Internal Server Error"
    });
  }
});

app.post("/insertData", async (req, res) => {
  const student = req.body;
  if (!student) {
    return res.status(400).json({
      message: "No student data provided"
    });
  }

  try {
    const {
      student_id,
      first_name,
      last_name,
      math_score,
      science_score,
      english_score,
    } = student;

    if (
      !student_id ||
      !first_name ||
      !last_name ||
      !math_score ||
      !science_score ||
      !english_score
    ) {
      console.error("Missing data for student:", student);
      return res
        .status(400)
        .json({
          message: "Incomplete student data provided"
        });
    }

    await new Promise((resolve, reject) => {
      connector.insert(
        "project.scoreStudent", {
          student_id: student_id,
          first_name: first_name,
          last_name: last_name,
          math_score: math_score,
          science_score: science_score,
          english_score: english_score,
        },
        (err, result) => {
          if (err) {
            console.error("Error inserting data:", err);
            reject(err);
          } else {
            console.log(
              "Inserted new data. Affected rows:",
              result.affectedRows
            );
            resolve();
          }
        }
      );
    });

    return res.status(201).json({
      message: "Student successfully created!"
    });
  } catch (err) {
    console.error("Error creating student:", err);
    return res.status(500).json({
      message: "Internal Server Error"
    });
  }
});

app.get('/queryData', (req, res) => {
  const scoreType = req.query.scoreType;
  const scoreValue = req.query.scoreValue;

  if (!scoreType || !scoreValue) {
    return res.status(400).json({
      message: "Score type and score value are required"
    });
  }

  const validScoreTypes = ['math_score', 'science_score', 'english_score'];
  if (!validScoreTypes.includes(scoreType)) {
    return res.status(400).json({
      message: "Invalid score type"
    });
  }

  const query = `SELECT * FROM project.scorestudent WHERE ${scoreType} = ?`;
  connector.query(query, [scoreValue], (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      return res.status(500).json({
        message: 'Internal Server Error',
        error: error.message // Include the error message in the response
      });
    }
    if (results.length > 0) {
      res.json(results);
    } else {
      res.status(404).json({
        message: 'No students found'
      });
    }
  });
});

app.post('/insert_user', (req, res) => {
  const userData = req.body;
  const values = [
    userData.oauth_provider,
    userData.oauth_uid,
    userData.first_name,
    userData.last_name,
    userData.email,
    userData.picture
  ];

  connector.insert('users', values, (error, results) => {
    if (error) {
      res.status(500).json({
        message: 'An error occurred while saving data in the database.'
      });
    } else {
      res.status(200).json({
        message: 'successfully created!'
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running at senior-production-43fc.up.railway.app`);
});