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
  secure: Number(SMTP_PORT) === 465, // true for 465, false for other ports
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
  logger: true,
  debug: true,
});

// transporter.verify((err, success) => {
//   if (err) {
//     console.error("Email transport error:", err);
//   } else {
//     console.log("Email transporter is ready to send!");
//   }
// });

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
    from: EMAIL_FROM, // e.g. '"Site Contact" <no-reply@yourdomain.com>'
    to: EMAIL_TO, // your personal or business email
    subject: `New contact form message from ${name}`,
    text: `
      You've received a new message from ${name} <${email}>:
      
      ${message}
    `,
  };

  return transporter.sendMail(mailOptions);
}
