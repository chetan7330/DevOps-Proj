import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { post } from '../api';

function AddStudentForm() {
  const [form, setForm] = useState({
    name: '',
    rollNo: '',
    branch: '',
    company: '',
    Date_of_Joining: '',
    duration: '',
    stipend: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await post('/students', form);
      alert('Student added successfully!');
      navigate('/');
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Add New Student</h2>
      <form onSubmit={handleSubmit}>
        {Object.entries(form).map(([key, value]) => (
          <input
            key={key}
            name={key}
            placeholder={key}
            value={value}
            onChange={handleChange}
            required={key === 'name' || key === 'rollNo'}
          />
        ))}
        <br />
        <button type="submit">Add Student</button>
      </form>
      <br />
      <Link to="/">← Back to Student List</Link>
    </div>
  );
}

export default AddStudentForm;
