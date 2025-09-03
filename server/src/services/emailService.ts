import nodemailer from "nodemailer";
import {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
  EMAIL_FROM,
  EMAIL_TO,
} from "../config";

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: Number(SMTP_PORT),
  secure: Number(SMTP_PORT) === 465,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
  logger: true,
  debug: true,
});

export async function sendContactEmail({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) {
  const mailOptions = {
    from: EMAIL_FROM,
    to: EMAIL_TO,
    subject: `New contact form message from ${name}`,
    text: `
      You've received a new message from ${name} <${email}>:
      
      ${message}
    `,
  };

  return transporter.sendMail(mailOptions);
}
