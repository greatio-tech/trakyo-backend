import request from 'supertest';
import app from '../src/app';

describe('User Endpoints', () => {
  it('should create a new user', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ phoneNumber: '1234567890' });

    const { token } = res.body;
    const verifyRes = await request(app)
      .post('/api/auth/verify')
      .send({ phoneNumber: '1234567890', otp: '123456', token });

    const userToken = verifyRes.body.token;
    const userId = verifyRes.body.user._id;

    const updateRes = await request(app)
      .put(`/api/users/${userId}`)
      .set('Authorization', `Bearer ${userToken}`)
      .send({ name: 'John Doe', email: 'john@example.com' });

    expect(updateRes.statusCode).toEqual(200);
    expect(updateRes.body).toHaveProperty('name', 'John Doe');
    expect(updateRes.body).toHaveProperty('email', 'john@example.com');
  });

  it('should add an emergency contact', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ phoneNumber: '1234567890' });

    const { token } = res.body;
    const verifyRes = await request(app)
      .post('/api/auth/verify')
      .send({ phoneNumber: '1234567890', otp: '123456', token });

    const userToken = verifyRes.body.token;
    const userId = verifyRes.body.user._id;

    const contactRes = await request(app)
      .post(`/api/users/${userId}/contacts`)
      .set('Authorization', `Bearer ${userToken}`)
      .send({ name: 'Emergency Contact', phoneNumber: '0987654321' });

    expect(contactRes.statusCode).toEqual(200);
    expect(contactRes.body.emergencyContacts).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'Emergency Contact', phoneNumber: '0987654321' })
      ])
    );
  });
});



describe('QR Code Endpoints', () => {
  it('should create and retrieve a QR code', async () => {
    const ownerRes = await request(app)
      .post('/api/auth/login')
      .send({ phoneNumber: '1234567890' });

    const { token } = ownerRes.body;
    const verifyRes = await request(app)
      .post('/api/auth/verify')
      .send({ phoneNumber: '1234567890', otp: '123456', token });

    const userToken = verifyRes.body.token;
    const ownerId = verifyRes.body.user._id;

    const createRes = await request(app)
      .post('/api/qrcodes')
      .send({ code: 'QR1234567890', owner: ownerId });

    expect(createRes.statusCode).toEqual(200);
    expect(createRes.body).toHaveProperty('code', 'QR1234567890');
    expect(createRes.body).toHaveProperty('owner', ownerId);

    const getRes = await request(app).get('/api/qrcodes/QR1234567890');
    expect(getRes.statusCode).toEqual(200);
    expect(getRes.body).toHaveProperty('code', 'QR1234567890');
    expect(getRes.body).toHaveProperty('owner');
  });

  it('should upload an image', async () => {
    const uploadRes = await request(app)
      .post('/api/qrcodes/upload')
      .attach('image', 'tests/files/test-image.jpg');

    expect(uploadRes.statusCode).toEqual(200);
    expect(uploadRes.body).toHaveProperty('imageUrl');
  });
});
