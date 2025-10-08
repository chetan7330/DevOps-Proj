class Student {
  constructor() {
    this.students = [];
    this.currentId = 1;
  }

  getAll() {
    return this.students;
  }

  getById(id) {
    return this.students.find(student => student.id === id);
  }

  create(studentData) {
    const newStudent = { id: this.currentId++, ...studentData };
    this.students.push(newStudent);
    return newStudent;
  }

  update(id, updateData) {
    const student = this.getById(id);
    if (!student) return null;
    Object.assign(student, updateData);
    return student;
  }

  delete(id) {
    const index = this.students.findIndex(s => s.id === id);
    if (index === -1) return false;
    this.students.splice(index, 1);
    return true;
  }
}

module.exports = new Student();
