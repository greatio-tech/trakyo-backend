import request from 'supertest';
import app from '../src/app';
import QRCode from '../src/models/qrCodeModel';
import mongoose from 'mongoose';

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI!, { useNewUrlParser: true, useUnifiedTopology: true }as any);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('QR Code Endpoints', () => {
  let qrCodeId: string;

  it('should create a QR code', async () => {
    const res = await request(app)
      .post('/api/qrcodes')
      .send({ code: 'QR12345', owner: 'ownerId' });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('code', 'QR12345');
    qrCodeId = res.body._id;
  });

  it('should get QR code details', async () => {
    const res = await request(app)
      .get(`/api/qrcodes/${qrCodeId}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id', qrCodeId);
  });

  it('should upload an image', async () => {
    const res = await request(app)
      .post('/api/qrcodes/upload')
      .attach('image', 'tests/test_image.jpg');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('imageUrl');
  });
});
