import { Request, Response } from 'express';
import { contactSchema } from '../validation/contactSchema';
import { sendContactEmail } from '../services/emailService';

export async function handleSendMessage(req: Request, res: Response) {
  // 1. Validate input
  const parseResult = contactSchema.safeParse(req.body);
  if (!parseResult.success) {
    const firstError = parseResult.error.errors[0].message;
    return res.status(400).json({ error: firstError });
  }

  // 2. Send email
  try {
    await sendContactEmail(parseResult.data);
    return res.status(200).json({ success: true });
  } catch (err: any) {
    console.error('Email send failed:', err);
    return res.status(500).json({ error: 'Failed to send message' });
  }
}