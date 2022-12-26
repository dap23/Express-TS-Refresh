require('dotenv').config();
import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import config from 'config';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './utils/connectDB';
import userRouter from './routes/user.route';
import authRouter from './routes/auth.route';

const app = express();

// Middleware

app.use(express.json({ limit: '10kb' }));

app.use(cookieParser());

app.use(
 cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true
 })
);

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);

// Testing
app.get('/api/health', (_req: Request, res: Response, _next: NextFunction) => {
 res.status(200).json({
  status: 'success',
  message: 'run perfectly'
 });
});

// UnKnown Routes
app.all('*', (req: Request, _res: Response, next: NextFunction) => {
 const err = new Error(`Route ${req.originalUrl} not found`) as any;
 err.statusCode = 404;
 next(err);
});

// Global Error Handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
 err.status = err.status || 'error';
 err.statusCode = err.statusCode || 500;

 res.status(err.statusCode).json({
  status: err.status,
  message: err.message
 });
});

const port = config.get<number>('port');
app.listen(port, () => {
 console.log(`Server started on port: ${port}`);
 connectDB();
});
