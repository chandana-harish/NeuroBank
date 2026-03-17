import express from "express";
import {
  createTransition,
  getTransitions,
  generateInitialFunds,
} from "../controllers/transition.controller.js";
import {
  authMiddleware,
  systemUserMiddleware,
} from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/createTransition", authMiddleware, createTransition);
router.get("/history/:accountId", authMiddleware, getTransitions);
router.post(
  "/system/generateInitialFunds",
  systemUserMiddleware,
  generateInitialFunds,
);

export default router;
