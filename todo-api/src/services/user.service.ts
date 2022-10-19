import { CreateUser, LoginUser } from "../schemas/user.schema";
import prisma from "../constants/prismaInstance";
import { hash } from "argon2";
import { sign } from "jsonwebtoken";

export const createUser = async (userData: CreateUser) => {
  const hashedPassword = await hash(userData.password as string);
  return await prisma.user.create({
    data: {
      username: userData.username as string,
      email: userData.email as string,
      password: hashedPassword,
    },
  });
};

export const loginUser = async (credentials: LoginUser) => {
  const user = await prisma.user.findFirst({
    where: {
      email: credentials.email as string,
    },
    select: {
      id: true,
    },
  });
  
  const accessToken = sign(user?.id!, process.env.JWT_SECRET!);
  return accessToken;
};

export const getCurrentUser = async (userId: string) => {
  const currentUser = await prisma.user.findFirst({
    where: {
      id: userId
    },
    select: {
      id: true,
      username: true,
      email: true,
      joined_at: true
    },
  });
  return currentUser;
}