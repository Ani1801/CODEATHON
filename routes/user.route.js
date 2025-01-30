import express from "express";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.get("/dashboard", protectRoute, (req, res) => {
  res.render("dashboard");
});

router.get("/input", protectRoute, (req, res) => {
  res.render("input");
});

router.get("/result", protectRoute, (req, res) => {
  res.render("result");
});

router.get("/about", protectRoute, (req, res) => {
  res.render("about");
});

export default router;
