import ajvInstance from "../constants/ajvInstance";
import { CreateCollectibleSchema } from "../schemas/collectible.schema";
import { NextFunction, Request, Response } from "express";

const validate = ajvInstance.compile(CreateCollectibleSchema);

const validateCollectible = (
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

export default validateCollectible;
