import request from 'supertest';
import app from '../src/app';
import { describe, it } from 'node:test';

describe('Auth Endpoints', () => {
  it('should send OTP', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ phoneNumber: '1234567890' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should verify OTP', async () => {
    // Mock OTP verification and token generation
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({ phoneNumber: '1234567890' });
    const { token } = loginRes.body;

    const verifyRes = await request(app)
      .post('/api/auth/verify')
      .send({ phoneNumber: '1234567890', otp: '123456', token });
    expect(verifyRes.statusCode).toEqual(200);
    expect(verifyRes.body).toHaveProperty('user');
    expect(verifyRes.body).toHaveProperty('token');
  });
});
