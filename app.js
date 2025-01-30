import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./config/db.js";

import dotenv from "dotenv";
dotenv.config();

// website routes
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";

const app = express();

app.get("/", (req, res) => {
  res.redirect("/auth/login");
});

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));

app.use("/auth", authRouter);
app.use("/user", userRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend Server is working on http://localhost:${PORT}`);
});
