import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function StudentList() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/students')
      .then(res => res.json())
      .then(setStudents);
  }, []);

  return (
    <div>
      <h2>All Students</h2>
      <ul>
        {students.map(student => (
          <li key={student._id}>
            {student.name} ({student.rollNo}) - {student.branch} {' '}
            <Link to={`/view/${student._id}`}>View</Link> |{' '}
            <Link to={`/edit/${student._id}`}>Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StudentList;
