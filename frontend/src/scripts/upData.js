let currentCell;

document.getElementById("upload-button").addEventListener("click", function () {
  document.getElementById("file-input").click();
});

document.getElementById("file-input").addEventListener("change", handleFile);

function handleFile(event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function (event) {
    const data = new Uint8Array(event.target.result);
    const workbook = XLSX.read(data, { type: "array" });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const tableData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    const tableContainer = document.getElementById("table-container");
    const table = generateTable(tableData);
    tableContainer.innerHTML = ""; // Clear previous table if any
    tableContainer.appendChild(table);
    makeTableEditable(table);
    currentCell = table.rows[1].cells[0]; // Initial current cell
    currentCell.focus();
  };

  reader.readAsArrayBuffer(file);
}

function generateTable(data) {
  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const tbody = document.createElement("tbody");

  const headerRow = document.createElement("tr");
  data[0].forEach((cellData) => {
    const th = document.createElement("th");
    th.textContent = cellData;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  for (let i = 1; i < data.length; i++) {
    const rowData = data[i];
    const row = document.createElement("tr");
    rowData.forEach((cellData) => {
      const td = document.createElement("td");
      td.textContent = cellData;
      row.appendChild(td);
    });
    tbody.appendChild(row);
  }
  table.appendChild(tbody);

  table.addEventListener("click", function (event) {
    if (event.target.tagName === "TD") {
      currentCell = event.target;
    }
  });

  return table;
}

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
  const rowIndex = currentCell.parentElement.rowIndex;
  if (rowIndex > 0) {
    const cellAbove =
      currentCell.parentElement.previousElementSibling.cells[
        currentCell.cellIndex
      ];
    cellAbove.focus();
    currentCell = cellAbove;
  }
}

function moveDown() {
  const rowIndex = currentCell.parentElement.rowIndex;
  const rowCount = currentCell.parentElement.parentElement.rows.length;
  if (rowIndex < rowCount) {
    const cellBelow =
      currentCell.parentElement.nextElementSibling.cells[currentCell.cellIndex];
    cellBelow.focus();
    currentCell = cellBelow;
  }
}

document
  .getElementById("download-button")
  .addEventListener("click", function () {
    const table = document.querySelector("table");
    const rows = Array.from(table.rows).map((row) =>
      Array.from(row.cells).map((cell) => cell.textContent)
    );
    const csvContent = rows.map((e) => e.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "table_data.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  });

function sendDataToApi(data) {
  fetch("http://localhost:3000/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Response from server:", data);
      const responseElement = document.getElementById("response-container");
      responseElement.textContent = JSON.stringify(data);
    })
    .catch((error) => {
      console.error("Error sending data to server:", error);
    });
}

document
  .getElementById("database-button")
  .addEventListener("click", function () {
    var table = document.querySelector("table");
    var data = [];
    var headers = [];

    // Get the table headers
    var headerRow = table.rows[0];
    for (var i = 0; i < headerRow.cells.length; i++) {
      var headerText = headerRow.cells[i].innerText
        .toLowerCase()
        .replace(/\s+/g, "_");
      headers.push(headerText);
    }

    // Iterate through rows and cells, skipping header row
    for (var i = 1; i < table.rows.length; i++) {
      var tableRow = table.rows[i];
      var rowData = {};

      for (var j = 0; j < tableRow.cells.length; j++) {
        rowData[headers[j]] = tableRow.cells[j].innerText;
      }

      data.push(rowData);
    }

    // Log data as JSON
    console.log(JSON.stringify(data));

    sendDataToApi(data);
  });
