import React from 'react';
import { Link } from 'react-router-dom';
import StudentList from './components/StudentList';

export default function App() {
  return (
    <div style={{ padding: 20 }}>
      <h1>🎓 Student Records</h1>
      <nav style={{ marginBottom: 20 }}>
        <Link to="/add">➕ Add New Student</Link>
      </nav>
      <StudentList />
    </div>
  );
}
