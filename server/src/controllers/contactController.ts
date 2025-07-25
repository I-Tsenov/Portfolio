import { Request, Response } from "express";
import { contactSchema, ContactInput } from "../validation/contactSchema";
import { sendContactEmail } from "../services/emailService";
import { ZodError } from "zod";

export async function handleSendMessage(req: Request, res: Response) {
  // 1. Validate input
  const parseResult = contactSchema.safeParse(req.body);
  if (!parseResult.success) {
    const error = parseResult.error as ZodError<ContactInput>;
    const firstError = error.issues[0]?.message || "Invalid input.";
    return res.status(400).json({ error: firstError });
  }

  const escapeHtml = (unsafe: string) =>
    unsafe.replace(/</g, "&lt;").replace(/>/g, "&gt;");

  // Extract and sanitize message
  const sanitizedMessage = escapeHtml(parseResult.data.message);

  // Replace original message with sanitized one
  const safeData = {
    ...parseResult.data,
    message: sanitizedMessage,
  };

  // 2. Send email
  try {
    await sendContactEmail(safeData);
    return res.status(200).json({ success: true });
  } catch (err: any) {
    console.error("Email send failed:", err);
    return res.status(500).json({ error: "Failed to send message" });
  }
}
