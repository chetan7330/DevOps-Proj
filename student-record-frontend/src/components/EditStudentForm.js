import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

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
    stipend: ''
  });

  useEffect(() => {
    fetch(`/students/${id}`)        // Changed to relative URL
      .then(res => res.json())
      .then(data => setForm(data));
  }, [id]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    fetch(`/students/${id}`, {       // Changed to relative URL
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    }).then(() => navigate('/'));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={form.name} onChange={handleChange} required />
      <input name="rollNo" value={form.rollNo} onChange={handleChange} required />
      <input name="branch" value={form.branch} onChange={handleChange} />
      <input name="company" value={form.company} onChange={handleChange} />
      <input name="Date_of_Joining" value={form.Date_of_Joining} onChange={handleChange} />
      <input name="duration" value={form.duration} onChange={handleChange} />
      <input name="stipend" value={form.stipend} onChange={handleChange} />
      <button type="submit">Update</button>
    </form>
  );
}

export default EditStudentForm;
