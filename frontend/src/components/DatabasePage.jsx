import React, { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import DataTable from './DataTable';
import InsertModal from './InsertModal';
import QueryModal from './QueryModal';
import UpdateModal from './UpdateModal';
import DeleteModal from './DeleteModal';

function App() {
  const [showInsert, setShowInsert] = useState(false);
  const [showQuery, setShowQuery] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  return (
    <Container>
      <h2>Welcome to Database</h2>
      <div className="mb-2">
        <Button variant="secondary" onClick={() => setShowInsert(true)}>
          <span className="glyphicon glyphicon-arrow-up"></span> Insert
        </Button>{' '}
        <Button variant="secondary" onClick={() => setShowQuery(true)}>
          <span className="glyphicon glyphicon-search"></span> Query
        </Button>{' '}
        <Button variant="secondary" onClick={() => setShowUpdate(true)}>
          <span className="glyphicon glyphicon-wrench"></span> Update
        </Button>{' '}
        <Button variant="secondary" onClick={() => setShowDelete(true)}>
          <span className="glyphicon glyphicon-trash"></span> Delete
        </Button>{' '}
        <Button variant="secondary" onClick={() => window.location.reload()}>
          <span className="glyphicon glyphicon-refresh"></span> Clear
        </Button>{' '}
      </div>
      <br />
      <div id="tableContainer">
      <DataTable />
      </div>

      <InsertModal show={showInsert} onHide={() => setShowInsert(false)} />
      <QueryModal show={showQuery} onHide={() => setShowQuery(false)} />
      <UpdateModal show={showUpdate} onHide={() => setShowUpdate(false)} />
      <DeleteModal show={showDelete} onHide={() => setShowDelete(false)} />
    </Container>
  );
}

export default App;
