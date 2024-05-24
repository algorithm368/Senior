import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function UpdateModal({ show, onHide }) {
  const handleUpdate = () => {
    // Update logic here
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Update Student Data</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Search Student ID</Form.Label>
            <Form.Control type="text" placeholder="Enter student ID" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Student ID</Form.Label>
            <Form.Control type="text" placeholder="Enter student ID" />
          </Form.Group>
          <Form.Group>
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" placeholder="Enter first name" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" placeholder="Enter last name" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Math Score</Form.Label>
            <Form.Control type="number" placeholder="Enter math score" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Science Score</Form.Label>
            <Form.Control type="number" placeholder="Enter science score" />
          </Form.Group>
          <Form.Group>
            <Form.Label>English Score</Form.Label>
            <Form.Control type="number" placeholder="Enter english score" />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Close</Button>
        <Button variant="primary" onClick={handleUpdate}>Update</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UpdateModal;
