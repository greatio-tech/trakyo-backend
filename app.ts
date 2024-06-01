import express from 'express';
import connectDB from './config/db';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import errorHandler from './middlewares/errorHandler';
import config from './config/config';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Define Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

// Error Middleware
app.use(errorHandler);

const PORT = config.port;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;
