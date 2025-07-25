import express from "express";
import cors from "cors";
import contactRouter from "./routes/contact";
import { FRONTEND_ORIGIN } from "./config";

const app = express();

app.use(
  cors({
    origin: FRONTEND_ORIGIN || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// 👇 Handles CORS preflight checks
// app.options("*", cors());

app.use(express.json());

// 👇 Main routes
app.use("/api", contactRouter);

export default app;
