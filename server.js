import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import connectDB from './config/db.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
dotenv.config()



const port =process.env.PORT || 5000;


connectDB(); // Connecct to MongoDB

const app = express();
app.use(cors({
  origin: 'http://localhost:5173/', // Allow only the specified origin
  credentials :true
}));

//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

//Cookie parser middleware
app.use(cookieParser());


app.get('/', (req, res) => {
  res.send('API is running...');
});


app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

app.use(notFound);
app.use(errorHandler);
