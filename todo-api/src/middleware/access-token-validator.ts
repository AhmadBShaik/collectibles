import { Request, Response, NextFunction } from "express";
import { Secret, verify } from "jsonwebtoken";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  verify(token, process.env.JWT_SECRET as Secret, (err, owner_id) => {
    if (err) {
      console.log(err);

      res.status(403).json({ message: "Forbidden" });
    }
    req.params.owner_id = owner_id as string;
  });
  next();
};
