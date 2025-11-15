import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { get } from '../api';

function ViewStudent() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    get(`/students/${id}`)
      .then(setStudent)
      .catch(() => alert('Failed to fetch student'));
  }, [id]);

  if (!student) return <div>Loading...</div>;

  return (
    <div style={{ padding: 20 }}>
      <h2>View Student</h2>
      <p><b>Name:</b> {student.name}</p>
      <p><b>Roll No:</b> {student.rollNo}</p>
      <p><b>Branch:</b> {student.branch}</p>
      <p><b>Company:</b> {student.company}</p>
      <p><b>Date of Joining:</b> {student.Date_of_Joining}</p>
      <p><b>Duration:</b> {student.duration}</p>
      <p><b>Stipend:</b> {student.stipend}</p>
      <p><b>Mentor:</b> {student.mentor}</p>
      <p><b>Contact:</b> {student.contact}</p>
      <p><b>Email:</b> {student.email}</p>

      <Link to={`/edit/${student._id}`}>✏️ Edit</Link> |{' '}
      <Link to="/">← Back</Link>
    </div>
  );
}

export default ViewStudent;
