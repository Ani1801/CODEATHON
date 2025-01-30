import express from "express";
import { login, logout, signup } from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", login);

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/signup", signup);

router.get("/logout", logout);

export default router;
