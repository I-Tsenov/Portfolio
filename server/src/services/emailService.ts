import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  host:     process.env.SMTP_HOST,
  port:     Number(process.env.SMTP_PORT),
  secure:   Number(process.env.SMTP_PORT) === 465, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendContactEmail({ name, email, message }: { name: string; email: string; message: string }) {
  const mailOptions = {
    from:    process.env.EMAIL_FROM,       // e.g. '"Site Contact" <no-reply@yourdomain.com>'
    to:      process.env.EMAIL_TO,         // your personal or business email
    subject: `New contact form message from ${name}`,
    text:    `
      You’ve received a new message from ${name} <${email}>:
      
      ${message}
    `,
  };

  return transporter.sendMail(mailOptions);
}
