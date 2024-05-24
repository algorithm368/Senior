import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function QueryModal({ show, onHide }) {
  const handleSearch = () => {
    // Search logic here
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Query Student Scores</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Select Score Type</Form.Label>
            <Form.Control as="select">
              <option value="math_score">Math Score</option>
              <option value="science_score">Science Score</option>
              <option value="english_score">English Score</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Score Value</Form.Label>
            <Form.Control type="number" placeholder="Enter score value" />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => window.location.reload()}>Clear</Button>
        <Button variant="secondary" onClick={onHide}>Close</Button>
        <Button variant="primary" onClick={handleSearch}>Search</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default QueryModal;
