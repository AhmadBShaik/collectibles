import { verify } from "argon2";
import { NextFunction, Request, Response } from "express";
import ajvInstance from "../constants/ajvInstance";
import prisma from "../constants/prismaInstance";
import { LoginUserSchema } from "../schemas/user.schema";

const validate = ajvInstance.compile(LoginUserSchema);
const validateLoginUser = async(
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const valid = validate(req.body);
  if (!valid) {
    const errors = validate.errors;
    return res.status(400).send(errors);
  }
  const user = await prisma.user.findFirst({
    where: {
        email: req.body.email
    },
    select: {
        password: true
    }
  })
  if(!user || !user?.password){
    return res.status(400).send({message: "Invalid Credentials"})
  }
  const passwordMatched = await verify(user.password, req.body.password)
  
  if(!passwordMatched){
    return res.status(400).send({message: "Invalid Credentials"})
  }
  next();
};

export default validateLoginUser;
