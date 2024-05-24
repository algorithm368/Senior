import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function DeleteModal({ show, onHide }) {
  const handleDelete = () => {
    // Delete logic here
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Data</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Student ID</Form.Label>
            <Form.Control type="text" placeholder="Enter student ID" />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Close</Button>
        <Button variant="primary" onClick={handleDelete}>Delete</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteModal;
