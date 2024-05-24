import React, { useState } from 'react';

function InsertModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    id: '',
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://senior-project-production-336b.up.railway.app/create/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        throw new Error('Failed to submit data');
      }
      const data = [await response.json()];
      console.log('Data submitted successfully:', data);
      onSubmit();
      onClose();
    } catch (error) {
      console.error('Error submitting data:', error.message);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={onClose}>&times;</span>
            <h2>Insert Data</h2>
            <form onSubmit={handleSubmit}>
              <label>
                ID:
                <input type="text" name="id" value={formData.id} onChange={handleChange} />
              </label>
              <label>
                First Name:
                <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} />
              </label>
              <label>
                Last Name:
                <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} />
              </label>
              <label>
                Math Score:
                <input type="text" name="math_score" value={formData.math_score} onChange={handleChange} />
              </label>
              <label>
                Science Score:
                <input type="text" name="science_score" value={formData.science_score} onChange={handleChange} />
              </label>
              <label>
                English Score:
                <input type="text" name="english_score" value={formData.english_score} onChange={handleChange} />
              </label>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default InsertModal;
