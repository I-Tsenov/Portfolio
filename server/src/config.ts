// config.ts
import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT!;
export const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN!;

export const SMTP_HOST = process.env.SMTP_HOST!;
export const SMTP_PORT = Number(process.env.SMTP_PORT!);
export const SMTP_USER = process.env.SMTP_USER!;
export const SMTP_PASS = process.env.SMTP_PASS!;

export const EMAIL_FROM = process.env.EMAIL_FROM!;
export const EMAIL_TO = process.env.EMAIL_TO!;
