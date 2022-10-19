import { JTDDataType } from "ajv/dist/types/jtd-schema";


export const CreateUserSchema = {
  type: "object",
  properties: {
    username: { type: "string", minLength: 3 },
    email: { type: "string", format: "email" },
    password: { type: "string", format: "password", minLength: 6 },
    passwordConfirmation: { const: { $data: "1/password" } },
  },
  required: ["username", "email", "password", "passwordConfirmation"],
  additionalProperties: false,
};

export const LoginUserSchema = {
  type: "object",
  properties: {
    email: { type: "string", format: "email" },
    password: { type: "string" },
  },
  required: ["email", "password"],
  additionalProperties: false,
};


export type CreateUser = JTDDataType<typeof CreateUserSchema>;
export type LoginUser = JTDDataType<typeof LoginUserSchema>;