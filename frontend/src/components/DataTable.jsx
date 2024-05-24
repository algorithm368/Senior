import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';

const DataTable = () => {
  const [data, setData] = useState([]);
  const [currentCell, setCurrentCell] = useState(null);

  useEffect(() => {
    fetchJSONData('https://senior-project-production-336b.up.railway.app/getdata').then((data) => {
      console.log(data);
      setData(data);
    });
  }, []);

  const fetchJSONData = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  const makeTableEditable = () => {
    const table = document.getElementById('data-table');
    for (let row of table.rows) {
      for (let cell of row.cells) {
        cell.setAttribute('contenteditable', true);
      }
    }
  };

  useEffect(() => {
    makeTableEditable();
    if (data.length > 0) {
      setCurrentCell(document.getElementById('data-table').rows[1].cells[0]);
    }
  }, [data]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case 'ArrowLeft':
          moveLeft();
          break;
        case 'ArrowRight':
          moveRight();
          break;
        case 'ArrowUp':
          moveUp();
          break;
        case 'ArrowDown':
          moveDown();
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentCell]);

  const moveLeft = () => {
    const prevCell = currentCell?.previousElementSibling;
    if (prevCell) {
      prevCell.focus();
      setCurrentCell(prevCell);
    }
  };

  const moveRight = () => {
    const nextCell = currentCell?.nextElementSibling;
    if (nextCell) {
      nextCell.focus();
      setCurrentCell(nextCell);
    }
  };

  const moveUp = () => {
    const previousRow = currentCell?.parentElement.previousElementSibling;
    if (previousRow) {
      const cellAbove = previousRow.cells[currentCell.cellIndex];
      if (cellAbove) {
        cellAbove.focus();
        setCurrentCell(cellAbove);
      }
    }
  };

  const moveDown = () => {
    const nextRow = currentCell?.parentElement.nextElementSibling;
    if (nextRow) {
      const cellUnder = nextRow.cells[currentCell.cellIndex];
      if (cellUnder) {
        cellUnder.focus();
        setCurrentCell(cellUnder);
      }
    }
  };

  return (
    <div id="tableContainer">
      <Table striped bordered hover id="data-table">
        <thead>
          <tr>
            {data.length > 0 &&
              Object.keys(data[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              {Object.values(item).map((val, i) => (
                <td key={i}>{val}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default DataTable;
