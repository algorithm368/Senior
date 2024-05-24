// InsertModal.js
import React, { useState } from 'react';

function InsertModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    student_id: '',
    first_name: '',
    last_name: '',
    math_score: '',
    science_score: '',
    english_score: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={onClose}>&times;</span>
            <h2>Insert Data</h2>
            <form onSubmit={handleSubmit}>
              {/* Form fields */}
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default InsertModal;
