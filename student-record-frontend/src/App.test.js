import React from 'react';
import { render, screen } from '@testing-library/react';
import StudentList from './components/StudentList';

test('renders Student List heading', () => {
  render(<StudentList />);
  // match the actual heading text
  const heading = screen.getByText(/All Students/i);
  expect(heading).toBeInTheDocument();
});
