import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import contactRouter from './routes/contact';

dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_ORIGIN,  // e.g. http://localhost:3000
}));
app.use(express.json());

app.use('/api', contactRouter);

export default app;