import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function InsertModal({ show, onHide }) {
  // State for each form field
  const [studentId, setStudentId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mathScore, setMathScore] = useState('');
  const [scienceScore, setScienceScore] = useState('');
  const [englishScore, setEnglishScore] = useState('');

  const handleInsert = () => {
    // Log the form data
    console.log({
      studentId,
      firstName,
      lastName,
      mathScore,
      scienceScore,
      englishScore
    });
    // Close the modal
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Insert Data</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Student ID</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter student ID" 
              value={studentId} 
              onChange={(e) => setStudentId(e.target.value)} 
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>First Name</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter first name" 
              value={firstName} 
              onChange={(e) => setFirstName(e.target.value)} 
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Last Name</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter last name" 
              value={lastName} 
              onChange={(e) => setLastName(e.target.value)} 
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Math Score</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter math score" 
              value={mathScore} 
              onChange={(e) => setMathScore(e.target.value)} 
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Science Score</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter science score" 
              value={scienceScore} 
              onChange={(e) => setScienceScore(e.target.value)} 
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>English Score</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter english score" 
              value={englishScore} 
              onChange={(e) => setEnglishScore(e.target.value)} 
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Close</Button>
        <Button variant="primary" onClick={handleInsert}>Insert</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default InsertModal;
