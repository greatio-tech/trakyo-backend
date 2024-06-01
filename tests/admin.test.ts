import request from 'supertest';
import app from '../src/app';
import Admin from '../src/models/adminModel';
import mongoose from 'mongoose';

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI!, { useNewUrlParser: true, useUnifiedTopology: true }as any);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Admin Endpoints', () => {
  let adminToken: string;

  it('should register an admin', async () => {
    const res = await request(app)
      .post('/api/admin/register')
      .send({ email: 'admin@example.com', password: 'password' });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('email', 'admin@example.com');
  });

  it('should login an admin', async () => {
    const res = await request(app)
      .post('/api/admin/login')
      .send({ email: 'admin@example.com', password: 'password' });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
    adminToken = res.body.token;
  });

  it('should generate QR codes', async () => {
    const res = await request(app)
      .post('/api/admin/generate-codes')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ count: 5, owner: 'ownerId' });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(5);
  });

  it('should get users', async () => {
    const res = await request(app)
      .get('/api/admin/users')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});
