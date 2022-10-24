import { NextFunction, Request, Response } from "express";
import ajvInstance from "../constants/ajvInstance";
import { CreateUserSchema } from "../schemas/user.schema";

const validate = ajvInstance.compile(CreateUserSchema);
const validateCreateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const valid = validate(req.body);
  if (!valid) {
    const errors = validate.errors;
    return res.status(400).send(errors);
  }
  next();
};

export default validateCreateUser;
