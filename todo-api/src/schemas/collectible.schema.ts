import { JTDDataType } from "ajv/dist/types/jtd-schema";

export const CreateCollectibleSchema = {
  type: "object",
  properties: {
    title: { type: "string", minLength: 3 },
    description: { type: "string" },
    worth: { type: "number" },
  },
  required: ["title", "description", "worth"],
  additionalProperties: false,
};

export type CreateCollectible = JTDDataType<typeof CreateCollectibleSchema>