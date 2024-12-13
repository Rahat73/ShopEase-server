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

const updateCategory = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
  }),
});

export const CategoryValidationSchemas = {
  addCategory,
  updateCategory,
};
