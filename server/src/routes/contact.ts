import { Router } from 'express';
import { handleSendMessage } from '../controllers/contactController';

const router = Router();

// Rate-limit: max 5 requests per IP per hour
import rateLimit from 'express-rate-limit';
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: { error: 'Too many requests, please try again later.' },
});

router.post('/contact/send-message', limiter, handleSendMessage);

export default router;