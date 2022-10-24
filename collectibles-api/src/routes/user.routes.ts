import express from "express";
import {
  createUserHandler,
  getCurrentUserHandler,
  loginUserHandler,
  emailValidityHandler,
  usernameValidityHandler,
} from "../controllers/user.controller";
import { authenticateToken } from "../middleware/access-token-validator";
import validateCreateUser from "../middleware/create-user-validator";
import validateLoginUser from "../middleware/login-user-validator";

const router = express.Router();

router.post("/api/user/sign-up", validateCreateUser, createUserHandler);

router.post("/api/user/sign-in", validateLoginUser, loginUserHandler);

router.get(
  "/api/user/get-current-user",
  authenticateToken,
  getCurrentUserHandler
);

router.get("/api/user/check", (req, res) => {
  res.statusCode = 200;
  return res.json({ message: "OK" });
});

router.post("/api/user/is-valid-email", emailValidityHandler);

router.post("/api/user/is-valid-username", usernameValidityHandler);
router.get("/api/user/is-authenticated", authenticateToken, (req, res) => {
  res.statusCode = 200;
  return res.json({ message: "Authenticated" });
});

export default router;
