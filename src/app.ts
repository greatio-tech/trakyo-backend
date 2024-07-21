import express from 'express';
import bodyParser from 'body-parser';
import YAML from 'yamljs';
import swaggerui from 'swagger-ui-express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import qrCodeRoutes from './routes/qrCodeRoutes';
import adminRoutes from './routes/adminRoutes';
import vehicleRoutes from './routes/vehicleRoutes';
import supportRoutes from './routes/supportRoutes';
import settingsRoutes from './routes/settingsRoutes';
import errorMiddleware from './middlewares/errorMiddleware';
import alertRoutes from './routes/alertRoutes';
import listingRoutes from './routes/listingRoutes';
import orderRoutes from './routes/orderRoutes';
import callRoutes from './routes/callRoutes';
import uploadRoutes from './routes/uploadRoutes';
import addressRoutes from './routes/addressRoutes';




dotenv.config();



const app = express();

//swagger
const swaggerDocument = YAML.load('./swagger.yaml')

app.use('/api-docs',swaggerui.serve,swaggerui.setup(swaggerDocument))


app.use(cors());
app.use(bodyParser.json());

connectDB();

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});




app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/qrcodes', qrCodeRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/support', supportRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/alert', alertRoutes);
app.use('/api/list', listingRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/calls', callRoutes);
app.use('/api/uploads', uploadRoutes);
app.use('/api/address', addressRoutes);

app.use(errorMiddleware);


const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
