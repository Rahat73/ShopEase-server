import { z } from "zod";

const addCategory = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required!",
    }),
    description: z.string({
      required_error: "Description is required!",
    }),
  }),
});

export const CategoryValidationSchemas = {
  addCategory,
};
