import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function StudentList() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch('/students')     // Changed to relative URL
      .then(res => res.json())
      .then(setStudents);
  }, []);

  return (
    <div>
      <h2>All Students</h2>
      <ul>
        {students.map(student => (
          <li key={student.id}>
            {student.name} ({student.rollNo}) - {student.branch} {' '}
            <Link to={`/view/${student.id}`}>View</Link> |{' '}
            <Link to={`/edit/${student.id}`}>Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StudentList;
