import { Request, Response } from "express";
import { CreateUser } from "../schemas/user.schema";
import {
  createUser,
  getCurrentUser,
  checkEmailValidity,
  checkUsernamelValidity,
} from "../services/user.service";
import { loginUser } from "../services/user.service";

export const createUserHandler = async (
  req: Request<{}, {}, CreateUser>,
  res: Response
) => {
  const body = req.body;
  try {
    await createUser(body);
    res.statusCode = 201;
    return res.json("User created!");
  } catch (e: any) {
    if (e.code === 11000) {
      res.statusCode = 409;
      return res.json("Account already exists!");
    }
    res.statusCode = 500;
    return res.json(e);
  }
};

export const loginUserHandler = async (req: Request, res: Response) => {
  const body = req.body;
  try {
    const accessToken = await loginUser(body);
    res.statusCode = 200;
    return res.json({ accessToken });
  } catch (e) {
    res.statusCode = 500;
    return res.json(e);
  }
};

export const getCurrentUserHandler = async (req: Request, res: Response) => {
  const owner_id = req.params.owner_id;
  if (!owner_id) {
    return;
  }

  const currentUser = await getCurrentUser(owner_id);
  res.statusCode = 200;
  return res.json(currentUser);
};

export const emailValidityHandler = async (req: Request, res: Response) => {
  const { email } = req.body;
  const existingUser = await checkEmailValidity(email);

  if (!existingUser) {
    res.statusCode = 200;
    return res.json({ message: "Valid email" });
  } else {
    res.statusCode = 403;
    return res.json({ message: "Email Already exist!" });
  }
};

export const usernameValidityHandler = async (req: Request, res: Response) => {
  const { username } = req.body;
  const existingUser = await checkUsernamelValidity(username);

  if (!existingUser) {
    res.statusCode = 200;
    return res.json({ message: "Valid username" });
  } else {
    res.statusCode = 403;
    return res.json({ message: "Username Already exist!" });
  }
};
