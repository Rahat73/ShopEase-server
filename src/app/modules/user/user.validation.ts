import { z } from "zod";

const createAdmin = z.object({
  body: z.object({
    password: z.string({
      required_error: "Password is required",
    }),
    admin: z.object({
      name: z.string({
        required_error: "Name is required!",
      }),
      email: z.string({
        required_error: "Email is required!",
      }),
      phone: z.string({
        required_error: "Contact Number is required!",
      }),
    }),
  }),
});

export const UserValidationSchemas = {
  createAdmin,
};