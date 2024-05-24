let currentCell;
let startCell;

// URL of the JSON file
const jsonURL = "https://senior-project-production-336b.up.railway.app/readData";
// Function to fetch JSON data
function fetchJSONData(url) {
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

// Function to create table from JSON data
function createTableFromJSON(data) {
  // Get the container element
  const tableContainer = document.getElementById("tableContainer");

  // Create table element
  const table = document.createElement("table");
  table.classList.add("table", "table-striped", "table-bordered");

  // Create table header row
  const headerRow = table.insertRow();
  for (let key in data[0]) {
    const headerCell = document.createElement("th");
    headerCell.textContent = key;
    headerRow.appendChild(headerCell);
  }

  // Create table rows with data
  data.forEach((item) => {
    const row = table.insertRow();
    for (let key in item) {
      const cell = row.insertCell();
      cell.textContent = item[key];
    }
  });

  // Append the table to the container
  tableContainer.appendChild(table);

  makeTableEditable(table);
  currentCell = table.rows[1].cells[0];
  currentCell.focus();

  table.addEventListener("click", function (event) {
    currentCell = event.target;
  });
}

// Function to make table editable
function makeTableEditable(table) {
  for (let row of table.rows) {
    for (let cell of row.cells) {
      cell.setAttribute("contenteditable", true);
    }
  }
}

document.addEventListener("keydown", function (event) {
  switch (event.key) {
    case "ArrowLeft":
      moveLeft();
      break;
    case "ArrowRight":
      moveRight();
      break;
    case "ArrowUp":
      moveUp();
      break;
    case "ArrowDown":
      moveDown();
      break;
  }
});

function moveLeft() {
  const prevCell = currentCell.previousElementSibling;
  if (prevCell) {
    prevCell.focus();
    currentCell = prevCell;
  }
}

function moveRight() {
  const nextCell = currentCell.nextElementSibling;
  if (nextCell) {
    nextCell.focus();
    currentCell = nextCell;
  }
}

function moveUp() {
  const previousRow = currentCell.parentElement.previousElementSibling;
  if (previousRow) {
    const cellAbove = previousRow.cells[currentCell.cellIndex];
    if (cellAbove) {
      cellAbove.focus();
      currentCell = cellAbove;
    }
  }
}

function moveDown() {
  const nextRow = currentCell.parentElement.nextElementSibling;
  if (nextRow) {
    const cellUnder = nextRow.cells[currentCell.cellIndex];
    if (cellUnder) {
      cellUnder.focus();
      currentCell = cellUnder;
    }
  }
}

// Fetch JSON data and create table
fetchJSONData(jsonURL).then((data) => {
  createTableFromJSON(data);
});

// Function to open insert modal
function openInsertModal() {
  $("#insertModal").modal("show");
}

// Function to submit insert form
function submitInsertForm() {

  var myId = document.getElementById("student_id").value;
  var myFirst = document.getElementById("first_name").value;
  var myLast = document.getElementById("last_name").value;
  var myMath = document.getElementById("math_score").value;
  var mySci = document.getElementById("science_score").value;
  var myEng = document.getElementById("english_score").value;

  var data = {
    student_id: myId,
    first_name: myFirst,
    last_name: myLast,
    math_score: myMath,
    science_score: mySci,
    english_score: myEng
  };
  var arr = [data]
  console.log(arr);
  fetch('https://senior-project-production-336b.up.railway.appห/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(arr)
    })
    .then(response => response.json())
    .then(arr => {
      console.log('Success:', arr);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  location.reload();
  $("#insertModal").modal("hide");
}

// Function to open query modal
function openQueryModal() {
  $("#queryModal").modal("show");
}

// Function to submit query form
function searchStudentScore() {
  var scoreType = document.getElementById("score_type").value;
  var scoreValue = document.getElementById("score_value").value;

  const queryURL = `https://senior-project-production-336b.up.railway.app/queryData?scoreType=${scoreType}&scoreValue=${scoreValue}`;

  fetch(queryURL)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      displayQueryResults(data);
      $("#queryModal").modal("hide");
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

function displayQueryResults(data) {
  // Get the container element where you want to display the table
  const container = document.getElementById("tableContainer");

  // Create a table element
  const table = document.createElement("table");
  table.classList.add("table", "table-striped", "table-bordered");

  // Create table header row
  const headerRow = table.insertRow();
  for (let key in data[0]) {
    const headerCell = document.createElement("th");
    headerCell.textContent = key;
    headerRow.appendChild(headerCell);
  }

  // Create table rows with data
  data.forEach((item) => {
    const row = table.insertRow();
    for (let key in item) {
      const cell = row.insertCell();
      cell.textContent = item[key];
    }
  });

  // Append the table to the container
  container.innerHTML = ""; // Clear previous content
  container.appendChild(table);
}

// Function to open update modal
function openUpdateModal() {
  $("#updateModal").modal("show");
}

function updateStudent(studentId, updatedData) {
  fetch(`https://senior-project-production-336b.up.railway.app/update/${studentId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to update student");
      }
      return response.json();
    })
    .then((data) => {
      alert("Student updated successfully");
      $("#updateModal").modal("hide");
    })
    .catch((error) => {
      console.error(error);
      alert("Failed to update student");
    });
}

function searchAndUpdateStudent() {
  var studentInput = document.getElementById("search_student_id");
  var studentId = studentInput.value;
  fetch(`https://senior-project-production-336b.up.railway.app/search/${studentId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Student not found");
      }
      return response.json();
    })
    .then((data) => {
      if (data.length > 0) {
        const student = data[0];
        console.log(student);
        document.getElementById("student_id_update_modal").value =
          student.student_id;
        document.getElementById("first_name_update_modal").value =
          student.first_name;
        document.getElementById("last_name_update_modal").value =
          student.last_name;
        document.getElementById("math_score_update_modal").value =
          student.math_score;
        document.getElementById("science_score_update_modal").value =
          student.science_score;
        document.getElementById("english_score_update_modal").value =
          student.english_score;
      } else {
        console.error("No student data found");
        alert("No student data found");
      }
    })
    .catch((error) => {
      console.error(error);
      alert("Student not found");
    });
}

// Function to submit update form
function submitUpdateForm() {
  var studentId = document.getElementById("student_id_update_modal").value;
  var updatedData = {
    student_id: studentId,
    first_name: document.getElementById("first_name_update_modal").value,
    last_name: document.getElementById("last_name_update_modal").value,
    math_score: document.getElementById("math_score_update_modal").value,
    science_score: document.getElementById("science_score_update_modal").value,
    english_score: document.getElementById("english_score_update_modal").value,
  };

  fetch(`https://senior-project-production-336b.up.railway.app/${studentId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to update student");
      }
      return response.json();
    })
    .then((data) => {
      alert("Student updated successfully");
      document.getElementById("updateModal").classList.remove("show");
      document.getElementById("updateModal").style.display = "none";
    })
    .catch((error) => {
      console.error(error);
    });
  location.reload();
}

// Function to open delete modal
function openDeleteModal() {
  $("#deleteModal").modal("show");
}

function submitDeleteForm() {
  var studentInput = document.getElementById("student_id_modal");
  var studentId = studentInput.value;
  fetch(`https://senior-project-production-336b.up.railway.app/delete/${studentId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error deleting student");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      $("#deleteModal").modal("hide");
    })
    .catch((error) => {
      console.error(error);
    });
  location.reload();
}
