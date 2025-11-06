import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { get, del } from '../api';

function StudentList() {
  const [students, setStudents] = useState([]);

  const loadStudents = async () => {
    try {
      const data = await get('/students');
      setStudents(data);
    } catch (err) {
      console.error('Fetch error:', err);
      alert('Failed to load students');
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this student?')) return;
    await del(`/students/${id}`);
    loadStudents();
  };

  return (
    <div>
      <h2>All Students</h2>
      <ul>
        {students.map((s) => (
          <li key={s._id}>
            {s.name} ({s.rollNo}) - {s.branch}{' '}
            <Link to={`/view/${s._id}`}>View</Link> |{' '}
            <Link to={`/edit/${s._id}`}>Edit</Link> |{' '}
            <button onClick={() => handleDelete(s._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StudentList;
