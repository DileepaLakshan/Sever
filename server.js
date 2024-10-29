import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import connectDB from './config/db.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js'
dotenv.config()



const port =process.env.PORT || 5000;


connectDB(); // Connecct to MongoDB

const app = express();
app.use(cors({
  origin: 'https://sprojectbackend-production.up.railway.app/api/users', // Allow only the specified origin
  methods: 'GET,POST,PUT,DELETE', // Specify allowed methods
  allowedHeaders: 'Content-Type,Authorization' // Specify allowed headers
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
