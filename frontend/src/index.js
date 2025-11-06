import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import AddStudentForm from './components/AddStudentForm';
import EditStudentForm from './components/EditStudentForm';
import ViewStudent from './components/ViewStudent';

const root = createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/add" element={<AddStudentForm />} />
      <Route path="/edit/:id" element={<EditStudentForm />} />
      <Route path="/view/:id" element={<ViewStudent />} />
    </Routes>
  </BrowserRouter>
);
