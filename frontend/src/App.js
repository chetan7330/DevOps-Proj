import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import StudentList from './components/StudentList';
import AddStudentForm from './components/AddStudentForm';
import ViewStudent from './components/ViewStudent';
import EditStudentForm from './components/EditStudentForm';

function App() {
  return (
    <Router>
      <div>
        <nav style={styles.navbar}>
          <Link to="/" style={styles.link}>Student List</Link>
          <Link to="/add" style={styles.link}>Add Student</Link>
        </nav>

        <div style={styles.container}>
          <Routes>
            <Route path="/" element={<StudentList />} />
            <Route path="/add" element={<AddStudentForm />} />
            <Route path="/view/:id" element={<ViewStudent />} />
            <Route path="/edit/:id" element={<EditStudentForm />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

const styles = {
  navbar: {
    padding: '1rem',
    backgroundColor: '#333',
    display: 'flex',
    gap: '1rem'
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontWeight: 'bold'
  },
  container: {
    maxWidth: 800,
    margin: '2rem auto',
    fontFamily: 'Arial, sans-serif'
  }
};

export default App;
