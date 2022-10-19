import express from "express";
import {
  createUserHandler,
  getCurrentUserHandler,
  loginUserHandler,
} from "../controllers/user.controller";
import { authenticateToken } from "../middleware/access-token-validator";
import validateCreateUser from "../middleware/create-user-validator";
import validateLoginUser from "../middleware/login-user-validator";

const router = express.Router();

router.post("/api/register", validateCreateUser, createUserHandler);

router.post("/api/login", validateLoginUser, loginUserHandler);

router.get("/get-current-user", authenticateToken, getCurrentUserHandler);

export default router;
