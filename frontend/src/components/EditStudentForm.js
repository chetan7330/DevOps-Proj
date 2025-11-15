import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { get, put } from '../api';

function EditStudentForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    rollNo: '',
    branch: '',
    company: '',
    Date_of_Joining: '',
    duration: '',
    stipend: '',
    mentor: '',
    contact: '',
    email: '',
  });

  useEffect(() => {
    get(`/students/${id}`)
      .then(setForm)
      .catch(() => alert('Failed to fetch student'));
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await put(`/students/${id}`, form);
    alert('Student updated successfully!');
    navigate('/');
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Edit Student</h2>
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
        <button type="submit">Update</button>
      </form>
      <br />
      <Link to="/">← Back</Link>
    </div>
  );
}

export default EditStudentForm;
