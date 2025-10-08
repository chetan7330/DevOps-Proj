const StudentModel = require('../models/studentModel');

exports.getStudents = (req, res) => {
  res.json(StudentModel.getAll());
};

exports.getStudent = (req, res) => {
  const id = Number(req.params.id);
  const student = StudentModel.getById(id);
  if (!student) return res.status(404).json({ message: 'Student not found' });
  res.json(student);
};

exports.createStudent = (req, res) => {
  const newStudent = StudentModel.create(req.body);
  res.status(201).json(newStudent);
};

exports.updateStudent = (req, res) => {
  const id = Number(req.params.id);
  const updated = StudentModel.update(id, req.body);
  if (!updated) return res.status(404).json({ message: 'Student not found' });
  res.json(updated);
};

exports.deleteStudent = (req, res) => {
  const id = Number(req.params.id);
  const deleted = StudentModel.delete(id);
  if (!deleted) return res.status(404).json({ message: 'Student not found' });
  res.status(204).send();
};
