import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function AddStudentForm() {
  const [form, setForm] = useState({
    name: '',
    rollNo: '',
    branch: '',
    Date_of_Joining: '',
    company: '',
    duration: '',
    stipend: ''
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    fetch('/students', {     // Changed to relative URL, proxy will forward it
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
      .then(res => res.json())
      .then(data => {
        alert(data.error || 'Student added!');
        setForm({
          name: '',
          rollNo: '',
          branch: '',
          company: '',
          Date_of_Joining: '',
          duration: '',
          stipend: ''
        });
      });
  };

  return (
    <div>
      <h2>Add New Student</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="rollNo" placeholder="Roll Number" value={form.rollNo} onChange={handleChange} required />
        <input name="branch" placeholder="Branch" value={form.branch} onChange={handleChange} />
        <input name="company" placeholder="Company" value={form.company} onChange={handleChange} />
        <input name="Date_of_Joining" placeholder="Date of Joining" value={form.Date_of_Joining} onChange={handleChange} />
        <input name="duration" placeholder="Duration" value={form.duration} onChange={handleChange} />
        <input name="stipend" placeholder="Stipend" value={form.stipend} onChange={handleChange} />
        <button type="submit">Add Student</button>
      </form>
      <Link to="/">← Back to Student List</Link>
    </div>
  );
}

export default AddStudentForm;
