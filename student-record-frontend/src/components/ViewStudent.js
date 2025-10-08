import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function ViewStudent() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    fetch(`/students/${id}`)         // Changed to relative URL
      .then(res => res.json())
      .then(setStudent);
  }, [id]);

  if (!student) return <div>Loading...</div>;

  return (
    <div>
      <h3>{student.name}</h3>
      <p>Roll No: {student.rollNo}</p>
      <p>Branch: {student.branch}</p>
      <p>Company: {student.company}</p>
      <p>Duration: {student.duration}</p>
      <p>Stipend: {student.stipend}</p>
      <Link to="/">Back to List</Link>
    </div>
  );
}

export default ViewStudent;
