const request = require('supertest');
const app = require('../app');

describe('Student API', () => {
  let studentId;

  it('Create new student', async () => {
    const res = await request(app)
      .post('/students')
      .send({ name: 'Alice', rollNo: '101', branch: 'CSE', company: 'ABC Corp', duration: '6 months', stipend: '1000' });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    studentId = res.body.id;
  });

  it('Get all students', async () => {
    const res = await request(app).get('/students');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('Get student by id', async () => {
    const res = await request(app).get(`/students/${studentId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id', studentId);
  });

  it('Update student', async () => {
    const res = await request(app)
      .put(`/students/${studentId}`)
      .send({ stipend: '1500' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('stipend', '1500');
  });

  it('Delete student', async () => {
    const res = await request(app).delete(`/students/${studentId}`);
    expect(res.statusCode).toEqual(204);
  });
});
